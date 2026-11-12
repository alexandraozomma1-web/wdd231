// --- 1. OpenWeatherMap API Integration for Abakaliki ---
const apiKey = "38bf30fabd0227ced84f8a12e3f43176";// Replace with your free API key
const lat = 6.3249;
const lon = 8.1137;

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function apiFetch() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        }
        const forecastResponse = await fetch(forecastUrl);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        }
    } catch (error) {
        console.error("Weather fetch error:", error);
    }
}


function displayCurrentWeather(data) {
    const currentTemp = document.querySelector("#temp-value");
    const weatherDesc = document.querySelector("#weather-desc");
    const weatherIcon = document.querySelector("#weather-icon");
    const weatherSummary = document.querySelector("#weather-summary");

    if (currentTemp && weatherDesc) {
        const temp = Math.round(data.main.temp);
        currentTemp.textContent = temp;

        const desc = data.weather[0].description;
        const formattedDesc = desc.charAt(0).toUpperCase() + desc.slice(1);
        weatherDesc.textContent = formattedDesc;

        if (weatherSummary) {
            weatherSummary.textContent = `Currently ${formattedDesc.toLowerCase()} in Abakaliki with ${data.main.humidity}% humidity.`;
        }

        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        if (weatherIcon) {
            weatherIcon.setAttribute("src", iconUrl);
            weatherIcon.setAttribute("alt", formattedDesc);
        }
    }
}

function displayForecast(data) {
    const forecastContainer = document.querySelector("#forecast-cards");
    if (!forecastContainer) return;

    // Group 3-hour forecasts by calendar date to find daily High & Low
    const dailyMap = {};

    data.list.forEach((item) => {
        const dateKey = item.dt_txt.split(" ")[0];
        if (!dailyMap[dateKey]) {
            dailyMap[dateKey] = {
                dt: item.dt,
                temps: [],
                icon: item.weather[0].icon,
                desc: item.weather[0].description
            };
        }
        dailyMap[dateKey].temps.push(item.main.temp);
        // Prefer the midday icon (12:00:00) for a daytime weather symbol
        if (item.dt_txt.includes("12:00:00")) {
            dailyMap[dateKey].icon = item.weather[0].icon;
            dailyMap[dateKey].desc = item.weather[0].description;
        }
    });

    // Get the next 3 upcoming days (skipping today if we already have 4+ dates)
    const allDays = Object.values(dailyMap);
    const nextThreeDays = allDays.length > 3 ? allDays.slice(1, 4) : allDays.slice(0, 3);

    forecastContainer.innerHTML = "";

    nextThreeDays.forEach((day) => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        const highTemp = Math.round(Math.max(...day.temps));
        const lowTemp = Math.round(Math.min(...day.temps));

        const miniCard = document.createElement("div");
        miniCard.classList.add("forecast-day-card");
        miniCard.innerHTML = `
      <span class="day-name">${dayName}</span>
      <img src="https://openweathermap.org/img/wn/${day.icon}.png" alt="${day.desc}" width="45" height="45">
      <span class="temp-high">${highTemp}&deg;</span>
      <span class="temp-low">${lowTemp}&deg;</span>
    `;
        forecastContainer.appendChild(miniCard);
    });
}

// --- 2. Dynamic Member Spotlights ---
const membersUrl = "data/members.json";

async function getSpotlights() {
    try {
        const response = await fetch(membersUrl);
        const data = await response.json();
        const qualifiedMembers = data.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
        displaySpotlights(qualifiedMembers);
    } catch (error) {
        console.error("Error loading spotlights:", error);
    }
}

function displaySpotlights(members) {
    const spotlightContainer = document.querySelector("#spotlight-container");
    if (!spotlightContainer) return;

    spotlightContainer.innerHTML = "";
    const shuffled = members.sort(() => 0.5 - Math.random());
    const selectedMembers = shuffled.slice(0, 2);

    selectedMembers.forEach(member => {
        let card = document.createElement("section");
        card.classList.add("spotlight-card");

        let levelText = member.membershipLevel === 3 ? "Gold Member" : "Silver Member";

        card.innerHTML = `
      <img src="${member.image}" alt="${member.name} Logo" loading="lazy" width="80" height="60">
      <h3>${member.name}</h3>
      <p class="tagline">${member.tagline}</p>
      <p>${member.phone}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
      <span class="membership-badge level-${member.membershipLevel}">${levelText}</span>
    `;
        spotlightContainer.appendChild(card);
    });
}

apiFetch();
getSpotlights();

