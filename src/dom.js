// src/dom.js

// Fungsi ini tugasnya cuma satu: Bikin kotak (Card) HTML dan tempel ke layar
export const renderWeatherCard = (city, weatherData) => {
    // 1. Cari wadah yang tadi kita buat di HTML
    const container = document.getElementById('weather-container');

    // 2. Ambil data suhu dari paket data
    // (Ini namanya Destructuring Object - Roadmap 1.1)
    const { temperature, weathercode } = weatherData.current_weather;

    // 3. Susun HTML-nya pakai Backticks (`)
    const cardHTML = `
        <div class="weather-card" style="border: 1px solid #ccc; padding: 10px; margin: 10px; border-radius: 8px;">
            <h3>${city.name}</h3>
            <p>Suhu: <strong>${temperature}°C</strong></p>
            <p>Kode Cuaca: ${weathercode}</p>
            <small>Lat: ${city.lat}, Lon: ${city.lon}</small>
        </div>
    `;

    // 4. Masukkan ke dalam wadah
    container.innerHTML += cardHTML;
};