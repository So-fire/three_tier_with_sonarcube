## 🚀 Tierhub – 3-Tier Application (Local Deployment Guide)

## 🧩 Project Overview.
This project demonstrates how to run a 3-tier web application locally using Docker Compose and manual setup. The application consists of:

Web Tier: React frontend running on port 3000

App Tier: Node.js backend API running on port 4000

Database Tier: MySQL running in a container

##  Manual Setup (Without Docker)
##  Step 1: Install Dependencies
Make sure the following are installed on your machine:

Node.js and npm

MySQL

## Error 1: MySQL Connection Issue – ER_NOT_SUPPORTED_AUTH_MODE
##  Problem:
When starting the backend (npm start), you might get this error:
ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server

## Solution:
Log into MySQL:

mysql -u {DB_USER} -p -h localhost {DB_DATABASE}
Then run:

ALTER USER '{DB_USER}'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
N.B - {DB_USER} - this is the name you want to give your db 

## Error 2: Missing MySQL Package
## Problem:

Error: Cannot find module 'mysql'

##  Solution:
Install the MySQL Node.js driver:


npm install mysql

## Error 3: Cannot GET / on http://localhost:4000
## Problem:
Accessing the backend directly gives:

Cannot GET /

## Solution:
The backend is an API server, not a webpage. Visit the API route:

http://localhost:4000/transaction
You should see:

{"result":[]}
This means the app is running but the database is empty.

## 🐳 Running with Docker Compose
To deploy the app with Docker Compose:


docker-compose up --build
## Notes:
Reverse Proxy: The web tier uses NGINX as a reverse proxy.
In nginx.conf, update the proxy_pass value (line 11) to match the backend service name defined in your docker-compose.yml, for example:

proxy_pass http://app:4000;
Also make sure your nginx.conf is copied in your web-tier Dockerfile correctly.

the app in line 70 should be the name of your backend in your dockercompose file

## Common Docker Issues & Fixes
## 1. Broken Dockerfile (Missing Build Script)
## Problem:
RUN npm run build fails with:

npm error Missing script: "build"
## Solution:
Removed RUN npm run build because the backend didn’t require a build step (used in static sites or compiled apps like React).

##  2. Backend Starts Before Database is Ready
## Problem:
App-tier crashes due to MySQL not being ready.

## Solution:
Used wait-for-it.sh to delay backend start until MySQL is available:

CMD ["./wait-for-it.sh", "db:3306", "--", "npm", "start"]

## 3. Script Not Executable in Container
Problem:
wait-for-it.sh not running inside container.

Solution:
Added execution permission:

RUN chmod +x /wait-for-it.sh

##  4. Docker Networking – Container Cannot Connect
## Problem:
Backend can’t connect to database.

## Solution:
In Docker Compose, services communicate using their service names. Used db as the MySQL hostname inside the app-tier.

## 5. Wrong Port Exposure
## Problem:
Backend runs but nothing shows on browser.

## Solution:

Backend listens on port 4000.

Dockerfile includes: EXPOSE 4000

Confirmed server.js is listening on the same port.

##  Summary
This project showcases both manual and Docker-based deployment of a 3-tier app. Beginners can follow the troubleshooting steps to understand:

Application layering

Basic database debugging

Docker Compose networking

Service dependency handling


