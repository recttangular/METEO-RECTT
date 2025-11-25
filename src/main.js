// src/main.js
// Import: Memanggil bantuan dari file lain
import { cities } from './utils.js';
import { fetchWeather } from './api.js';
import { renderWeatherCard } from './dom.js';

const init = async () => {
    const container = document.getElementById('weather-container');
// Bersihkan layar dulu biar bersih
    container.innerHTML = '<p>Sedang memuat data cuaca...</p>';

    // Hapus pesan loading setelah sebentar (opsional, biar rapi)
    container.innerHTML = '';

    console.log("Memulai aplikasi METEO-RECTT...");
    // Looping untuk setiap kota (Roadmap: Array Methods)
    for (const city of cities) {
        // 1. Ambil data dari API
        const weatherData = await fetchWeather(city.lat, city.lon);

        // 2. Jika data berhasil diambil, tampilkan ke layar
        if (weatherData) {
            renderWeatherCard(city, weatherData);
        } else {
            console.error(`Gagal memuat data untuk ${city.name}`);
        }
    }
};

// Jalankan perintah manajer
init();