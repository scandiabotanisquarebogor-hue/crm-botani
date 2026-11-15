# CRM Follow Up (PWA)

Tampilan di GitHub Pages, data tetap di Google Sheets lewat Apps Script.

## 1. Server (Apps Script)
1. Ganti isi `Code.gs` dengan versi terbaru (sudah ada `doPost`).
2. Deploy > Manage deployments > Edit > New version. Pastikan: Execute as **Me**, Who has access **Anyone**.
3. Salin URL Web App (berakhiran `/exec`).
4. (Opsional, disarankan) Project Settings > Script properties > tambah `PWA_KEY` = kata sandi acak.

## 2. GitHub Pages
1. Buat repo baru, upload semua isi folder ini (termasuk `.nojekyll`).
2. Settings > Pages > Source: Deploy from a branch > `main` / root.
3. Buka `https://USERNAME.github.io/NAMA-REPO/`.

## 3. Pasang URL server
Edit `config.js` (isi `apiUrl` dan `apiKey`), atau biarkan kosong: aplikasi menanyakan saat pertama dibuka.

## 4. Install
Android Chrome: menu ⋮ > Install app. iPhone Safari: Bagikan > Add to Home Screen.

Update aplikasi: ganti file di repo; ubah `VER` di `sw.js` agar cache lama diganti.
