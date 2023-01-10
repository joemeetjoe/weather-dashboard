// adding the search button as a global variable to listen to later
var searchButton = document.getElementById("search-button");
var searchCriteria = document.getElementById("search-criteria");
console.log(searchButton);


function getLongAndLat(searchCriteria){
    var apiCall = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchCriteria + "&limit=1&appid=45243bff2680411dc8b71cd9714f866f";
    console.log(apiCall);
};

function init(){
    getLongAndLat("hello");
    // getWeather();
    // addWeatherButton();
    // clickSavedWeatherButton();
}
searchButton.addEventListener("click", init);

// add a clickSavedWeatherButton();