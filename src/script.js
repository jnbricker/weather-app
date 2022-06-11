//date
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let date = new Date();

let chosenDate = document.querySelector("#chosen-date");

let currentYear = date.getFullYear();
let currentDay = days[date.getDay()];
let currentMonth = months[date.getMonth()];
let currentDate = date.getDate();

chosenDate.innerHTML = `${currentDay} ${currentMonth} ${currentDate} ${currentYear}`;

//show weather
function showTemperature(response) {
  let cityTemp = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let cityWeather = response.data.weather[0].main;
  let cityHumidity = response.data.main.humidity;
  let cityWind = Math.round(response.data.wind.speed);

  let temperatureElement = document.querySelector("#chosen-temp");
  temperatureElement.innerHTML = `${cityTemp}°C`;

  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = `${cityName}`;

  let weatherElement = document.querySelector("#chosen-forecast");
  weatherElement.innerHTML = `${cityWeather}`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${cityHumidity}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${cityWind} mph`;

  let recommendation = document.querySelector("h3");

  if (cityTemp < 1) {
    recommendation.innerHTML = `Bundle up! 🥶`;
  } else {
    recommendation.innerHTML = `Go on a walk! 🌳`;
  }
}

//pull city API
function searchCity(city) {
  let key = "c13a83c7b09085801a5bf5fc42818fa0";
  let searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(searchUrl).then(showTemperature);
}

//get searched city
function getCityName(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  searchCity(city);
}

//search current city
function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//get current city weather
function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = "c13a83c7b09085801a5bf5fc42818fa0";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let url = `${apiUrl}lat=${lat}&lon=${lon}&units=metric&appid=${key}`;

  axios.get(url).then(showTemperature);
}

let findCity = document.querySelector("#search-city");
findCity.addEventListener("click", getCityName);

let currentCity = document.querySelector("#current-city-button");
currentCity.addEventListener("click", getCurrentCity);

searchCity("Rome");