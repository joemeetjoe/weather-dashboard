// adding the search button as a global variable to listen to later
var searchButton = document.getElementById("search-button");
let searchCriteria = document.getElementById("search-criteria");







// function passing in the searchcritera.value from the function init
function getLongAndLat(a){
  // constructing the api call and plugging in the city 
    var LatLonApiCall = "http://api.openweathermap.org/geo/1.0/direct?q=" + a + "&limit=1&appid=45243bff2680411dc8b71cd9714f866f";
    // fetch call plugging in the api call and parsing it. 
    fetch(LatLonApiCall)
    .then(function (response) {
      return response.json();
    })
    // getting the lat and long and plugging it into the get 5 day weather function
    .then(function (data) {
      var latitude = (data[0].lat);
      var longitude = (data[0].lon);
      getWeather5Day(latitude, longitude);
    })
};

// 5 day weather function plugging in the lat and long from function getLatandLong
function getWeather5Day(a, b){
  // constructing the api call and plugging in the a and b, also calling for the imperial system
  var weather5DayApiCall = "http://api.openweathermap.org/data/2.5/forecast?lat=" + a + "&lon=" + b + "&appid=45243bff2680411dc8b71cd9714f866f&units=imperial"
  // fetch call plugging in the api call and parsing it
  fetch(weather5DayApiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // getting the date and time, first we set the loop equal to the array inside the object
      var weather5DayArray = data.list;
      var weather5DayDates = [];
      var weather5DayTemps = [];
      var weather5DayWinds = [];
      var weather5DayHumids = [];
      
      // for each object in the array, loop through (skipping 8 spots each time to equal 5 day forecast)
      for (var i = 0; i < weather5DayArray.length; i += 8){
        // grab the date out of the list, convert it from unix code to normal days, then the MM/DD/yyyy format
        // and then save it to an empty array called weather 5daydates
        var current5Day = data.list[i].dt;
        current5Day = dayjs(current5Day * 1000).$d;
        current5Day = dayjs(current5Day).format('MM/DD/YYYY');
        weather5DayDates.push(current5Day);
        // grab the temperature out of the list, add degrees farenheight to it and save it to an empty array
        var temps = data.list[i].main.temp;
        temps = temps + "°F"
        weather5DayTemps.push(temps);
        console.log(weather5DayTemps);
        // grab the wind mph out of the list, add 'mph' to it, and add it to the empty array
        var winds = data.list[i].wind.speed;
        winds = winds + " MPH";
        weather5DayWinds.push(winds);
        // grab the humidity out of the list, add '%' to it, and add it to the empty array
        var humidity = data.list[i].main.humidity;
        humidity = humidity + "%";
        weather5DayHumids.push(humidity);
      }
    // get all of the cards that belong to the five day card class name, to loop through
     let fiveDayCardClass = document.getElementsByClassName("five-day-card");
    //  fiveDayCardClass.style.display = "block";
     for (var i=0; i<fiveDayCardClass.length; i++){
      fiveDayCardClass[i].textContent = weather5DayDates[i];
      weather5DayTemps = document.createTextNode(weather5DayTemps[i]);
      console.log(weather5DayTemps);
      fiveDayCardClass[i].append(weather5DayTemps);
      // fiveDayCardClass[i].textContent = weather5DayTemps[i];
      // fiveDayCardClass[i].textContent = weather5DayWinds[i];
      // fiveDayCardClass[i].textContent = weather5DayHumids[i];
      }
      
    })
}

function init(event){
    getLongAndLat(searchCriteria.value);
    // getWeather();
    // addWeatherButton();
    // clickSavedWeatherButton();
}
searchButton.addEventListener("click", init);
// document.getElementById("one-day-five-day-container").style.display = "none";

// add a clickSavedWeatherButton();