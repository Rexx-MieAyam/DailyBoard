// Fase 6 == Refactoring - Catatan
export function tambahCatatan(daftarCatatan, isi) {
  return [...daftarCatatan, {
    id: Date.now(),
    isi: isi.trim(),
    tanggal: new Date().toLocaleDateString("id-ID")
  }];
}

export function hapusCatatan(daftarCatatan, id) {
  return daftarCatatan.filter((c) => c.id !== id);
}

export function editCatatan(daftarCatatan, id, teksBaru) {
  return daftarCatatan.map((c) =>
    c.id === id ? { ...c, isi: teksBaru.trim() } : c
  );
}

// Render Catatan disatukan dalam modul catatan.js
export function renderCatatan(daftarCatatan, container, handlers) {
  container.innerHTML = "";

  daftarCatatan.forEach((catatan) => {
    const div = document.createElement("div");
    div.className = "catatan-item";
    div.innerHTML = `
      <p>${catatan.isi}</p>
      <small>${catatan.tanggal}</small><br>
      <button class="btn-hapus-catatan">Hapus</button>
    `;

    div.querySelector("p").addEventListener("dblclick", () => {
      handlers.onEdit(catatan.id, catatan.isi);
    });

    div.querySelector(".btn-hapus-catatan").addEventListener("click", () => {
      handlers.onHapus(catatan.id);
    });

    container.appendChild(div);
  });
}   