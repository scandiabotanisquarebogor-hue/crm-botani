# CRM Follow Up

- Root folder = PWA (GitHub Pages).
- `android/` = pembungkus APK (WebView). Dibangun otomatis oleh GitHub Actions (tab Actions > Build APK > Artifacts).
- Repo: scandiabotanisquarebogor-hue/crm-botani (Pages: https://scandiabotanisquarebogor-hue.github.io/crm-botani/)
- Server: Apps Script (Code.gs, sudah berisi doPost). URL ada di `config.js` dan `android/app/src/main/assets/www/config.js`.

Jika Index.html diperbarui, salin juga ke `android/app/src/main/assets/www/index.html` dan hapus baris pendaftaran service worker di salinan itu, lalu ganti `dlBase64` agar memanggil `AndroidApp.saveFile` (lihat salinan yang ada).
