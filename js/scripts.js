require("dotenv").config();

// Variables and element selection:
const apiKey = process.env.API_KEY;
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const temperatureElement = document.querySelector("#temperature span");
const descriptionElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");
const errorMessageContainer = document.querySelector("#error-message");
const loaderIcon = document.querySelector("#loader");
const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

// Functions:
// Changes the "hide" class of the loader icon while waiting for the API response.
const toggleLoader = () => {
  loaderIcon.classList.toggle("hide");
};

// Function with the objective of obtaining the meteorological data of the specified city.
const getWeatherData = async (cityName) => {
  clearCityInput();
  toggleLoader();
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}&lang=en`;
  const apiResponse = await fetch(apiWeatherURL);
  const apiData = await apiResponse.json();

  toggleLoader();
  return apiData;
};

// Receives the weather data of the specified city and displays city information.
const showWeatherData = async (cityName) => {
  hideInformation();
  const cityData = await getWeatherData(cityName);

  if (cityData.cod === "404") {
    showErrorMessage();
    return;
  }

  cityElement.textContent = cityData.name;
  temperatureElement.textContent = parseInt(cityData.main.temp);
  descriptionElement.textContent = cityData.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${cityData.weather[0].icon}.png`
  );
  countryElement.setAttribute(
    "src",
    `https://flagsapi.com/${cityData.sys.country}/flat/64.png`
  );
  humidityElement.innerText = `${cityData.main.humidity}%`;
  windElement.innerText = `${cityData.wind.speed}mph`;

  document.body.style.backgroundImage = `url("${apiUnsplash + cityName}") `;
  weatherContainer.classList.remove("hide");
};

const clearCityInput = () => {
  cityInput.value = "";
};

// Error handling:
// Function with the objective of removing the "hide" class from the error container, as soon as an error occurs.
const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hide");
};

// Function with the objective of always hiding elements after searching for a city.
const hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");

  suggestionContainer.classList.add("hide");
};

// Events
// Adding "click" event on the search button to run the "showWeatherData" function whenever the button is clicked!
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const cityName = cityInput.value;
  showWeatherData(cityName);
});

// Adding "keyup" event on city entry to run "showWeatherData" function whenever "Enter" key is pressed.
cityInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const cityName = event.target.value;
    showWeatherData(cityName);
  }
});

// A menu of city suggestions that, as soon as it is clicked, executes the "showWeatherData" function with the name of the chosen city.
suggestionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const cityName = btn.getAttribute("id");

    showWeatherData(cityName);
  });
});
