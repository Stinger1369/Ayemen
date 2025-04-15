import React, {useState, useEffect} from "react";
import axios from "axios";
import "./Meteo.css";

const Meteo = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY; // Récupère la clé depuis .env
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            lat: latitude,
            lon: longitude,
            appid: apiKey,
            units: "metric" // Température en Celsius
          }
        });

        setWeather({
          temp: Math.round(response.data.main.temp),
          icon: response.data.weather[0].icon
        });
        setCity(response.data.name);
        setLoading(false);
      } catch (err) {
        setError("Impossible de récupérer la météo.");
        setLoading(false);
      }
    };

    // Récupérer la géolocalisation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const {latitude, longitude} = position.coords;
        fetchWeather(latitude, longitude);
      }, (err) => {
        setError("Géolocalisation refusée ou indisponible.");
        setLoading(false);
      });
    } else {
      setError("La géolocalisation n’est pas supportée par ce navigateur.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="weather-info">Chargement...</div>;
  }

  if (error) {
    return <div className="weather-info">{error}</div>;
  }

  return (<div className="weather-info">
    <img src={`http://openweathermap.org/img/wn/${weather.icon}.png`} alt="Icône météo"/>
    <span>{`${weather.temp}°C, ${city}`}</span>
  </div>);
};

export default Meteo;
