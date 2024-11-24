import { useState, useEffect } from "react";
import { Button } from "kitchn";

type WeatherData = {
  current: {
    temp_c: number;
    feelslike_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    humidity: number;
  };
};

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

 
    const fetchWeather = async () => {
      setLoading(true); 
      setError(null);
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=paris&aqi=no&lang=fr`
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données.");
        }
        const data = await response.json();
        setWeather(data); 
      } catch (err: any) {
        setError(err.message); 
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
    fetchWeather();
  }, []); 

  return (
    <div>
      <h1>Météo à Paris</h1>
      {loading ? (
        <p>Chargement des données...</p>
      ) : error ? (
        <p>Erreur : {error}</p>
      ) : (
        <div>
          <p>Température : {weather?.current?.temp_c}°C</p>
          <p>Ressenti : {weather?.current?.feelslike_c}°C </p>
          <div>
            <p>Description : {weather?.current?.condition?.text}</p>
             <img src={`http:${weather?.current?.condition?.icon}`} alt="Icône météo" />
          </div>
          <p>Vent : {weather?.current?.wind_kph} km/h</p>
          <p>Humidité : {weather?.current?.humidity} %</p>
        </div>
      )}

    <Button onClick={fetchWeather} variant="shadow" size="large" style={{ marginTop: "20px" }}>
        Rafraîchir
      </Button>
    </div>

  );

};



export default App;
