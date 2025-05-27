# Web Portofolio

Ini adalah proyek Web Portofolio pribadi yang menampilkan keahlian, tools, dan beberapa projek yang telah dikerjakan. Website ini dibuat menggunakan **Next.js**, dengan struktur modular dan asset yang tertata rapi.

---

## 📁 Struktur File Proyek

```bash
root/                           # Direktori utama proyek
├── lib/                        # Folder untuk helper atau utilitas
│   └── utils.js               # File utilitas JavaScript
├── public/                    # Folder publik untuk file statis
│   └── assets/                # Asset statis yang digunakan
│       ├── icons/             # Kumpulan icon teknologi dan tools
│       │   ├── Bootstrap.svg
│       │   ├── CSS.svg
│       │   ├── D.png
│       │   ├── Dart-Dark.svg
│       │   ├── Debian-Dark.svg
│       │   ├── Figma-Dark.svg
│       │   ├── Flutter-Dark.svg
│       │   ├── GCP-Dark.svg
│       │   ├── Git.svg
│       │   ├── HTML.svg
│       │   ├── JavaScript.svg
│       │   ├── NextJS-Dark.svg
│       │   ├── NodeJS-Dark.svg
│       │   ├── PHP-Dark.svg
│       │   ├── Postman.svg
│       │   ├── Python-Dark.svg
│       │   ├── VSCode-Dark.svg
│       │   └── icons8-instagram.svg
│       ├── img/               # Folder gambar profil
│       │   └── profile.jpg
│       └── projects/          # Gambar proyek yang ditampilkan
│           ├── Crop-Care.png
│           ├── Workgank.png
│           └── dana-redesign.png
├── public/                    # File SVG tambahan dan favicon
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/                       # Sumber utama aplikasi (Next.js)
│   ├── app/                   # Entry point dan layout aplikasi
│   │   ├── favicon.ico        # Ikon web
│   │   ├── globals.css        # File CSS global
│   │   ├── layout.js          # Layout global
│   │   └── page.js            # Halaman utama
│   └── components/            # Komponen UI terpisah
│       └── ui/                # Komponen UI khusus
│           └── button.jsx     # Komponen tombol
├── .gitignore                 # Mengabaikan file/folder saat push Git
├── README.md                 # Dokumentasi proyek
├── components.json            # Konfigurasi komponen
├── eslint.config.mjs          # Konfigurasi ESLint
├── jsconfig.json              # Konfigurasi path dan alias JS
└── next.config.mjs            # Konfigurasi Next.js
```
---

## ▶️ Cara Menjalankan di Lokal
1. Clone repositori

```bash

git clone https://github.com/dimzkuy/Web-Portofolio.git
cd Web-Portofolio
```
2. Install dependencies

```bash
npm install
Jalankan development server
```
3. Jalankan Aplikasi
```bash
npm run dev
```
Buka browser dan akses http://localhost:3000

---

## ✨ Teknologi yang Digunakan<br>
**1. Next.js**<br>
**2. Tailwind CSS**<br>
**3. ShaCDN UI**

