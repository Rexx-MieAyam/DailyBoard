// FASE 1 == DASAR DOM & EVENT HANDLING


// MINGGU 1 & 2: Seleksi Root DOM & Pembuatan 3 Section Dinamis
const app = document.getElementById("app");

const judul = document.createElement("h2");
judul.textContent = "Selamat datang di DailyBoard!";
judul.style.color = "#897474";
app.appendChild(judul);

// MINGGU 2: Membuat 3 Section Kosong (Tugas, Catatan, Cuaca) via JavaScript
const tugasSection = document.createElement("section");
tugasSection.id = "tugas-section";

const catatanSection = document.createElement("section");
catatanSection.id = "catatan-section";

const cuacaSection = document.createElement("section");
cuacaSection.id = "cuaca-section";

app.append(tugasSection, catatanSection, cuacaSection);

// UI Seksi Tugas
const titleTugas = document.createElement("h3");
titleTugas.textContent = "Daftar Tugas";

// MINGGU 14: Input Pencarian Real-Time
const inputCari = document.createElement("input");
inputCari.type = "text";
inputCari.id = "cari-tugas";
inputCari.placeholder = "Cari tugas...";

// MINGGU 3: Form Input Nama Tugas & Tombol Tambah
const inputTugas = document.createElement("input");
inputTugas.type = "text";
inputTugas.placeholder = "Masukkan nama tugas Baru";

const tombolTambah = document.createElement("button");
tombolTambah.textContent = "Tambah Tugas";

// MINGGU 6: Tombol Filter (Semua, Selesai, Belum Selesai)
const filterContainer = document.createElement("div");
filterContainer.id = "filter-container";

const btnSemua = document.createElement("button");
btnSemua.textContent = "Semua";

const btnSelesai = document.createElement("button");
btnSelesai.textContent = "Selesai";

const btnBelum = document.createElement("button");
btnBelum.textContent = "Belum Selesai";

filterContainer.append(btnSemua, btnSelesai, btnBelum);

// MINGGU 4: Container Elemen List Tugas (<ul>)
const daftar_tugas = document.createElement("ul");
daftar_tugas.id = "daftar-tugas";

tugasSection.append(titleTugas, inputCari, inputTugas, tombolTambah, filterContainer, daftar_tugas);

// FASE 2 == TO-DO-LIST


let daftarTugas = [];
let nextId = 1;
let filterAktif = "semua";
let kataKunciCari = "";

// MINGGU 9 - Fungsi Validasi Input
function validasiInput(nilai) {
  if (nilai.trim() === "") {
    alert("Input tidak boleh kosong!");
    return false;
  }
  if (nilai.length > 100) {
    alert("Input maksimal 100 karakter!");
    return false;
  }
  return true;
}

// MINGGU 7 - Simpan & Muat LocalStorage untuk Tugas
function simpanKeStorage() {
  localStorage.setItem("daftarTugas", JSON.stringify(daftarTugas));
}

function muatDariStorage() {
  const data = localStorage.getItem("daftarTugas");
  if (data) {
    daftarTugas = JSON.parse(data);
    if (daftarTugas.length > 0) {
      const maxId = Math.max(...daftarTugas.map((t) => t.id));
      nextId = maxId + 1;
    }
  } else {
    daftarTugas = [
      { id: 1, nama: "Belajar JavaScript DOM", selesai: false },
      { id: 2, nama: "Mencoba Drag and Drop", selesai: false }
    ];
    nextId = 3;
  }
}

// MINGGU 5 - Tambah & Hapus Tugas
function tambahTugas(nama) {
  daftarTugas.push({ 
    id: nextId++, 
    nama, 
    selesai: false 
  });
  simpanKeStorage();
  renderTugas();
}

function hapusTugas(id) {
  daftarTugas = daftarTugas.filter((t) => t.id !== id);
  simpanKeStorage();
  renderTugas();
}

// MINGGU 6 - Tandai Selesai & Filter
function toggleSelesai(id) {
  daftarTugas = daftarTugas.map((t) =>
    t.id === id ? { ...t, selesai: !t.selesai } : t
  );
  simpanKeStorage();
  renderTugas();
}

// MINGGU 9 - Edit Tugas
function editTugas(id, namaBaru) {
  daftarTugas = daftarTugas.map((t) =>
    t.id === id ? { ...t, nama: namaBaru } : t
  );
  simpanKeStorage();
  renderTugas();
}

