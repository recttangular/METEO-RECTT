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
        <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 border-l-4 border-blue-500">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-xl font-bold text-slate-800">${city.name}</h3>
                    <p class="text-xs text-slate-500">Lat: ${city.lat}, Lon: ${city.lon}</p>
                </div>
                <div class="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                    Realtime
                </div>
            </div>
            
            <div class="flex items-center gap-4">
                <div class="text-4xl font-bold text-blue-600">
                    ${temperature}°C
                </div>
                <div class="text-sm text-slate-600">
                    <p>Kode Cuaca: <span class="font-medium">${weathercode}</span></p>
                </div>
            </div>
        </div>
    `;

    // 4. Masukkan ke dalam wadah
    container.innerHTML += cardHTML;
};