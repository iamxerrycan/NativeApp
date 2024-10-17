import React, { useState , useEffect} from "react";
import {
  TextInput,
  StyleSheet,
  Image,
  View,
  Button,
  Text,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function Wether() {
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    Keyboard.dismiss();
    setLoading(true);
    setError(null);
    try {
      const apiKey = "4cdd5dee4b21790322c9993b89fb25d1";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        setError(`Location not found: ${data.message}`);
        setTimeout(() => {
          setError(false);
        }, 2000);
      }
    } catch (err) {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
      setSearchQuery("");
    }
  };
  useEffect(() => {
    fetchWeatherData('Bodh gaya');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Enter city name"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={fetchWeatherData}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {weatherData && (
        <View style={styles.weatherContainer}>
             <Image
              source={require("../assets/images/sun.png")} 
                            style={styles.weatherIcon}
            />
          <Text style={styles.value}>City: {weatherData.name}</Text>
          <View style={styles.centy}>
           
            <Text style={styles.value}>
              {weatherData?.main?.temp !== undefined
                ? weatherData.main.temp
                : 0}
              °C
            </Text>
          </View>

          <Text style={styles.value}> <Image
              source={require("../assets/images/sun.png")} 
              style={styles.weatherIcon}
            />{weatherData.weather[0].description}</Text>

          <Text style={styles.value}> <Image
              source={require("../assets/images/sun.png")} 
              style={styles.weatherIcon}
            />
            Humidity: {weatherData.main.humidity}%
          </Text>
          <Text style={styles.value}> <Image
              source={require("../assets/images/sun.png")} 
              style={styles.weatherIcon}
            />
            Wind Speed: {weatherData.wind.speed} m/s
          </Text>
          <Text style={styles.value}> <Image
              source={require("../assets/images/sun.png")} 
              style={styles.weatherIcon}
            />
            Pressure: {weatherData.main.pressure} hPa
          </Text>
        </View>
      )}

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "auto",
    height: "100%",
    backgroundColor: "white",
    display:"flex",
    flexDirection:"column",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1, 
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  searchButton: {
    backgroundColor: "black",
    paddingVertical: 13,
    paddingHorizontal: 15,
    marginLeft: 10,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  weatherContainer: {
    marginTop: 100,
    gap:10,
    padding: 20,
    alignItems: "center",
  },

  tempText: {
    fontSize: 48,
    fontWeight: "bold",
    marginVertical: 10,
  },
  value: {
    fontSize: 25,
    fontStyle: "italic",
  },
  errorText: {
    color: "red",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    margin: 10,
    display: "flex",
  },
  weatherIcon: {
    width: 100,
    backgroundColor:"white" ,
    height: 100,
  },
  centy: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row", 
  },
});
