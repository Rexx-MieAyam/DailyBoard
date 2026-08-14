# DailyBoard
Website ini dibuat untuk mengatur daftar tugas atau kegiatan yang harus diselesaikan, seperti harian atau mingguan.

Catatan : proyek ini saya buat untuk tugas sekolah untuk belajar bagaimana cara js bekerja dan cara menggunakana js dalam website,
          maaf jikalau website / proyek ini masih kurang rapih dan tidak berstruktur karena saya masih belajar.

## Fitur Dalam DailyBoard

### Fitur-Fitur Tugas
Fitur                   Cara Kerja
- Tambah Tugas          | - menulis di kotak, lalu tekan enter atau klik tombol akan menambahkan tugas yang anda ketik.
- Tandai Selesai        | - klik teks, akan ada coretan.
- Edit                  | - klik 2 kali untuk, mengedit tugas.
- Urutkan/drag & drop   | - drag & drop untuk menprioritaskan tugas "yang paling penting taruh di paling atas".
- Filter                | - jikalau ingin melihat yang belum klik Belum selesai, jikalau ingin melihat yang sudah selesai klik yang selesai.
- Search                | - mencari tugas dalam to-do-list.

### Catatan Cepat
Dalam Catatan cepat misalkan kalian muncul ide secara tiba tiba, atau ada yang harus diingat secara cepat catatan ini solusinya.
- Menulis di text area
- Memunculkan tanggal,bulan,tahun
- Fitur Hapus jikalau catatan tidak diperlukan lagi

### Widget Cuaca
- Kutipan Harian: Memunculkan kutipan random untuk memotivasi setiap halaman website di refresh 
- Cek Cuaca: Cek Cuaca kota yang diinginkan dengan cara mencari kota didalam text area (cari cuaca)

### Auto Save
Didalam website ini tidak perlu khawatir akan data hilang karena Semua Tugas, Catatan semuanya akan tersimpan di LocalStorage secara otomatis.

# Struktur pembuatan
- FASE 1: Dasar DOM & Event Handling (Minggu 1-3)
- FASE 2: Fitur To-Do List Interaktif (Minggu 4-6)
- FASE 3: LocalStorage & Fitur Catatan (Minggu 7-9)
- FASE 4: Integrasi API (Minggu 10-12)
- FASE 5: Fitur Lanjutan (Minggu 13-14)
- FASE 6: Optimasi, Testing & Deployment (Minggu 15-16)

## Panduan penggunaan - Tugas - Catatan - Widget

## Catatan

### Tambah Tugas
* Masukan Tugas -> Klik "Tambah"

### Tandai Selesai
* Klik pada teks tugas

### Edit Tugas
* Double Click pada teks tugas -> Edit Tugas -> Enter/OK

### Hapus tugas
* Klik tombol "Hapus"

### Filter
* Pilih opsi dari filter

### Urutkan / Drag & Drop
* Drag & drop item ke posisi yang diinginkan

## Catatan

### Buat catatan
* Textarea → Klik "Simpan Catatan"

### Edit catatan
* Double-click pada catatan → Edit → Simpan

### Hapus catatan
* Klik tombol "Hapus"

## Cuaca

### Cek Cuaca
* Masukan nama kota -> Hasil akan otomatis keluar

## Tema
### Ganti Tema
* Klik button "Dark mode / Light Mode"

## Struktur Dalam Folder
```DailyBoard/
├── index.html      Halaman utama
├── script.js       Bos-nya aplikasi (ngatur semuanya)
├── style.css       Untuk terlihat interaktif dan keren
├── README.md       Mendokumentasi Website
└── js/ # Folder berisi modul-modul
    ├── api.js       Urusan ngambil data dari internet
    ├── storage.js   Urusan nyimpen data di browser
    ├── tugas.js     Logika soal tugas (tambah, hapus, filter, dll)
    └── catatan.js   Logika soal catatan (tambah, edit, hapus)
```