// Render utama
function renderTugas(filter = filterAktif) {
  filterAktif = filter;
  daftar_tugas.innerHTML = "";

  // MINGGU 6 & 14 - Menyaring berdasarkan Filter Status dan Kata Kunci Pencarian
  const tugasTersaring = daftarTugas.filter((t) => {
    const cocokFilter =
      filter === "selesai" ? t.selesai : filter === "belum" ? !t.selesai : true;
    const cocokCari = t.nama.toLowerCase().includes(kataKunciCari.toLowerCase());
    return cocokFilter && cocokCari;
  });

  tugasTersaring.forEach((tugas, index) => {
    const li = document.createElement("li");
    li.dataset.id = tugas.id;

    // MINGGU 13 - Pengaturan Drag and Drop HTML5
    li.setAttribute("draggable", true);

    li.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", index);
      li.classList.add("dragging");
    });

    li.addEventListener("dragend", () => {
      li.classList.remove("dragging");
    });

    li.addEventListener("dragover", (e) => e.preventDefault());

    li.addEventListener("drop", (e) => {
      e.preventDefault();
      const originIndex = e.dataTransfer.getData("text/plain");
      const targetIndex = index;

      if (originIndex !== "" && originIndex !== targetIndex) {
        // MINGGU 13 - Mengubah urutan array & Simpan ke localStorage
        const movedItem = daftarTugas.splice(originIndex, 1)[0];
        daftarTugas.splice(targetIndex, 0, movedItem);
        simpanKeStorage();
        renderTugas();
      }
    });

    // Elemen Teks
    const spanTeks = document.createElement("span");
    spanTeks.textContent = tugas.nama;
    spanTeks.style.textDecoration = tugas.selesai ? "line-through" : "none";
    spanTeks.style.cursor = "pointer";

    // MINGGU 6 - Klik 1x untuk Tandai Selesai
    spanTeks.addEventListener("click", () => toggleSelesai(tugas.id));

    // MINGGU 9 - Double Click untuk Edit Tugas
    spanTeks.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      const namaBaru = prompt("Edit Nama Tugas:", tugas.nama);
      if (namaBaru !== null && validasiInput(namaBaru)) {
        editTugas(tugas.id, namaBaru.trim());
      }
    });

    // MINGGU 5 - Tombol Hapus Tugas
    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    tombolHapus.addEventListener("click", (e) => {
      e.stopPropagation();
      hapusTugas(tugas.id);
    });

    li.append(spanTeks, tombolHapus);
    daftar_tugas.appendChild(li);
  });
}

// Event Listeners Input & Filter Tugas
tombolTambah.addEventListener("click", () => {
  const teks = inputTugas.value;
  if (validasiInput(teks)) {
    tambahTugas(teks.trim());
    inputTugas.value = "";
  }
});

btnSemua.addEventListener("click", () => renderTugas("semua"));
btnSelesai.addEventListener("click", () => renderTugas("selesai"));
btnBelum.addEventListener("click", () => renderTugas("belum"));

// MINGGU 14 - Event Input Pencarian Real-Time
inputCari.addEventListener("input", (e) => {
  kataKunciCari = e.target.value;
  renderTugas();
});


// FASE 3 == FAST NOTE & CATATAN

const titleCatatan = document.createElement("h3");
titleCatatan.textContent = "Catatan Cepat";

const inputCatatan = document.createElement("textarea");
inputCatatan.placeholder = "Tulis catatan di sini...";

const tombolTambahCatatan = document.createElement("button");
tombolTambahCatatan.textContent = "Tambah Catatan";

const containerCatatan = document.createElement("div");
containerCatatan.className = "catatan-container";
containerCatatan.id = "daftar-catatan";

catatanSection.append(titleCatatan, inputCatatan, tombolTambahCatatan, containerCatatan);

let daftarCatatan = [];

function simpanCatatanKeStorage() {
  localStorage.setItem("daftarCatatan", JSON.stringify(daftarCatatan));
}

function muatCatatanDariStorage() {
  const data = localStorage.getItem("daftarCatatan");
  daftarCatatan = data ? JSON.parse(data) : [];
}

