// Minggu 15 - Import Modul
import { simpanKeStorage, muatDariStorage } from "./js/storage.js";
import { tambahTugas, hapusTugas, toggleSelesai, editTugas, renderTugas } from "./js/tugas.js";
import { tambahCatatan, hapusCatatan, editCatatan, renderCatatan } from "./js/catatan.js";
import { ambilKutipan, ambilCuaca } from "./js/api.js";


// Minggu 4 & Minggu 7
let daftarTugas = muatDariStorage("daftarTugas");
let daftarCatatan = muatDariStorage("daftarCatatan");
let filterAktif = "semua";
let nextId = daftarTugas.length ? Math.max(...daftarTugas.map((t) => t.id)) + 1 : 1;

// Minggu 1-3 - Layout DOM
const app = document.getElementById("app");
const header = document.getElementById("main-header");

const statusEl = document.createElement("p");
statusEl.id = "status";

const secTugas = document.createElement("section");
secTugas.innerHTML = `
  <h3>Daftar Tugas</h3>
  <input type="text" id="input-tugas" placeholder="Nama tugas baru...">
  <button id="btn-tambah-tugas">Tambah</button>
  <br><br>
  
  <div class="search-box">
    <input type="text" id="cari-tugas" placeholder="Cari tugas..." autocomplete="off">
    <ul id="hasil-cari-tugas" class="dropdown-hasil" style="display:none;"></ul>
  </div>

  <div style="margin-bottom: 10px;">
    <button id="filter-semua">Semua</button>
    <button id="filter-selesai">Selesai</button>
    <button id="filter-belum">Belum Selesai</button>
  </div>
  <ul id="daftar-tugas"></ul>
`;

const secCatatan = document.createElement("section");
secCatatan.innerHTML = `
  <h3>Catatan Cepat</h3>
  <textarea id="input-catatan" placeholder="Tulis catatan..."></textarea><br>
  <button id="btn-tambah-catatan">Simpan Catatan</button>
  <div id="daftar-catatan"></div>
`;

const secWidget = document.createElement("section");
secWidget.innerHTML = `
  <h3>Widget</h3>
  <button id="refreshKutipanBtn">↻</button>
  <blockquote id="kutipan-harian">Memuat kutipan...</blockquote>
  
  <div class="search-box">
    <input type="text" id="input-kota" placeholder="Cari kota..." autocomplete="off">
    <div id="info-cuaca"></div>
  </div>
`;

const toggleTema = document.createElement("button");
toggleTema.id = "toggle-tema";
toggleTema.textContent = "Dark Mode";
header.appendChild(toggleTema);

app.append(secTugas, secCatatan, secWidget);

// Pemilihan DOM
const listTugasEl = document.getElementById("daftar-tugas");
const inputTugasEl = document.getElementById("input-tugas");
const listCatatanEl = document.getElementById("daftar-catatan");
const inputCatatanEl = document.getElementById("input-catatan");
const inputCariTugas = document.getElementById("cari-tugas");
const dropdownTugas = document.getElementById("hasil-cari-tugas");
const inputKota = document.getElementById("input-kota");
const infoCuaca = document.getElementById("info-cuaca");
const refreshKutipanBtn = document.getElementById("refreshKutipanBtn");

// Minggu 9 & 16 - Helper & Validasi 
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function validasiInput(nilai) {
  if (!nilai.trim()) {
    alert("Input tidak boleh kosong!");
    return false;
  }
  if (nilai.length > 93) {
    alert("Input maksimal 93 karakter!");
    return false;
  }
  return true;
}

// Minggu 4, 8, 13, 15 - Render UI 
function updateTugasUI() {
  simpanKeStorage("daftarTugas", daftarTugas);
  renderTugas(daftarTugas, listTugasEl, filterAktif, {
    onToggle: (id) => {
      daftarTugas = toggleSelesai(daftarTugas, id);
      updateTugasUI();
    },
    onHapus: (id) => {
      daftarTugas = hapusTugas(daftarTugas, id);
      updateTugasUI();
    },
    onEdit: (id, namaLama) => {
      const baru = prompt("Edit Tugas:", namaLama);
      if (baru !== null && validasiInput(baru)) {
        daftarTugas = editTugas(daftarTugas, id, baru);
        updateTugasUI();
      }
    },
    onReorder: (idAsal, idTarget) => {
      // Fix: Konversi ke Number agar cocok tipe datanya
      const idxAsal = daftarTugas.findIndex((t) => Number(t.id) === Number(idAsal));
      const idxTarget = daftarTugas.findIndex((t) => Number(t.id) === Number(idTarget));
      
      if (idxAsal !== -1 && idxTarget !== -1) {
        const [moved] = daftarTugas.splice(idxAsal, 1);
        daftarTugas.splice(idxTarget, 0, moved);
        updateTugasUI();
      }
    }
  });
}

