import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  backgroundColor,
  Alert,
} from "react-native";

export default function ActualWeather() {
  const [temp, setTemp] = useState(Number);
  const [icon, setIcon] = useState("");
  const [desc, setDesc] = useState("");
  const [wind, setWind] = useState(Number);
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("");

  const [location, setLocation] = useState(null);

  const [geoTemp, setGeoTemp] = useState(Number);
  const [geoIcon, setGeoIcon] = useState("");
  const [geoDesc, setGeoDesc] = useState("");
  const [geoWind, setGeoWind] = useState(Number);
  const [geoCityName, setGeoCityName] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission not granted");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2982661ace62ec16bfa0ef3a7ef16e67&units=metric&lang=fr`
      )
        .then((result) => result.json())
        .then((json) => {
          setGeoTemp(json.main.temp);
          setGeoIcon(json.weather[0].icon);
          setGeoDesc(json.weather[0].description);
          setGeoWind(json.wind.speed);
          setGeoCityName(json.name);
        })
        .catch((error) => console.error(error));
    })();
  }, []);

  const requestData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2982661ace62ec16bfa0ef3a7ef16e67&units=metric&lang=fr`
    )
      .then((result) => result.json())
      .then((json) => {
        setTemp(json.main.temp);
        setIcon(json.weather[0].icon);
        setDesc(json.weather[0].description);
        setWind(json.wind.speed);
        setCityName(json.name);
      })
      .catch((error) => console.error(error));

    setCity("");
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 10 }}>
          <Text>Nom de la Ville géolocalisé: {geoCityName}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Temps actuel : </Text>
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: `http://openweathermap.org/img/w/${geoIcon}.png` }}
          />
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>description de la météo : {geoDesc}</Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Text>Temperature : {geoTemp} °C</Text>
        <Text>vitesse du vent : {geoWind} m/s</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text>Recherchez une ville : </Text>
        <TextInput
          style={{ margin: 10, borderWidth: 1 }}
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity
          onPress={requestData}
          style={{ padding: 10, backgroundColor: "blue", borderRadius: 20 }}
        >
          <Text>Rechercher</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 10 }}>
          <Text>Nom de la Ville : {cityName}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Temps actuel : </Text>
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: `http://openweathermap.org/img/w/${icon}.png` }}
          />
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>description de la météo : {desc}</Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Text>Temperature : {temp} °C</Text>
        <Text>vitesse du vent : {wind} m/s</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 70,
  },
});
