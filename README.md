# 🌍 Twin Travellers — 3-Tier Travel Booking Website

Twin Travellers is a full-stack 3-tier web application built using Node.js, Express, MySQL (AWS RDS), and AWS SES for sending verification and booking emails.  
The project provides an end-to-end travel booking experience — from user signup/login with email verification to package booking with email confirmation.

---

## Project Architecture

Tier 1: Frontend (Presentation Layer)**  
- HTML, CSS, JavaScript  
- Hosted on the same EC2 instance (served via Express static middleware)  
- Pages: `index.html`, `login.html`, `register.html`, `booking.html`, `locations.html`, `contact.html`

Tier 2: Backend (Application Layer)**  
- Node.js + Express.js  
- API routes for authentication and booking  
- Email sending via AWS SES  
- JWT authentication

Tier 3: Database (Data Layer)**  
- MySQL database hosted on **AWS RDS**
- Stores user credentials and booking details

---

## Tech Stack

Frontend              HTML, CSS, Vanilla JavaScript 
Backend               Node.js, Express.js 
Database              MySQL (AWS RDS) 
Email Service         AWS Simple Email Service (SES) 
Hosting               AWS EC2 (Ubuntu 22.04) 
Environment Variables dotenv
Authentication        JSON Web Tokens (JWT)

---

🚀 Setup Instructions (Local or EC2)
1️⃣ Clone the repository
git clone https://github.com/<your-username>/3-tier-travel-website.git
cd 3-tier-travel-website

2️⃣ Install dependencies
npm install

3️⃣ Create .env file
Add the above environment variables.

4️⃣ Start the server
node server.js

5️⃣ Access the website
Open in browser:
http://<EC2-public-IP>:5000

---

🔐 Authentication Flow
User registers → Email verification link sent (via SES).
User verifies via email → Marked as verified in MySQL.
User logs in → JWT token stored in browser localStorage.
Home page loads only if token exists; else redirects to login.

---

📨 Booking System
Users can fill the booking form.
Confirmation email automatically sent to admin (SES_EMAIL).
Booking data optionally stored in RDS (future enhancement).

---

🧑‍💻 Author

WinmaniRaja 
🌐 LinkedIn
💻 GitHub

---

🏁 License
This project is open-source and available under the MIT License.



## 📁 Folder 
