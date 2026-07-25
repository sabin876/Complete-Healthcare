# Complete Healthcare - Hostinger Deployment & Setup Guide

This guide provides step-by-step instructions to deploy both the **React Frontend** and **Django Backend** to Hostinger hosting.

---

## 📋 Overview
- **Frontend**: Vite + React (Deploys as static build with `.htaccess` SPA router support).
- **Backend**: Django REST Framework + MySQL/MariaDB or SQLite.

---

## 🎨 1. Frontend Deployment (Hostinger Shared Hosting / VPS)

### Step 1: Set Production Backend API URL
1. Create a `.env` file in the project root:
   ```env
   VITE_API_BASE_URL=https://api.yourdomain.com
   ```
   *(Replace `https://api.yourdomain.com` with your actual domain or subdomain running Django).*

### Step 2: Build the Production Assets
Run the build command:
```bash
npm run build
```
This generates a production-ready `dist/` folder. Notice that `dist/.htaccess` is included automatically for React Router page refreshes.

### Step 3: Upload to Hostinger
1. Log in to **Hostinger hPanel**.
2. Go to **File Manager** -> `public_html` (or your domain/subdomain root directory).
3. Upload all files and folders from inside `dist/` directly into `public_html/`.

---

## ⚙️ 2. Backend Deployment (Hostinger Python App / VPS)

### Option A: Hostinger Shared Hosting (Python App Installer)

#### 1. Create MySQL Database
1. In **Hostinger hPanel**, go to **Databases** -> **MySQL Databases**.
2. Create a new database and user (e.g. `u123456789_healthcare`).
3. Save the Database Name, User, and Password.

#### 2. Create Python Web App in Hostinger
1. In hPanel, go to **Advanced** -> **Setup Python App**.
2. Click **Create Application**:
   - **Python Version**: `3.10` or `3.11`+
   - **Application Root**: `backend`
   - **Application URL**: `api.yourdomain.com` (or `yourdomain.com/backend`)
3. Click **Create**. Hostinger will auto-generate `passenger_wsgi.py`.

#### 3. Upload Backend Files & Configure Environment
1. Upload the contents of the `backend/` folder into your Python application directory.
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Edit `.env` and add your production settings:
   ```env
   SECRET_KEY=your-secure-random-secret-key
   DEBUG=False
   ALLOWED_HOSTS=api.yourdomain.com,yourdomain.com,127.0.0.1
   CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   
   DB_ENGINE=django.db.backends.mysql
   DB_NAME=u123456789_healthcare
   DB_USER=u123456789_user
   DB_PASSWORD=your_mysql_password
   DB_HOST=127.0.0.1
   DB_PORT=3306
   ```

#### 4. Install Dependencies & Run Setup
Run the following commands inside the Virtual Environment in Hostinger Terminal or SSH:
```bash
# 1. Activate environment
source /home/u123456789/virtualenv/backend/3.11/bin/activate
cd /home/u123456789/backend

# 2. Install requirements
pip install -r requirements.txt

# 3. Apply database migrations
python manage.py migrate

# 4. Seed database with initial services, staff & blogs
python seed_db.py

# 5. Collect static files for Django Admin
python manage.py collectstatic --noinput
```

#### 5. Restart Application
In Hostinger **Setup Python App**, click **Restart Application**.

---

### Option B: Hostinger VPS (Ubuntu 22.04 / 24.04)

If deploying on a Hostinger VPS with Nginx + Gunicorn:

1. **Install System Packages**:
   ```bash
   sudo apt update
   sudo apt install -y python3-pip python3-venv nginx mysql-server libmysqlclient-dev
   ```

2. **Setup Systemd Service for Gunicorn**:
   Create `/etc/systemd/system/healthcare_backend.service`:
   ```ini
   [Unit]
   Description=Complete Healthcare Django Backend
   After=network.target

   [Service]
   User=www-data
   Group=www-data
   WorkingDirectory=/var/www/Complete-Healthcare/backend
   ExecStart=/var/www/Complete-Healthcare/backend/venv/bin/gunicorn --workers 3 --bind 127.0.0.1:8000 healthcare_backend.wsgi:application

   [Install]
   WantedBy=multi-user.target
   ```

3. **Configure Nginx**:
   Create `/etc/nginx/sites-available/healthcare`:
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location /static/ {
           alias /var/www/Complete-Healthcare/backend/staticfiles/;
       }

       location /media/ {
           alias /var/www/Complete-Healthcare/backend/media/;
       }

       location / {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

4. **Enable & Start Services**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/healthcare /etc/nginx/sites-enabled/
   sudo systemctl restart nginx
   sudo systemctl start healthcare_backend
   sudo systemctl enable healthcare_backend
   ```

---

## 🔑 Default Login Credentials
After running `python seed_db.py`, the following default accounts are available:

- **Admin Account**:
  - Staff ID: `ADMIN001`
  - Password: `adminpassword123`
- **Django Superuser** (if created via `python manage.py createsuperuser`):
  - Access at: `https://api.yourdomain.com/admin/`

---

## ✅ Deployment Checklist
- [ ] Root `.env` created with production `VITE_API_BASE_URL`.
- [ ] `npm run build` executed to generate `dist/`.
- [ ] `dist/` contents uploaded to Hostinger `public_html/`.
- [ ] `backend/.env` configured with production MySQL database & secrets.
- [ ] `pip install -r requirements.txt` executed on server.
- [ ] `python manage.py migrate` executed.
- [ ] `python seed_db.py` executed.
- [ ] `python manage.py collectstatic` executed.
- [ ] Application restarted on Hostinger.
