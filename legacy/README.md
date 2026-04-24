# Snapterra 🚀

Snapterra is a unified dashboard for managing your visual inspiration and web resources. It combines a high-speed screenshot gallery with a clean link-saving system, all tied together by a shared tagging ecosystem.

## ✨ Key Features

- **📸 Visuals & Links**: Manage both image uploads (via UploadThing) and website URLs.
- **🏷️ Normalized Tags**: Powerful many-to-many tagging shared across your entire collection.
- **🎨 Modular Sidebar**: Effortless navigation and content creation within a single, dynamic component.
- **📱 Responsive Layout**: Nested routing architecture ensures a stable and professional UI.
- **👁️ Instant Preview**: View high-resolution screenshots instantly in a premium modal viewer.

## 🛠️ Technology Stack

| Frontend | Backend | Hosting/Storage |
| :--- | :--- | :--- |
| React (Vite) | Express & Bun | UploadThing (Images) |
| TailwindCSS | PostgreSQL | JWT (Auth) |
| React Router | Bcrypt | Lucide Icon Library |

## ⚙️ Setup & Installation

### Backend Setup
1.  Navigate to `backend/` and install dependencies: `bun install`.
2.  Set up your `.env` file with `DATABASE_URL`, `UPLOADTHING_TOKEN`, `JWT_SECRET`, and `ADMIN` credentials.
3.  Start the server: `bun dev`.

### Frontend Setup
1.  Navigate to `frontend/` and install dependencies: `bun install`.
2.  Start the development server: `bun dev`.
3.  Visit `http://localhost:5173` to start managing your resources!

---
*Organize your inspiration with Snapterra.*
