// src/dom.js
import { getWeatherIcon } from './utils.js';

const formatDay = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', { weekday: 'short' });
};

export const renderWeatherCard = (city, weatherData) => {
    const container = document.getElementById('weather-container');
    
    // 1. Ambil Data
    const { temperature, weathercode } = weatherData.current_weather;
    const visual = getWeatherIcon(weathercode); // Pakai logika ikon baru
    const { time, weathercode: dailyCodes, temperature_2m_max, temperature_2m_min } = weatherData.daily;

    // 2. Loop Prediksi 3 Hari
    let forecastHTML = '';
    for (let i = 1; i <= 3; i++) {
        const dailyVisual = getWeatherIcon(dailyCodes[i]);
        forecastHTML += `
            <div class="flex flex-col items-center p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
                <span class="text-[10px] font-bold text-white/70 uppercase tracking-wide">${formatDay(time[i])}</span>
                <span class="text-2xl my-1 drop-shadow-md">${dailyVisual.icon}</span>
                <div class="flex gap-2 text-xs text-white">
                    <span class="font-bold">${Math.round(temperature_2m_max[i])}°</span>
                    <span class="opacity-50">${Math.round(temperature_2m_min[i])}°</span>
                </div>
            </div>
        `;
    }

    // 3. Susun Card Glassmorphism
    // Perhatikan class 'backdrop-blur-md' dan 'bg-white/10' (Tailwind)
    const cardHTML = `
        <div class="group relative overflow-hidden rounded-3xl bg-white/10 p-6 text-white shadow-2xl backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2">
            
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h3 class="text-2xl font-bold tracking-tight drop-shadow-md">${city.name}</h3>
                    <p class="text-xs text-blue-200/80 flex items-center gap-1 mt-1">
                        📍 ${parseFloat(city.lat).toFixed(2)}, ${parseFloat(city.lon).toFixed(2)}
                    </p>
                </div>
                <div class="text-right">
                    <span class="text-5xl font-black tracking-tighter drop-shadow-lg">${Math.round(temperature)}°</span>
                </div>
            </div>

            <div class="flex items-center gap-4 mb-6 bg-black/20 p-4 rounded-2xl border border-white/5 shadow-inner">
                <span class="text-5xl filter drop-shadow-xl animate-pulse">${visual.icon}</span>
                <div>
                    <p class="text-lg font-bold text-white">${visual.label}</p>
                    <p class="text-xs text-white/50">Update Realtime</p>
                </div>
            </div>

            <div class="grid grid-cols-3 gap-3">
                ${forecastHTML}
            </div>
        </div>
    `;

    container.innerHTML += cardHTML;
};