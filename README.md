<div align="center">

<br />

# 🎨 CV Builder Studio

**A sleek, real-time CV editor and PDF exporter built with React 19 + TypeScript + Vite**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

<br/>

> Build, customize, and export a professional-grade CV — entirely in the browser.  
> No accounts. No cloud. Just you and a polished PDF.

<br/>

</div>

---

## ✨ Features

| Category | Details |
|---|---|
| 📝 **Live Editor** | Side-by-side editor and preview — every keystroke updates instantly |
| 🖨️ **PDF Export** | A4-accurate print via `react-to-print` — pixel-perfect every time |
| 🎨 **Theme Colors** | Sapphire · Emerald · Bronze · Obsidian |
| 🔤 **Typography** | Inter (Modern) · Outfit (Clean) · Lora (Elegant) |
| 🗂️ **Layout Styles** | Split Columns · Modern Banner · Single Column |
| 📏 **Density Control** | Compact · Normal · Spacious |
| 🖼️ **Profile Photo** | Upload + interactive circular crop before placement |
| 💾 **Auto-Save** | Debounced `localStorage` persistence — nothing is ever lost |
| 📤 **Backup / Restore** | Export full CV state as JSON, restore it any time |
| 🔄 **Reset** | One-click restore to the default template |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm or pnpm

### Install & Run

```bash
# Clone the repository
git clone https://github.com/vlad05x/cv-builder.git
cd cv-builder

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. That's it.

---

## 🛠️ Tech Stack

```
React 19          — UI layer
TypeScript 6      — Type safety
Vite 8            — Lightning-fast build & HMR
Tailwind CSS 4    — Utility-first styling
react-to-print    — Browser-native PDF generation
lucide-react      — Clean, consistent icon set
```

---

## 📁 Project Structure

```
cv-builder/
├── public/
├── src/
│   ├── components/
│   │   ├── CVEditor.tsx          # Left-panel form editor
│   │   ├── CVPreview.tsx         # Right-panel live preview (printable)
│   │   └── ImageCropperModal.tsx # Photo upload & circular crop
│   ├── data/
│   │   └── cvData.ts             # Default CV data + TypeScript types
│   ├── App.tsx                   # Root layout, state, & logic
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── index.html
├── vite.config.ts
└── package.json
```

---

## 🗺️ Roadmap

- [x] Real-time editor with live preview
- [x] PDF export (A4-scale)
- [x] Theme color picker
- [x] Font family selector
- [x] Layout style switcher (3 variants)
- [x] Content density control
- [x] Profile photo upload with cropper
- [x] Auto-save to `localStorage`
- [x] JSON backup & restore
- [ ] Drag & Drop секции

---

## 📸 Screenshot

> *Coming soon — run `npm run dev` to see it live!*

---

## 📄 License

Distributed under the **MIT License**.  
Feel free to fork, customize, and make it your own.

---

<div align="center">

Made with ☕ by **[Vlad Honcharenko](https://github.com/vlad05x)**

</div>
