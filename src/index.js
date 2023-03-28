function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10){
        hours = `0${hours}`
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes = `0${minutes}`
    }

    return(`${hours}:${minutes}`)

}

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ]; 

    return days[day];
}

function displayForecast(response){
    let forecast = response.data.daily;
    console.log(forecast);
    
    let forecastElement = document.querySelector("#weather-forecast");

    let forecastHTML = `<div class="row">`;
    let days = ["Thu", "Fri", "Sat","Sun","Mon","Tue"]
    forecast.forEach(function(forecastDay, index){
        if (index < 6){

            forecastHTML = forecastHTML +
                `<div class="col-2">
                    <div class="forecast-day">
                        ${formatDay(forecastDay.time)}
                    </div>
                    <img class="forecast-icon" id="forecast-icon" src="${forecastDay.condition.icon_url}" alt="" width="60px">
                    <div class="forecast-temp">
                        <span class="forecast-temp-high">${Math.round(forecastDay.temperature.maximum)}°</span>
                        <span class="forecast-temp-low">${Math.round(forecastDay.temperature.minimum)}°</span>
                    </div>
                </div>`;
        }
    })
   forecastHTML = forecastHTML + `</div>`;

   forecastElement.innerHTML= forecastHTML;
}

function getForecast(coordinates){
    let apiKey = "f519b0o301tbb4d7afd52c94213690f1";
    let units = "imperial";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){

let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let conditionElement = document.querySelector("#condition");
let dateElement = document.querySelector("#date");
let headerIconElement = document.querySelector("#header-icon");

farenheitTemp = response.data.temperature.current;

temperatureElement.innerHTML = Math.round(farenheitTemp);
cityElement.innerHTML = response.data.city;
conditionElement.innerHTML = response.data.condition.description;
dateElement.innerHTML = formatDate(response.data.time * 1000);
headerIconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
headerIconElement.setAttribute("alt", response.data.condition.icon);

getForecast(response.data.coordinates);

}

function search(city){
    apiKey="f519b0o301tbb4d7afd52c94213690f1";
    units = "imperial";
    apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayCelciusTemp(event){
    event.preventDefault();
    farenheitLink.classList.remove("active");
    celciusLink.classList.add("active");
    let celciusTemp = (farenheitTemp - 32) * (5/9);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celciusTemp);
}

function displayFarenheitTemp(event){
    event.preventDefault();
    farenheitLink.classList.add("active");
    celciusLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(farenheitTemp);
}

let farenheitTemp = null;

let form = document.querySelector("#search-form")
form.addEventListener("submit", handleSubmit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemp)

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemp)

search("Paris");
