# Galeri UMKM

**Galeri UMKM** adalah aplikasi web yang membantu pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) Indonesia untuk mempromosikan produk mereka secara digital. Aplikasi ini terdiri dari dua antarmuka utama:

- 🛒 **Halaman Pembeli** – Menampilkan produk-produk UMKM, dengan fitur filter kategori dan pembelian melalui WhatsApp.
- 🧑‍💼 **Dashboard Seller** – Digunakan oleh penjual untuk menambah, mengedit, dan menghapus produk secara real-time menggunakan Firebase Firestore.

---

## 🚀 Fitur

### 👤 Untuk Pembeli
- Lihat daftar produk dari berbagai kategori.
- Filter produk berdasarkan kategori.
- Klik tombol **Beli** untuk membuka WhatsApp dengan detail produk dan data pembeli.

### 🧑‍💼 Untuk Penjual (Seller)
- Tambah produk baru lengkap dengan nama, kategori, deskripsi, harga, dan gambar.
- Edit produk langsung di tampilan menggunakan SweetAlert2.
- Hapus produk dengan konfirmasi.
- Semua data tersimpan di Firebase Firestore.

---

## 🧰 Teknologi yang Digunakan

- **HTML5**, **CSS3**, dan **JavaScript**
- **Modular ES6 (`type="module`)**
- **Firebase Firestore** (real-time database)
- **SweetAlert2** untuk UI interaktif
- **WhatsApp API** untuk pembelian

---

## 📁 Struktur Folder

```
/cloudcomputing
│
├── index.html                 # Halaman pembeli
├── firebase-config.js         # File konfigurasi Firebase (reusable)
├── /seller/
│   └── index.html             # Dashboard penjual
│
├── /assets/
│   ├── css/                   # File CSS (optional)
│   ├── js/                    # JS tambahan (optional)
│   └── img/                   # Gambar produk (optional)
```

---

## 🛠 Cara Menjalankan (Lokal)

> Karena menggunakan `import/export`, kamu **harus** menjalankan dengan web server.

### Pilihan:
- 📦 Gunakan **Live Server** di VS Code
- 🌐 Jalankan dengan `http-server`
```bash
npx http-server .
```

Kemudian buka:
- Pembeli → `http://localhost:8080/index.html`
- Seller → `http://localhost:8080/seller/index.html`

---

## 🔒 Catatan Keamanan

Pastikan kunci API Firebase kamu tetap dalam mode pengujian atau gunakan **rules Firestore** yang tepat jika akan digunakan secara publik.

---

## ✨ Pengembangan Lanjutan (Opsional)

- Integrasi **Firebase Authentication** (login seller)
- Upload gambar ke **Firebase Storage**
- Pencarian produk (search bar)
- Pagination atau infinite scroll

---

## 📜 Lisensi

Proyek ini dibuat untuk pembelajaran dan pengembangan digitalisasi UMKM. Bebas digunakan, dimodifikasi, dan dikembangkan.

---

## 🙌 Dibuat Oleh
Mahasiswa Universitas Pamulang

[![GitHub](https://img.shields.io/badge/GitHub-EBRENTINAMBUNAN-181717?logo=github)](https://github.com/ebrentinambunan)

Dengan semangat #BanggaBuatanIndonesia 🇮🇩

---

## 🗃 Struktur Koleksi Firestore

Pastikan koleksi di Firestore kamu bernama **`products`** dan setiap dokumen di dalamnya memiliki struktur field seperti berikut:

| Field        | Tipe Data | Keterangan                          |
|--------------|-----------|--------------------------------------|
| `name`       | string    | Nama produk                          |
| `category`   | string    | Kategori produk (mis: makanan, jasa) |
| `description`| string    | Deskripsi produk                     |
| `price`      | string / number | Harga produk                   |
| `image`      | string (base64) | Gambar produk dalam base64       |

Contoh tampilan di Firebase Console:
- Masuk ke menu **Firestore Database**
- Klik koleksi `products`
- Pastikan kolom yang ditampilkan adalah: `name`, `category`, `description`, `price`, dan `image`
