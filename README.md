# 🍛 Chill Point — Website

**"Taste Like Home"** — A modern, full-stack food business website for Chill Point, Vadodara.

---

## ⚡ Quick Start (5 Minutes)

### Prerequisites
- Node.js 18+ installed ([download](https://nodejs.org))
- A Supabase account ([free at supabase.com](https://supabase.com)) — **optional**, site works without it using local data

---

### Step 1 — Install Dependencies

```bash
cd chillpoint
npm install
```

---

### Step 2 — Run Without Supabase (Instant Preview)

The site works immediately with built-in local data. Just run:

```bash
npm run dev
```

Then open **http://localhost:5173** in your browser. 🎉

> All menu data and sample reviews are built-in. The admin panel works with local state.

---

### Step 3 — Connect Supabase (Optional, for live data)

#### 3a. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Click **New Project**, name it `chillpoint`
3. Choose a region close to India (e.g., Singapore)
4. Wait ~2 minutes for setup

#### 3b. Run the Database Schema
1. In Supabase, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the entire contents of `supabase-schema.sql`
4. Click **Run** ✓

This creates tables, policies, and seeds all 42+ menu items + sample reviews.

#### 3c. Get Your API Keys
1. Go to **Settings → API** in your Supabase project
2. Copy:
   - **Project URL** (looks like `https://xxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

#### 3d. Create .env File
```bash
cp .env.example .env
```

Edit `.env` and replace the placeholders:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...your-key-here
```

#### 3e. Restart Dev Server
```bash
npm run dev
```

---

## 🚀 Build for Production

```bash
npm run build
```

Output is in the `dist/` folder. Deploy to:
- **Vercel** (recommended): `npx vercel` in project root
- **Netlify**: Drag & drop `dist/` folder
- **Any static host**: Upload `dist/` contents

> For Vercel/Netlify, add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables in their dashboard.

---

## 🔐 Admin Panel

Access the menu management panel:
1. Scroll to the footer → click **Admin Panel**
2. Enter password: `chillpoint2024`

Admin features:
- ✅ Add new menu items
- ✅ Toggle item availability (Available / Not Available)
- ✅ Delete menu items
- ✅ Mark items as Popular

> To change the admin password, edit `src/components/AdminPanel.jsx` and change `ADMIN_PASSWORD`.

---

## 📁 Project Structure

```
chillpoint/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky navigation bar
│   │   ├── Hero.jsx            # Full-screen hero section
│   │   ├── FeaturesStrip.jsx   # Marquee features banner
│   │   ├── About.jsx           # About Chill Point
│   │   ├── Menu.jsx            # Full menu with category tabs
│   │   ├── Reviews.jsx         # Reviews display + submit form
│   │   ├── Contact.jsx         # Address, hours, map embed
│   │   ├── AdminPanel.jsx      # Owner menu management
│   │   └── Footer.jsx          # Footer with links
│   ├── hooks/
│   │   └── useData.js          # useMenu() + useReviews() hooks
│   ├── data/
│   │   └── menuData.js         # All 42 menu items + categories
│   ├── lib/
│   │   └── supabase.js         # Supabase client init
│   ├── App.jsx                 # Root app component
│   ├── main.jsx                # React entry point
│   └── index.css               # Tailwind + custom styles
├── supabase-schema.sql         # Database schema + seed data
├── .env.example                # Environment variable template
├── tailwind.config.js          # Tailwind custom theme
├── vite.config.js              # Vite config
└── index.html                  # HTML shell
```

---

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js` → `theme.extend.colors`

### Change Fonts
Edit `index.html` → Google Fonts link, then update `tailwind.config.js` → `fontFamily`

### Change Admin Password
Edit `src/components/AdminPanel.jsx` → `const ADMIN_PASSWORD = 'your-new-password'`

### Update Contact Info
Edit `src/components/Contact.jsx` for address, phone, hours
Edit `src/components/Footer.jsx` for footer details

### Update Opening Hours
Edit `src/components/Contact.jsx` → `OPENING_HOURS` array
Edit `src/components/Navbar.jsx` → the live badge text

---

## 🗃️ Supabase Tables

### `menu_items`
| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Auto-increment PK |
| name | text | Item name |
| category | text | chaat / sandwich / pizza / ice_slush / puff / maggi / fries |
| price | integer | Price in ₹ |
| is_available | boolean | Show as available or not |
| is_popular | boolean | Show "Popular" badge |
| is_veg | boolean | Pure veg indicator |
| created_at | timestamp | Auto-set |

### `reviews`
| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Auto-increment PK |
| name | text | Reviewer name |
| rating | integer | 1–5 stars |
| comment | text | Review text |
| created_at | timestamp | Auto-set |

---

## 📞 Business Details

| Field | Value |
|-------|-------|
| Name | Chill Point |
| Phone | 8866442439 |
| Address | GF Shop No. 18, Shivalaya Bliss, Taksh Aura Rd, N.H.8, Vadodara, Gujarat 390019 |
| Hours | 4:30 PM – 9:30 PM (Daily) |
| WhatsApp | https://wa.me/918866442439 |

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool |
| Tailwind CSS 3 | Styling |
| Supabase | Backend (menu + reviews) |
| React Icons | Icon library |
| Google Fonts | Typography (Playfair Display, Bebas Neue, DM Sans) |

---

Made with ❤️ for Chill Point, Vadodara.
