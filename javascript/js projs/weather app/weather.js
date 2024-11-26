const apikey="bc55f5d26e5013c1e9e426a733e0a049";
const apiurl="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon= document.querySelector(".weather-icon")

async function checkWeather(city){
const response = await fetch(apiurl+city+`&appid=${apikey}`);

if(response.status === 404){
    document.querySelector(".error").style.display="block";
    document.querySelector(".weather").style.display="none";
}else{
var data = await response.json();



document.querySelector(".city").innerHTML= data.name;
document.querySelector(".temp").innerHTML= Math.round(data.main.temp)+"°C";
document.querySelector(".humidity").innerHTML= data.main.humidity+"%";
document.querySelector(".wind").innerHTML= data.wind.speed+"km/h";
if(data.weather[0].main == "Clouds"){
    weatherIcon.src="images/clouds.png";
}else if(data.weather[0].main == "Clear"){
        weatherIcon.src="images/clear.png";
} else if(data.weather[0].main == "Rain"){
    weatherIcon.src="images/rain.png";
}else if(data.weather[0].main == "Dizzle"){
    weatherIcon.src="images/dizzle.png";
}else if(data.weather[0].main == "Mist"){
    weatherIcon.src="images/mist.png";
}

document.querySelector(".weather").style.display = "block";
document.querySelector(".error").style.display="none";
} 
} 

searchbtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
});

