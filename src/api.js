// src/api.js

// Kita pakai 'async' karena mengambil data butuh waktu (loading)
export const fetchWeather = async (lat, lon) => {
    try {
        // URL ini alamat pasarnya. Kita selipkan lat & lon pakai simbol ${} (Template Literals)
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
        
        // 'await fetch' artinya: "Tunggu sampai kurir balik bawa paket"
        const response = await fetch(url);
        
        // Paket datang dalam format mentah, kita ubah jadi JSON agar bisa dibaca
        const data = await response.json();
        
        return data; 
    } catch (error) {
        // Kalau kurir tersesat atau internet mati, error akan muncul di sini
        console.error("Gagal ambil data:", error);
        return null;
    }
};