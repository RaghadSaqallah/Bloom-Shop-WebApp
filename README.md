# 🌸 Bloom Shop — Online Flower Shop

![Docker Build](https://github.com/RaghadSaqallah/Bloom-Shop-WebApp/actions/workflows/docker-build.yml/badge.svg)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**Bloom Shop** is a responsive multi-page online flower shop. Visitors can browse flowers and bouquets, filter products by color, add items to a shopping cart, and manage the cart. The cart is stored in the browser (`localStorage`), so the app is fully static and needs no backend or database.

---

## ✨ Features

- 🏠 **Home page**: hero section, featured flowers, bouquet collection, and a contact form with client-side validation
- 🛍️ **Order page**: product cards with name and price, and a color filter (**All / White / Pink / Red**)
- 🛒 **Cart**: add items with one click; a live counter badge shows the number of items
- 🗑️ **Cart page**: view added items, remove any item, and see a friendly empty-cart state
- 💾 **Persistent cart**: items remain after refreshing the page or closing the browser (`localStorage`)
- 📱 **Responsive design** with a slide-in mobile menu
- 🎨 **Custom Tailwind v4 theme** with the *Lobster* display font

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 |
| Styling | Tailwind CSS v4 (compiled with `@tailwindcss/cli`) |
| Logic | Vanilla JavaScript + `localStorage` |
| Icons / Fonts | Font Awesome, Lobster |
| Build stage | Node.js 22 (Alpine) |
| Web server | Nginx (Alpine) |
| Containerization | Docker, Docker Compose |
| CI | GitHub Actions |

---

## 📂 Project Structure

```
Bloom-Shop-WebApp/
├── src/                         # Application source
│   ├── index.html               # Home page
│   ├── order.html               # Products + color filter
│   ├── cart.html                # Shopping cart
│   ├── css/
│   │   ├── input.css            # Tailwind source (edit this)
│   │   ├── style.css            # Compiled output (generated)
│   │   └── all.min.css          # Font Awesome
│   ├── js/script.js             # Menu, form validation, filter, cart logic
│   └── fonts/  webfonts/  images/
├── docs/
│   ├── notes.md                 # Technical notes
│   └── screenshots/             # Assignment screenshots
├── .github/workflows/
│   └── docker-build.yml         # CI: build image + smoke test
├── Dockerfile                   # Multi-stage build (Node -> Nginx)
├── docker-compose.yml
├── .dockerignore
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## 🐳 Run with Docker

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine + Compose plugin)
- Git

No Node.js installation is needed on your machine. Tailwind is compiled inside the container during the build.

### Option 1: Docker Compose (recommended)

```bash
git clone https://github.com/RaghadSaqallah/Bloom-Shop-WebApp.git
cd Bloom-Shop-WebApp

docker compose up --build -d
```

Open **http://localhost:8080** in your browser.

### Option 2: Plain Docker

```bash
docker build -t bloom-shop:latest .
docker run -d --name bloom-shop -p 8080:80 bloom-shop:latest
```

---

## 🧹 Stop and Clean Up

```bash
# Compose
docker compose down              # stop and remove the container
docker compose down --rmi local  # also remove the built image

# Plain Docker
docker stop bloom-shop && docker rm bloom-shop
docker rmi bloom-shop:latest
```

---

## ⚙️ Configuration

| Item | Value | Notes |
|------|-------|-------|
| Container port | `80` | Nginx |
| Host port | `8080` | Change the left side in `docker-compose.yml` (e.g. `"3000:80"`) |
| Environment variables | none | The app is fully static |
| Healthcheck | every 30s | `wget` request to `http://127.0.0.1/` |

Check the container health:

```bash
docker ps        # STATUS should show "(healthy)"
```

---

## ✅ How to Test

1. Open **http://localhost:8080**. The hero section, flowers, and bouquet sections should load with the Lobster font.
2. Click **Shop Now** to open the order page.
3. Click **Pink**, **White**, or **Red**. Only the matching products should remain visible. Click **All** to show everything again.
4. Click the cart button on two or three products. The red counter on the floating cart icon should increase.
5. Click the floating cart icon to open the cart page. The selected items appear as cards.
6. Remove one item with the trash icon. The list and the counter update.
7. Refresh the page. The cart content is still there (saved in `localStorage`).
8. Remove all items and confirm the **"Nothing In Your Cart"** message appears.
9. On the home page, press **Send** with empty fields. The inputs get a red border (client-side validation).
10. Resize the window below 768px and test the hamburger menu.

Quick command-line check:

```bash
curl -I http://localhost:8080              # expect HTTP/1.1 200 OK
curl -I http://localhost:8080/order.html
curl -I http://localhost:8080/cart.html
```

> The contact form only validates input in the browser. It does not send messages anywhere because the project has no backend.

---

## 💻 Local Development (without Docker)

Requires **Node.js 20+** (Tailwind v4 requirement).

```bash
npm ci
npm run dev      # watches src/css/input.css and rebuilds src/css/style.css
npm run build    # one-time minified build
```

Then open `src/index.html` with VS Code Live Server.

---

## 🙏 Attribution

This project was designed and built by the author as an original work (it is not based on another repository). It uses the following open-source components:

- [Tailwind CSS](https://tailwindcss.com/): MIT License
- [Font Awesome Free](https://fontawesome.com/): icons CC BY 4.0, fonts SIL OFL 1.1, code MIT
- [Lobster font](https://fonts.google.com/specimen/Lobster): SIL Open Font License 1.1
- Product and background images are used for demonstration and educational purposes only.

---

## 📬 Author

**Raghad Saqallah**

<p align="center">Made with ❤️ — Raghad Saqallah</p>
