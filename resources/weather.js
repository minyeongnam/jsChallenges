const weather = document.getElementById("weather");
const CORDS = 'Cords';
const API_KEY = "feaa4d729c78b7e13d07df0eceeb3066";

function getWeather(lat, lon) {
 fetch(
    `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
  ).then(function(respones){
    return respones.json()
  }).then(function(json){
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = temperature +'@'+place;
  });
}

function saveCoords(coordsObj) {
  localStorage.setItem(CORDS, JSON.stringify(coordsObj));
}

function success(position) {

  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude:latitude,
    longitude:longitude
  }
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
};

function error(err) {
  console.log(err.message);
};

function askForCoords() {
  navigator.geolocation.getCurrentPosition(success, error);
}

function loadCoords() {
  const loadCoords = localStorage.getItem(CORDS);
  if(loadCoords === null) {
    askForCoords();
  }else{
    const parseCoords = JSON.parse(loadCoords);
    console.log(parseCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}
function init() {
  loadCoords();
}
init();