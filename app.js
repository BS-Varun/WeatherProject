const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/index.html", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "16e375584554d875851370d9c8e97aa7";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(temp);
            console.log(weatherData);
            res.write("<html>")
            res.write("<h1>The weather is currently " + weatherDescription + ".</h1>");
            res.write("<h3>The temperature in " + query + " is " + temp + " degrees Celsius.</h3>");
            res.write("<img src=" + imageURL + ">");
            res.write("</html>")
            res.send();
        });
    });
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});

const apiKey = "16e375584554d875851370d9c8e97aa7"; // Replace with your actual API key
const apiUrl = " https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;