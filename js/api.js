// FASE 6 == Refactoring - API

// MINGGU 10 - Fetch API Kutipan Hari Ini
export async function ambilKutipan() {
  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
   if (!res.ok) throw new Error("Gagal mengambil kutipan");
    const data = await res.json();
    return data.quote;
  } catch (error) {
    console.error("Gagal mengambil kutipan:", error);
    return "Gagal memuat kutipan harian.";
  }
}

// MINGGU 11 - Fetch API Cuaca
export async function ambilCuaca(kota) {
  const apiKey = "787226a476ddc70f3f42b3d777f2458c";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${kota}&units=metric&appid=${apiKey}&lang=id`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Kota tidak ditemukan");
    const data = await res.json();
    return `<p>${data.name}: ${data.main.temp}°C</p><p>${data.weather[0].description}</p>`;
  } catch (error) {
    return `<p>${error.message}</p>`;
  }
}