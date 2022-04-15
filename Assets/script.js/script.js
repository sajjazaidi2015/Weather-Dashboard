let $searchButton = $("#searchBtn");
let $cityName = $("#enterCity");
let $searchHistory = $("#searchHistory");
let $cityDetail = $("#cityDetail");
let $fiveDay = $("#fiveDay");
let $weatherContent = $("#weatherContent")
let currentDate = moment().format("l");
const cities = [];

$weatherContent.hide();
$searchButton.on("click", function () {
  $weatherContent.fadeOut();
  $searchHistory.html('')
  let cityName = $cityName.val();
  cities.push(cityName);
  const citiesLi = cities
    .filter((value, index) => cities.indexOf(value) === index)
    .map(function (city) {
      let $li = $("<li>");
      $li.text(city);
      return $li;
    });
  $searchHistory.append(citiesLi);
  $cityName.val('')
  let requestUrl =
    "https://app-weather-update.herokuapp.com/getLocations?location=" +
    cityName;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let lat = data[0].coord["lat"];
      let lon = data[0].coord["lon"];
      console.log(lat);
      console.log(lon);

      let url =
        "https://app-weather-update.herokuapp.com/details?lat=" +
        lat +
        "&lon=" +
        lon +
        "&unit=";
      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data)
          $cityDetail.html("");
          let $h2 = $("<h2>");
          $h2.text(cityName);
          $cityDetail.append($h2);
          let $h3 = $("<h2>");
          $h3.text(currentDate);
          $cityDetail.append($h3);
          let pEl = $("<p>");
          pEl.text(
            "Temp: " + data.current.temp + String.fromCharCode(176) + "F"
          );
          $cityDetail.append(pEl);
          let pE2 = $("<p>");
          pE2.text("Wind: " + data.current.wind_speed + " MPH");
          $cityDetail.append(pE2);
          let pE3 = $("<p>");
          pE3.text("Humidity: " + data.current.humidity + " %");
          $cityDetail.append(pE3);
          let uvClass = '';
          let uiIndex = data.current.uvi;
          if (uiIndex <=2){
            uvClass = 'low'
          }
          if (uiIndex >=3 && uiIndex <=5){
            uvClass = 'moderate'
          }
           
          if (uiIndex >=6){
            uvClass = 'high'
          }
          let pE4 = $("<p>");
          let label = $('<label>')
          let span = $('<span>', { class: 'uvClass ' + uvClass })
          label.text("UVI Index: ")
          span.text(uiIndex);
          pE4.append(label);
          pE4.append(span)
          $cityDetail.append(pE4);
          var dataLength = 6;
          $fiveDay.html("");
          for (i = 1; i < dataLength; i++) {
            console.log(data.daily[i]);
            const $divDay = $("<div>", { class: "card" });
            let h1El = $("<h2>");
            const date = moment
              .unix(data.daily[i].dt)
              .tz(data.timezone)
              .format("MM/DD/YYYY");
            h1El.text(date);
            $divDay.append(h1El);
            $fiveDay.append($divDay);
            let weatherPic = data.daily[i].weather[0].icon
            let currentPicEl = $("<img>");
            var weatherIcon = "http://openweathermap.org/img/wn/"+weatherPic+"@2x.png";
            currentPicEl.attr('src', weatherIcon)
            $divDay.append(currentPicEl);
            $fiveDay.append($divDay);
            let pEl = $("<p>");
            pEl.text(
              "Temp: " + data.daily[i].temp.day + String.fromCharCode(176) + "F"
            );
            console.log(pEl);
            $divDay.append(pEl);
            $fiveDay.append($divDay);
            let pE2 = $("<p>");
            pE2.text("Wind: " + data.daily[i].wind_speed + " MPH");
            $divDay.append(pE2);
            $fiveDay.append($divDay);
            let pE3 = $("<p>");
            pE3.text("Humidity: " + data.daily[i].humidity + " %");
            $divDay.append(pE3);
            $fiveDay.append($divDay);
            $weatherContent.fadeIn();
          }
        });
    });
});
