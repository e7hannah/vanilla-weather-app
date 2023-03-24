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

function displayTemperature(response){

let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let conditionElement = document.querySelector("#condition");
let dateElement = document.querySelector("#date");
temperatureElement.innerHTML = Math.round(response.data.temperature.current);
cityElement.innerHTML = response.data.city;
conditionElement.innerHTML = response.data.condition.description;
dateElement.innerHTML = formatDate(response.data.time * 1000) ;
}

apiKey="f519b0o301tbb4d7afd52c94213690f1";
units = "imperial";
city = "Paris";
apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);