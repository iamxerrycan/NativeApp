import React, { useState, useEffect } from "react";
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
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function Wether() {
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const getTime = Math.floor(new Date().getTime() /1000)
  // const isDay = getTime >= weatherData.sys.sunrise && currentTime <= weatherData.sys.sunset;
  // const weatherIcon = isDay
  // ? require('../assets/images/sun.png')
  // : require('../assets/images/monn.png');  // Fix typo in 'moon'
  const weatherIcon = require("../assets/images/monn.png")

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
    setError(null);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Minimalist Weather</Text>
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

      {weatherData ? (
        <View style={styles.weatherContainer}>
          <View style={styles.imgtop}><Image
            source={weatherIcon}
            style={styles.weatherIcon}
          /></View>
          <View style={styles.containerweather}>
            <View style={styles.row}>
              <View style={styles.box}>
                <Text style={styles.value}>City: {weatherData.name}</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.value}>
                  Temperature: {weatherData.main.temp}°C
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.value}>
                  Mood: {weatherData.weather[0].description}
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.box}>
                <Text style={styles.value}>
                  Humidity: {weatherData.main.humidity}%
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.value}>
                  Wind Speed: {weatherData.wind.speed} m/s
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.value}>
                  Pressure: {weatherData.main.pressure} hPa
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <Text
          style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginTop: "80%",
          }}
        >
          Search For Location
        </Text>
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
    display: "flex",
    flexDirection: "column",
  },
  containerweather:{
    marginTop:20,
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
    gap: 15,
    padding: 20,
    // justifyContent:"center",
    // alignContent:"center",
    // alignItems: "center",
  },

  tempText: {
    fontSize: 48,
    fontWeight: "bold",
    marginVertical: 10,
  },
  value: {
    fontSize: 20,
    color: "#f5f5f5",
    fontStyle: "italic",
    fontWeight: "600", 
    letterSpacing: 0.5,
    padding:5,
    fontFamily: "sans-serif",
    lineHeight: 20,
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
    width: 40,
    backgroundColor: "white",
    height: 40,
  },
  // centy: {
  //   marginTop: 20,
  //   display: "flex",
  //   flexDirection: "row",
  // },
  header: {
    justifyContent: "center",
    verticalAlign: "middle",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: "35%",
    width: "100%",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 10,
    width:"100%"
  },
  box: {
    backgroundColor: "black",
    // padding: 15,
    flex: 1,
    width: 150,
    height: 100,
    margin: 3,
    borderRadius: 10,
  },
  imgtop:{
    justifyContent:"center",
    alignItems:"center",
  }
});
