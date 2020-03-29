// variable cityLocation is from users input
$("#search").on("click", function() {
    event.preventDefault();
    let cityLocation = $("#input-city").val();
    // 1. when i input city name 
    // 1.5 i click the button and i receive right column with:
    // name and Date, also includes
    // an icon for the weather
    // a temperature: 
    // the humidity:
    // wind speed:
    // and a uv index

    if (cityLocation !== "") {

        console.log(cityLocation);
        searchLocation(cityLocation);
        getForecast(cityLocation);

//         localStorage.setItem() {
            
//         }

    }else {
        $("#input-city").html("Please enter a city");
    }

});

const apiKey = "3d16044a2eba4d271046d70fd1f2c155";

function searchLocation(cityLocation) {
    let searchLocation = "https://api.openweathermap.org/data/2.5/weather?q=" + cityLocation + "&appid=" + apiKey;

    $.ajax({
        url: searchLocation,
        method: "GET"
    }).then(function(response) {
        let temperature = response.main.temp;
        // console.log({temperature})
        let humidity = response.main.humidity;
        // console.log({humidity})
        let windSpeed = response.wind.speed;
        // console.log({windSpeed})
        
        $("#city-name").text(cityLocation);
        $("#temp").text("Temperature: " + temperature);
        $("#humidity").text("Humidity: " + humidity);
        $("#wind-speed").text("Wind Speed: " + windSpeed);


        let timenow = moment()
        let unix = timenow.unix()


        let forecast = getUvIndex("forecast", response.coord.lat, response.coord.lon, 4)
        
        forecast.then(function(uvForecasts){
            // for loop my indices --> access value --> show on html
            // for ()
        })
        
        let history = getUvIndex("history", response.coord.lat, response.coord.lon, 4, unix, unix)
    
        history.then(function(uvHistories){
            $("#uv-result").text("UV Index: " + uvHistories[0].value)
        })
    })
};

function getUvIndex(mode="forecast", lat, long, daysReturned, start, end) {
    let uvApi = `http://api.openweathermap.org/data/2.5/uvi/${mode}?appid=${apiKey}&lat=${lat}&lon=${long}&cnt=${daysReturned}` 
    
    if (mode === "history") {
        uvApi += `&start=${start}&end=${end}`
    }

    return $.ajax({
        url: uvApi,
        method: "GET"
    }).then (function(response) {
        // console.log({response})

        return response

    })
    
}

function getForecast (cityLocation) {
    let fiveDayForecastApi = `http://api.openweathermap.org/data/2.5/forecast?q=${cityLocation}&appid=${apiKey}`
    // console.log(fiveDayForecastApi)

    $.ajax({
        url: fiveDayForecastApi,
        method: "GET"
    }).then (function(response) {
        // console.log({response})
        
        // filtering from 40 cnt to 5
        let filteredDays = response.list.filter(
            function (currentElement){
            return currentElement.dt_txt.includes("03:00:00")
            }	
        );
        for (let i = 0; i < filteredDays.length; i++ ) {
            // shows all 5 of my dates in card
            let fiveDayForeDate = filteredDays[i].dt_txt.split(" ")[0];
            
            let foreWeatherIcon = filteredDays[i].weather[0].icon;
            // console.log({foreWeatherIcon})
            let foreTemperature = response.list[0].main.temp;
            // console.log({foreTemperature})
            let foreHumidity = response.list[0].main.humidity;
            // console.log({foreHumidity})

            // Creating dom elements
            let section = $("<section>").attr("class","content").attr("class", "col-3");
            let dates = $("<div>").text(fiveDayForeDate);
            let childIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + foreWeatherIcon + "@2x.png");
            let temperatures = $("<div>").attr("class", "temp").text("Temp: " + foreTemperature);
            let humidities = $("<div>").attr("class", "humidity").text("Humidity: " + foreHumidity);

            // Render the dom elements
            let fiveForecast = $("section").append(dates, childIcon, temperatures, humidities);
            $(".forecast").append(fiveForecast)

        }


        
        
        // $("#temp").text("Temperature: " + temperature);
        // $("#humidity").text("Humidity: " + humidity);

    })
}

// 2 previous searched are saved to local storage with append on left column under search for city.



// 3. also shows me 5 days of forecast from next day includes:
// Date
// an icon for the weather
// a temperature: 
// the humidity:








// // let searchLocation = "api.openweathermap.org/data/2.5/weather?q=" + cityLocation + "&appid=" + apiKey,
// //     // five days a city ID location api
// // let fiveDays = "api.openweathermap.org/data/2.5/forecast?id=" + cityLocation + "&appid=" + apiKey,


// // Variables for ajax call for UV response
// let cityLat = response.coord.lat;
// let cityLong = response.coord.long;
// let uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + "your api key" + "&lat=" + cityLat + "&lon=" + cityLong + "&units=imperial";

//     $.ajax({
//         url: uvURL,
//         method: "GET"
//     }).then(function (response) {
        
//         // Create variable to get the UV and to create dom element on div.
//         let uv = response.value;
//         $("#uvIndex").empty(); // clear the element first
//         $("#uvIndex").append($("<div id=\"uvColor\">").text("Uv Index: " + uv)).attr("class", "nowrap");
//         // When checking the UV create a color that indicates whether the conditions are favorable, moderate, or severe
//         if(uv <= 3){
//             //change color to green
//             $("#uvColor").attr("style", "background-color:green ; width:65%");
//         }
//         else if( uv <= 7){
//             //change color to orange
//             $("#uvColor").attr("style", "background-color:orange ; width:65%");
//         }
//         else{
//             $("#uvColor").attr("style", "background-color:red ; width:65%");
//         };
