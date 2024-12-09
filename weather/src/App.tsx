import { useState, useEffect } from "react";
import { Button, Container, Text ,Spacer} from "kitchn";

type WeatherData = {
  current: {
    last_updated: string;
    temp_c: number;
    feelslike_c: number;
    precip_in: number;
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
    <Container>
      <Text size={"extraTitle"} weight={"bold"} accent={"primary"}>Météo à Paris</Text>
      <Spacer y={5} />
      {loading ? (
        <Text size={"medium"} accent={"light"}>Chargement des données...</Text>
        ) : error ? (
          <Text size={"medium"} accent={"dark"}>Erreur : {error}</Text>
        ) : (

      
      <Container>

        <Container row>
          <Text size={"medium"} accent={"light"}>Date et Heure : {weather?.current?.last_updated} </Text>
        </Container>
      
      <Spacer y={2} />
      <Container row gap={10}>

         <Container>
            <Text>Température : {weather?.current?.temp_c}°C</Text>
         </Container>

         <Spacer x={5} />

          <Container>
            <Text>Ressenti : {weather?.current?.feelslike_c}°C </Text>
          </Container>

          <Spacer x={5} />

        <Container gap={20}>

          <Container>
            <Text>Précipitation : {weather?.current?.precip_in} </Text>
          </Container>
          <Spacer y={2} />
          <Container>
            <Text>Vent : {weather?.current?.wind_kph} km/h</Text>
          </Container>
          <Spacer y={2} />
         <Container>
            <Text>Humidité : {weather?.current?.humidity} %</Text>
          </Container>

          <Spacer y={2} />

        </Container>
      </Container>
        
          
        <Container row>
          <Text>Description : {weather?.current?.condition?.text}</Text>
          <Spacer x={5} />
          <img src={`http:${weather?.current?.condition?.icon}`} alt="Icône météo" />
        </Container>
        
      </Container>
      )}

        <Button onClick={fetchWeather} variant="shadow" size="large" style={{ marginTop: "20px" }}>
        Rafraîchir
        </Button>

    </Container>

  );

};



export default App;