function updateCatatanUI() {
  simpanKeStorage("daftarCatatan", daftarCatatan);
  renderCatatan(daftarCatatan, listCatatanEl, {
    onHapus: (id) => {
      daftarCatatan = hapusCatatan(daftarCatatan, id);
      updateCatatanUI();
    },
    onEdit: (id, isiLama) => {
      const baru = prompt("Edit Catatan:", isiLama);
      if (baru !== null && validasiInput(baru)) {
        daftarCatatan = editCatatan(daftarCatatan, id, baru);
        updateCatatanUI();
      }
    }
  });
}

// Minggu 3, 5, 6, 8 - Event Listeners 
document.getElementById("btn-tambah-tugas").addEventListener("click", () => {
  if (validasiInput(inputTugasEl.value)) {
    daftarTugas = tambahTugas(daftarTugas, inputTugasEl.value, nextId++);
    inputTugasEl.value = "";
    updateTugasUI();
  }
});

document.getElementById("filter-semua").onclick = () => { filterAktif = "semua"; updateTugasUI(); };
document.getElementById("filter-selesai").onclick = () => { filterAktif = "selesai"; updateTugasUI(); };
document.getElementById("filter-belum").onclick = () => { filterAktif = "belum"; updateTugasUI(); };

document.getElementById("btn-tambah-catatan").addEventListener("click", () => {
  if (validasiInput(inputCatatanEl.value)) {
    daftarCatatan = tambahCatatan(daftarCatatan, inputCatatanEl.value);
    inputCatatanEl.value = "";
    updateCatatanUI();
  }
});

// Minggu 14 & Minggu 16 - Live Search 
inputCariTugas.addEventListener("input", debounce((e) => {
  const query = e.target.value.toLowerCase().trim();
  dropdownTugas.innerHTML = "";

  if (!query) {
    dropdownTugas.style.display = "none";
    return;
  }

  const hasil = daftarTugas.filter((t) => t.nama.toLowerCase().includes(query));

  if (!hasil.length) {
    dropdownTugas.innerHTML = `<li class="no-result">Tugas tidak ditemukan</li>`;
  } else {
    hasil.forEach((tugas) => {
      const li = document.createElement("li");
      li.textContent = `${tugas.nama} (${tugas.selesai ? "Selesai" : "Belum"})`;
      dropdownTugas.appendChild(li);
    });
  }
  dropdownTugas.style.display = "block";
}, 300));

//  Minggu 11 & Minggu 16 - API Cuaca Live
inputKota.addEventListener("input", debounce(async (e) => {
  const kota = e.target.value.trim();
  if (kota.length < 3) {
    infoCuaca.innerHTML = "";
    return;
  }
  infoCuaca.innerHTML = "Mencari cuaca...";
  infoCuaca.innerHTML = await ambilCuaca(kota);
}, 500));

// Minggu 14 - Dark Mode 
toggleTema.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const modeAktif = document.body.classList.contains("dark-mode");
  localStorage.setItem("tema", modeAktif ? "gelap" : "terang");
});

refreshKutipanBtn.addEventListener("click", async () => {
  const kutipanEl = document.getElementById("kutipan-harian")
  kutipanEl.textContent = "Memuat kutipan...";
  const kutipan = await ambilKutipan()
  kutipanEl.textContent = kutipan;
});

// Minggu 12 & Minggu 14
window.addEventListener("DOMContentLoaded", async () => {
  if (localStorage.getItem("tema") === "gelap") {
    document.body.classList.add("dark-mode");
  }

  updateTugasUI();
  updateCatatanUI();

  const [kutipan, cuaca] = await Promise.all([
    ambilKutipan(),
    ambilCuaca("Jakarta")
  ]);

  document.getElementById("kutipan-harian").textContent = kutipan;
  infoCuaca.innerHTML = cuaca;

});