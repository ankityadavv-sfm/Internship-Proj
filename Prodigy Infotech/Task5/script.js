const apiKey = "Enter you API key after login on https://home.openweathermap.org/api_keys "; // <-- Replace with your OpenWeatherMap API key

function displayWeather(data) {
  document.getElementById(
    "locationName"
  ).textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("temperature").textContent = (
    data.main.temp - 273.15
  ).toFixed(1);
  document.getElementById("condition").textContent =
    data.weather[0].description;
  document.getElementById("humidity").textContent = data.main.humidity;
  document.getElementById("wind").textContent = data.wind.speed;
  document.getElementById("weatherBox").style.display = "block";
  document.getElementById("error").textContent = "";
}

function showError(message) {
  document.getElementById("weatherBox").style.display = "none";
  document.getElementById("error").textContent = message;
}

async function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    showError("Unable to fetch weather. Check city name.");
  }
}

function getWeatherByLocation() {
  if (!navigator.geolocation) {
    showError("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        displayWeather(data);
      } catch (err) {
        showError("Unable to fetch weather by location.");
      }
    },
    () => {
      showError("Permission denied or location unavailable.");
    }
  );
}
