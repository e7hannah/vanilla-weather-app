function displayTemperature(response){

let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let conditionElement = document.querySelector("#condition");
temperatureElement.innerHTML = Math.round(response.data.temperature.current);
cityElement.innerHTML = response.data.city;
conditionElement.innerHTML = response.data.condition.description;
}

apiKey="f519b0o301tbb4d7afd52c94213690f1";
units = "imperial";
apiUrl=`https://api.shecodes.io/weather/v1/current?query=Sydney&key=${apiKey}&units=${units}`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);