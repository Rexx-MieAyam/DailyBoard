// Fase 6 == Refactoring - Storage

// MINGGU 7 - Simpan & Muat LocalStorage untuk Tugas
export function simpanKeStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function muatDariStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}