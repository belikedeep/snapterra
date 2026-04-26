# Snapterra

Snapterra is a **SaaS-ready**, unified dashboard designed for modern workflows. Manage your screenshots, links, and tasks with ease, powered by a premium PostgreSQL backend and a high-performance Next.js App Router frontend.

## 🚀 Features

- **Advanced Screenshot Gallery**: Upload, tag, and organize screenshots. Powered by **Uploadthing** for reliable file handling.
- **Smart Link Manager**: Save important URLs with custom tags for quick retrieval.
- **Prioritized Task Tracker**: Stay on top of your work with status filtering and optimistic updates.
- **Modern Auth System**: Secure JWT-based authentication with session management and user roles.
- **Beautiful UI/UX**: Built with **Tailwind CSS 4** and **Framer Motion** for a smooth, glassmorphic experience.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Frontend**: [React 19](https://reactjs.org/), [Tailwind CSS 4](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://neon.tech/) (Neon.tech)
- **Migrations**: [Knex.js](https://knexjs.org/)
- **Billing**: [Dodo Payments](https://dodopayments.com/)
- **Storage**: [Uploadthing](https://uploadthing.com/)
- **State**: [TanStack Query 5](https://tanstack.com/query)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🚦 Getting Started

### 1. Prerequisites

- [Bun](https://bun.sh/) (Recommended) or Node.js 20+
- PostgreSQL Database (e.g., [Neon.tech](https://neon.tech))
- [Uploadthing](https://uploadthing.com/) Account
- [Dodo Payments](https://dodopayments.com/) Account

### 2. Environment Setup

Copy `.env.example` to `.env.local` and fill in your credentials:

```env
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_jwt_secret

# Dodo Payments
DODO_PAYMENTS_API_KEY=your_api_key
DODO_WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_DODO_PRODUCT_ID=your_pro_product_id

# File Storage (Uploadthing)
UPLOADTHING_TOKEN=your_token
UPLOADTHING_SECRET=your_secret
```

### 3. Installation

```bash
bun install
```

### 4. Database Migrations

Run migrations to set up your schema:

```bash
bun x knex migrate:latest
```

### 5. Development

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the magic.

## 🐳 Docker Support

You can also run Snapterra using Docker:

```bash
docker compose up --build
```

## 📄 License

MIT © [Deepak Mardi](https://github.com/iamdeepakmardi)
