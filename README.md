# Vertix Solutions — Full-Stack Corporate Website & Admin Suite

A complete, production-ready corporate web application with an integrated admin management portal built for **Vertix Solutions**, styled to match the design language, motion dynamics, color palette, and layout structure of [PlusInfosys](https://www.plusinfosys.com/).

---

## 🚀 Unified Single-Port Architecture (Port 3000)

Both the **Public Website** and the **Admin Control Room** run inside a single unified React application on **http://localhost:3000**:

- **Public Site:** `http://localhost:3000/` (Home, Services, Products, Industries, About, Contact)
- **Admin Login:** `http://localhost:3000/login`
- **Admin Control Room:** `http://localhost:3000/admin` (Dashboard, Services, Products, Portfolio, Testimonials, Contacts, Company Settings)
- **⚡ Secret Shortcut:** Press **`Ctrl + Shift + L`** (or `Cmd + Shift + L` on Mac) anywhere on the public website to instantly jump to the Admin Login!

---

## 🎨 Visual System & Brand Tokens

| Token | Hex / Value | Description |
|---|---|---|
| **Primary Brand Accent** | `#d94452` | Coral Red — CTA buttons, badges, key highlights |
| **Secondary Accent** | `#35bb9b` | Emerald Teal — Product tags, secondary buttons, success states |
| **Warning / Rating** | `#f5ba45` | Amber Yellow — Star ratings, highlight badges |
| **Dark / Backgrounds** | `#0f172a` / `#1e293b` / `#000000` | Deep slate and black hero sections |
| **Light Surfaces** | `#f5f5f5` / `#f8fafc` / `#ffffff` | Clean off-white card backgrounds |
| **Body Typography** | Inter (Google Fonts) | Weights 300 to 800 matching Roobert font geometry |

---

## 🏗️ Project Structure

```
company_website/
├── backend/                  # Node.js + Express REST API (Sequelize ORM & MySQL)
│   ├── config/               # Database connection pool & JWT configuration
│   ├── middleware/           # JWT auth & Multer file uploads
│   ├── models/               # Sequelize models (AdminUser, Service, Product, etc.)
│   ├── routes/               # Public (/api/*) & Admin (/api/admin/*) endpoints
│   ├── seeders/              # Automated database seeder
│   ├── package.json
│   ├── server.js
│   └── .env.example
│
└── frontend/                 # React 18 Unified App (Public Site + Admin Panel on Port 3000)
    ├── src/
    │   ├── admin/            # Admin pages, components & styles
    │   │   ├── components/   # Sidebar, Header, DataTable, Modal, StatCards
    │   │   ├── pages/        # Dashboard, Services, Products, Portfolio, Testimonials, Contacts, CompanySettings
    │   │   └── styles/       # admin.css
    │   ├── components/       # Navbar, Footer, Swiper Carousel, ServiceCard, ShortcutListener
    │   ├── context/          # CompanyContext & AuthContext
    │   ├── pages/            # Home, Services, ServiceDetail, Products, ProductDetail, Industries, About, Contact
    │   ├── styles/           # global.css
    │   ├── App.js
    │   └── index.js
    └── package.json
```

---

## ⚡ How to Run

### Step 1: Database Setup
Create MySQL database named `vertix_solutions`:
```sql
CREATE DATABASE vertix_solutions CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Step 2: Start Backend (Port 5000)
```powershell
cd e:\company_website\backend
Copy-Item .env.example .env
# Set your MySQL DB_PASSWORD in .env
npm install
npm start
```
*Backend runs on `http://localhost:5000` and automatically runs database sync & seeds.*

### Step 3: Start Frontend (Port 3000)
```powershell
cd e:\company_website\frontend
npm install
npm start
```
*App opens on `http://localhost:3000`.*

---

## 🔐 Default Admin Credentials

- **Direct URL:** `http://localhost:3000/login`
- **Shortcut:** Press `Ctrl + Shift + L` on any page
- **Email:** `admin@vertixsolutions.com`
- **Password:** `Admin@123`
