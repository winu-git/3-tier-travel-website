import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "./db.js"; // ✅ fixed: same folder, not ../config
import { sendVerificationEmail } from "./emailService.js"; // ✅ fixed: same folder, not ../utils

export const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length > 0) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    await pool.query("INSERT INTO users (email, password, verified) VALUES (?, ?, ?)", [
      email,
      hashedPassword,
      0,
    ]);
    await sendVerificationEmail(email, token);

    res.status(201).json({ message: "Signup successful! Please verify your email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await pool.query("UPDATE users SET verified = 1 WHERE email = ?", [decoded.email]);
    res.send("✅ Email verified successfully! You can now log in.");
  } catch {
    res.status(400).send("Invalid or expired token.");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(400).json({ message: "Invalid credentials" });

    const user = rows[0];
    if (!user.verified) return res.status(403).json({ message: "Please verify your email first." });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
