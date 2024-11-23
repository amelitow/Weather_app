import { useState, useEffect } from "react";


const App: React.FC = () => {
  const [weather, setWeather] = useState(null); // Pour stocker les données météo
  const [loading, setLoading] = useState(true); // Indique si les données sont en cours de chargement
  const [error, setError] = useState(null); // Pour capturer les erreurs

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=paris&aqi=no&lang=fr`
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données.");
        }
        const data = await response.json(); // Convertit la réponse en JSON
        setWeather(data); // Stocke les données dans l'état `weather`
      } catch (err) {
        setError(err.message); // Capture les erreurs
      } finally {
        setLoading(false); // Arrête l'indicateur de chargement
      }
    };
  
    fetchWeather();
  }, []); // Le tableau vide [] signifie que l'effet s'exécute une seule fois au chargement

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
    </div>
  );
  
  
};



export default App;