function renderCatatan() {
  containerCatatan.innerHTML = "";

  daftarCatatan.forEach((catatan) => {
    const div = document.createElement("div");
    div.className = "catatan-item";
    div.innerHTML = `
      <p>${catatan.isi}</p>
      <small>${catatan.tanggal}</small>
    `;

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "x";
    tombolHapus.addEventListener("click", () => hapusCatatan(catatan.id));

    div.appendChild(tombolHapus);
    containerCatatan.appendChild(div);
  });
}

function tambahCatatan(isi) {
  daftarCatatan.push({
    id: Date.now(),
    isi,
    tanggal: new Date().toLocaleDateString("id-ID")
  });
  simpanCatatanKeStorage();
  renderCatatan();
}

function hapusCatatan(id) {
  daftarCatatan = daftarCatatan.filter((c) => c.id !== id);
  simpanCatatanKeStorage();
  renderCatatan();
}

tombolTambahCatatan.addEventListener("click", () => {
  const isi = inputCatatan.value;
  if (validasiInput(isi)) {
    tambahCatatan(isi.trim());
    inputCatatan.value = "";
  }
});


// FASE 4 == INTERGRASI API

const titleCuaca = document.createElement("h3");
titleCuaca.textContent = "Widget Info & Cuaca";

// MINGGU 12 -Indikator Status Loading Global Widget
const statusWidget = document.createElement("p");
statusWidget.id = "status";
statusWidget.style.fontStyle = "italic";

const kutipanArea = document.createElement("blockquote");
kutipanArea.id = "kutipan-harian";

// MINGGU 11 - Form Input Nama Kota
const inputKota = document.createElement("input");
inputKota.placeholder = "Masukkan nama kota...";

const tombolCariCuaca = document.createElement("button");
tombolCariCuaca.textContent = "Cari Cuaca";

const infoCuaca = document.createElement("div");
infoCuaca.id = "info-cuaca";

cuacaSection.append(titleCuaca, statusWidget, kutipanArea, inputKota, tombolCariCuaca, infoCuaca);

// MINGGU 10 - Fetch API Kutipan Hari Ini
async function ambilKutipan() {
  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    if (!res.ok) throw new Error("Gagal mengambil kutipan");
    const data = await res.json();
    kutipanArea.innerHTML = `"${data.quote}" — <strong>${data.author}</strong>`;
  } catch (error) {
    kutipanArea.textContent = "Gagal memuat kutipan harian.";
    console.error(error);
  }
}

// MINGGU 11 - Fetch API Cuaca
async function ambilCuaca(kota) {
  const apiKey = "787226a476ddc70f3f42b3d777f2458c";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${kota}&units=metric&appid=${apiKey}&lang=id`;

  infoCuaca.textContent = "Memuat data cuaca...";
  
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Kota tidak ditemukan");
    const data = await res.json();
    infoCuaca.innerHTML = `
      <p><strong>${data.name}:</strong> ${Math.round(data.main.temp)}°C, ${data.weather[0].description}</p>
    `;
  } catch (error) {
    infoCuaca.textContent = error.message;
  }
}

tombolCariCuaca.addEventListener("click", () => {
  const kota = inputKota.value.trim();
  if (kota !== "") {
    ambilCuaca(kota);
  } else {
    alert("Masukkan nama kota!");
  }
});

// MINGGU 12 - Promise.all untuk Memuat Seluruh Widget Saat Halaman Dibuka
async function muatSemuaWidget() {
  statusWidget.textContent = "Memuat data widget...";
  await Promise.all([ambilKutipan(), ambilCuaca("Jakarta")]);
  statusWidget.textContent = "Data widget berhasil dimuat!";
}

// Fase 5 == Dark Mode

// MINGGU 14 - Dark Mode Toggle dengan LocalStorage
const toggleTema = document.getElementById("toggle-tema");

toggleTema.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const modeGelap = document.body.classList.contains("dark-mode");
  localStorage.setItem("tema", modeGelap ? "gelap" : "terang");
  toggleTema.textContent = modeGelap ? "Mode Terang" : "Mode Gelap";
});

// Inisialisasi App Saat DOM Selesai Dimuat
window.addEventListener("DOMContentLoaded", () => {
      if (localStorage.getItem("tema") === "gelap") {
      document.body.classList.add("dark-mode");
      toggleTema.textContent = "Mode Terang";
    }

  muatDariStorage();
  renderTugas();

  muatCatatanDariStorage();
  renderCatatan();

  muatSemuaWidget();
});