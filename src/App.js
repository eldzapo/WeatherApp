import React, { useState } from 'react';
import "./style.css";

const api = { 
  key: "e9bc313cb1fd7acbe282e8e381fbd5c6",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

const [query, setQuerry] = useState("");
const [weather, setweather] = useState("{}");
const search = evt =>  {
  if (evt.key == "Enter") {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {setweather(result)
    setQuerry("");
    
    });
  }
}



const dateBuilder = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`

}

  return (
    <main className="wrapper">
          
      <div className="inputwrapper">

          <h1 className="vremenoslav">Vremenko</h1>
          <h4 className="nagovor">Vnesi iskano mesto </h4>
            <div className="App">
                    <div className="searchBar">
                        <input 
                          type="text"
                          className="iskalnik"
                          placeholder="vnesi mesto"
                          onChange={e => setQuerry(e.target.value)}
                          value={query}
                          onKeyPress={search} />
                  </div>
            </div>
       </div>

    {(typeof weather.main != "undefined") ? (

      <div className="cardwrapper">
          <div className="weather"> 
            <h1 className="lokacija"> {weather.name}, {weather.sys.country}</h1>
            <h2 className="datum"> {dateBuilder(new Date())} </h2>

            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="vreme">{weather.weather[0].main}</div>
          </div>
      </div>


    ) : ('')}
    </main>
  );
}

export default App;
