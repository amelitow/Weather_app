import { useState, useEffect } from "react";
import { Button, Container, Text ,Spacer, Image, Scroller} from "kitchn";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { TbTemperatureCelsius } from "react-icons/tb";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

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

      <Container 
    justify={"center"}
    align={"center"}
    br={"square"}
    bg={"rgb(23, 21, 40)"}
    
    >
      <Container
      justify={"center"}
      marginTop={50}
      >
        <Text size={"extraTitle"} weight={"bold"} accent={"primary"}>Météo à Paris</Text>
      </Container>
      
      <Spacer y={1} />
      {loading ? (
        <Text size={"medium"} accent={"light"}>Chargement des données...</Text>
        ) : error ? (
          <Text size={"medium"} accent={"dark"}>Erreur : {error}</Text>
        ) : (
    <Container>
    <Scroller width={"100%"} height={570}>
      <Container
      
      padding={"40px"}
      >

        <Container row
        
        bg={"rgb(251, 251, 251, 0.1)"}
        padding={"40px"}
        align={"center"}
        br={"20px"}>
          <Text 
          size={"large"} 
          accent={"light"}
          
          >Date et Heure </Text>
          <Spacer x={2} />
          <Text 
          size={"large"} 
          accent={"light"}
          
          >{weather?.current?.last_updated} </Text>
        <Spacer x={5} />
        <Button 
        onClick={fetchWeather}
        variant="shadow" 
        size="large" 
        >
        Rafraîchir
        </Button>
        </Container>
        <Container 
        row
         >
        
      </Container>
      
      <Spacer y={2} />
      <Container 
      row gap={10}
      height={"450px"}
      bg={"rgb(251, 251, 251, 0.1)"}
      padding={"40px"}
      br={"20px"}
      >

         <Container
         bg={"rgb(251, 251, 251, 0.1)"}
         padding={"40px"}
         br={"20px"}
         align={"center"}

         >
            <Text
            size={"large"}
            
            >Température </Text>
            <Spacer y={4}/>
            <TbTemperatureCelsius
            size={60}/>
            <Spacer y={3}/>
            <Text
            size={"extraTitle"}
            accent={"info"}
            > {weather?.current?.temp_c}°C</Text>
         </Container>

         <Spacer x={1} />

          <Container
          bg={"rgb(251, 251, 251, 0.1)"}
          padding={"40px"}
          br={"20px"}
          align={"center"}>
            <Text
            size={"large"}>Ressenti  </Text>
            <Spacer y={4}/>
            <TiWeatherWindyCloudy 
            size={60}/>
            <Spacer y={3}/>
            <Text
            size={"extraTitle"}
            accent={"info"}> {weather?.current?.feelslike_c}°C </Text>
          </Container>

          <Spacer x={1} />

        <Container gap={20}
        height={"450px"}>

          <Container
          bg={"rgb(251, 251, 251, 0.1)"}
          padding={"20px"}
          br={"20px"}
          align={"center"}>
            <Text>Précipitation </Text>
            <Spacer y={1.5}/>
            <Text
            size={"large"}
            accent={"info"}> {weather?.current?.precip_in} </Text>
          </Container>
          
          <Container
          bg={"rgb(251, 251, 251, 0.1)"}
          padding={"20px"}
          br={"20px"}
          align={"center"}>
            <Container
            row
            >
            <FaWind 
            size={20}/>
            <Spacer x={1}/>
              <Text>Vent </Text>
            </Container>
            
            <Spacer y={1.5}/>
            <Text
            size={"large"}
            accent={"info"}> {weather?.current?.wind_kph} km/h</Text>
          </Container>
          
         <Container
         bg={"rgb(251, 251, 251, 0.1)"}
         padding={"20px"}
         br={"20px"}
         align={"center"}>
          <Container
          row>
            <WiHumidity 
            size={20}
            />
            <Spacer x={0.5}/>
            <Text>Humidité </Text>
          </Container>
            
            <Spacer y={1}/>
            <Text
            size={"large"}
            accent={"info"}> {weather?.current?.humidity} %</Text>
          </Container>

          

        </Container>
      </Container>
        
          
        <Container row
        bg={"rgb(251, 251, 251, 0.1)"}
        margin={"25px"}
        padding={"40px"}
        br={"20px"}
        justify={"center"}>
          <Container
          align={"center"}>
            <Text
            size={"large"}>Description </Text>
            <Spacer y={1}/>
          <Text
          size={"extraTitle"}> {weather?.current?.condition?.text}</Text>
         
          </Container>
           <Spacer x={15} />
          <Image 
          src={`http:${weather?.current?.condition?.icon}`} 
          alt="Icône météo"
          width={"100px"}
          height={"auto"}
          />
        </Container>
        
      </Container>
      </Scroller>
      </Container>
      )}

      
        

    </Container>
    </Container>
    

  );

};



export default App;
