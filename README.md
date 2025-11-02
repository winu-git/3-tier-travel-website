# 🌍 Twin Travellers — 3-Tier Travel Booking Website

Twin Travellers is a full-stack **3-tier web application** built using **Node.js**, **Express**, **MySQL (AWS RDS)**, and **AWS SES** for sending verification and booking emails.  
The project provides an end-to-end travel booking experience — from **user signup/login with email verification** to **package booking with email confirmation**.

---

## 🧱 Project Architecture

**Tier 1: Frontend (Presentation Layer)**  
- HTML, CSS, JavaScript  
- Hosted on the same EC2 instance (served via Express static middleware)  
- Pages: `index.html`, `login.html`, `register.html`, `booking.html`, `locations.html`, `contact.html`

**Tier 2: Backend (Application Layer)**  
- Node.js + Express.js  
- API routes for authentication and booking  
- Email sending via AWS SES  
- JWT authentication

**Tier 3: Database (Data Layer)**  
- MySQL database hosted on **AWS RDS**
- Stores user credentials and booking details

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | MySQL (AWS RDS) |
| Email Service | AWS Simple Email Service (SES) |
| Hosting | AWS EC2 (Ubuntu 22.04) |
| Environment Variables | dotenv |
| Authentication | JSON Web Tokens (JWT) |

---


---

## ⚙️ Environment Variables (.env)

Make sure to create a `.env` file (never push it to GitHub):

```env
PORT=5000
DB_HOST=your-rds-endpoint.amazonaws.com
DB_USER=admin
DB_PASSWORD=yourpassword
DB_NAME=travel_app
JWT_SECRET=supersecretjwtkey
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
SES_EMAIL=your_verified_email@example.com

💡 Note: The SES_EMAIL must be verified in AWS SES sandbox mode.

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

☁️ Deployment on AWS EC2
Launch an Ubuntu EC2 instance in your public subnet.
Install Node.js and Git:

sudo apt update
sudo apt install -y nodejs npm git

Clone the repo and install dependencies.
Add your .env file.

Start the server:
node server.js


🔐 Authentication Flow
User registers → Email verification link sent (via SES).
User verifies via email → Marked as verified in MySQL.
User logs in → JWT token stored in browser localStorage.
Home page loads only if token exists; else redirects to login.

📨 Booking System
Users can fill the booking form.
Confirmation email automatically sent to admin (SES_EMAIL).
Booking data optionally stored in RDS (future enhancement).

🧑‍💻 Author:
WinmaniRaja 

🌐 LinkedIn = https://www.linkedin.com/in/winmaniraja-b-0a573b269 
💻 GitHub   = https://github.com/winu-git/
Portfolio   = https://winu-git.github.io/portfolio/
