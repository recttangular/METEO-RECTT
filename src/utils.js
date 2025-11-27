export const cities = [
    { id: 1, name: "Jakarta", lat: -6.2088, lon: 106.8456 },
    { id: 2, name: "Makassar", lat: -5.1477, lon: 119.4327 },
    { id: 3, name: "Padang", lat: -0.56, lon: 100.22 },
    { id: 4, name: "Jayapura", lat: -2.5337, lon: 140.7181 },
    { id: 5, name: "Tokyo", lat: 35.6895, lon: 139.6917 }
];
// src/utils.js

// ... (Kode cities yang lama biarkan saja di atas) ...

// --- TAMBAHAN BARU ---
export const getWeatherIcon = (code) => {
    const weatherMap = {
        0: { icon: "☀️", label: "Cerah", color: "text-yellow-400" },
        1: { icon: "🌤️", label: "Cerah Berawan", color: "text-orange-400" },
        2: { icon: "⛅", label: "Berawan", color: "text-gray-300" },
        3: { icon: "☁️", label: "Mendung", color: "text-gray-400" },
        45: { icon: "🌫️", label: "Berkabut", color: "text-gray-400" },
        61: { icon: "🌧️", label: "Hujan Ringan", color: "text-blue-400" },
        63: { icon: "🌧️", label: "Hujan Sedang", color: "text-blue-500" },
        80: { icon: "🌦️", label: "Hujan Lokal", color: "text-blue-400" },
        95: { icon: "⚡", label: "Badai Petir", color: "text-purple-500" },
    };
    return weatherMap[code] || { icon: "❓", label: "Tidak Diketahui", color: "text-gray-400" };
};