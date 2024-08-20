var searchInput = document.getElementById("search");
var rowData = document.getElementById("rowData");
var navRight = document.querySelector(".nav-right");

async function search(a) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=8fa1f45b5b5e48f9ad295002241906&q=${a}&days=3`
  );
  let weather = await response.json();
  displayWeather(weather);
}

function displayWeather(weather) {
  const location = weather.location;
  const forecast = weather.forecast.forecastday;

  let cartoona = "";

  forecast.forEach((day, index) => {
    let dayName = new Date(day.date).toLocaleDateString("en-US", {
      weekday: "long",
    });
    cartoona += `
      <div class="col-md-4 py-4 mt-4">
        <div class="card border-dark border-opacity-75 d-flex flex-column">
          <div class="card-top w-100  border-bottom border-black align-items-center d-flex justify-content-between py-2 px-3">
            <p>${dayName}</p>
            ${index === 0 ? `<p>${day.date}</p>` : ""}
          </div>
          <div class="card-body pb-3">
            ${index === 0 ? `<p class="fs-5 mb-2">${location.name}</p>` : ""}
            <h1 class="text-white m-3">${day.day.maxtemp_c}°C</h1>
            <h3 class="text-white m-3">${day.day.mintemp_c}°C</h3>
            <i class="fa-solid fa-${getWeatherIcon(
              day.day.condition.text
            )} fs-3 m-3"></i>
            <p class="fs-6 text-primary mb-4">${day.day.condition.text}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center mb-2">
                <i class="fa-solid fa-umbrella-beach translate-middle-y fs-6"></i>
                <p class="ms-2 fs-6">${day.day.daily_chance_of_rain}%</p>
              </div>
              <div class="d-flex align-items-center justify-content-center">
                <i class="fa-solid fa-wind translate-middle-y"></i>
                <p class="ms-2 fs-6">${day.day.maxwind_kph} km/h</p>
              </div>
              <div class="d-flex align-items-center">
                <i class="fa-regular fa-compass translate-middle-y"></i>
                <p class="ms-2">${day.day.maxwind_dir}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  rowData.innerHTML = cartoona;
}

function getWeatherIcon(condition) {
  switch (condition.toLowerCase()) {
    case "sunny":
      return "sun";
    case "partly cloudy":
      return "cloud-sun";
    case "cloudy":
      return "cloud";
    case "rain":
      return "cloud-rain";
    default:
      return "cloud";
  }
}

searchInput.addEventListener("keyup", function () {
  search(searchInput.value);
});

search("Cairo");
