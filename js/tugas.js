// FASE 6 == Reractoring - TUGAS

import { simpanKeStorage } from "./storage.js";

// MINGGU 5 - Tambah & Hapus Tugas
export function tambahTugas(daftarTugas, nama, nextId) {
  return [...daftarTugas, { 
    id: nextId++, 
    nama: nama.trim(), 
    selesai: false 
  }];
}

export function hapusTugas(daftarTugas, id) {
  return daftarTugas.filter((t) => t.id !== id);
}

// MINGGU 6 - Tandai Selesai & Filter
export function toggleSelesai(daftarTugas, id) {
  return daftarTugas.map((t) =>
    t.id === id ? { ...t, selesai: !t.selesai } : t
  );
}

// MINGGU 9 - Edit Tugas
export function editTugas(daftarTugas, id, namaBaru) {
  return daftarTugas.map((t) =>
    t.id === id ? { ...t, nama: namaBaru.trim()} : t
  );
}

// Render tugas disatukan dalam tugas.js
export function renderTugas(daftarTugas, container, filter = "semua", handlers) {
  container.innerHTML = "";

  const tugasTersaring = daftarTugas.filter((t) => {
    if (filter === "selesai") return t.selesai;
    if (filter === "belum") return !t.selesai;
    return true;
  });

  tugasTersaring.forEach((tugas) => {
    const li = document.createElement("li");
    li.className = "tugas-item";
    li.dataset.id = tugas.id;
    li.setAttribute("draggable", true);

    const span = document.createElement("span");
    span.textContent = tugas.nama;
    span.style.textDecoration = tugas.selesai ? "line-through" : "none";

    span.addEventListener("click", () => handlers.onToggle(tugas.id));
    span.addEventListener("dblclick", () => handlers.onEdit(tugas.id, tugas.nama));

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    tombolHapus.addEventListener("click", (e) => {
      e.stopPropagation();
      handlers.onHapus(tugas.id);
    });

    li.appendChild(span);
    li.appendChild(tombolHapus);

    // Minggu 13 - Pengaturan Drag & Drop
    li.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", String(tugas.id));
      e.dataTransfer.effectAllowed = "move";
      li.style.opacity = "0.5";
    });

    li.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    });

    li.addEventListener("dragend", () => {
      li.style.opacity = "1";
    });

    li.addEventListener("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const idAsal = e.dataTransfer.getData("text/plain");
      const idTarget = String(tugas.id);

      if (idAsal && idAsal !== idTarget) {
        handlers.onReorder(Number(idAsal), Number(idTarget));
      }
    });

    container.appendChild(li);
  });
}