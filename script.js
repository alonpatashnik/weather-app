var cityInput = document.getElementById('userCity');
var search = document.getElementById('searchBtn');


function renderWeather() {
    var city = cityInput.value;
    displayWeather(city);
}

function displayWeather(cityName) {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+cityName+'&appid=328a2ebf7df119aa25eb22c91cf23a26')
        .then(respone => Response.json())
        .then(data => console.log(data))
    .catch(err => alert('Worng city name!'))
}

search.addEventListener('click', renderWeather())