import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import GetLocation from "./getLocation";
import GetForecastData from "./getForecastData";
import StoreData from "./storeData";
import GetData from "./getData";
import ShowFurureWeather from "./showFutureWeather";

export default function FutureWeather() {
  const [weather, setWeather] = useState({ city: {}, list: [] });
  const [location, setLocation] = useState({ coords: {} });

  useEffect(() => {
    console.log(weather);
  }, [weather]);

  useEffect(() => {
    GetLocation(setLocation);

    setWeather(
      GetForecastData(
        location.coords.latitude,
        location.coords.longitude,
        setWeather
      )
    );

    StoreData(weather);
  }, []);

  const NomVille = () => {
    return (
      <View style={{ flex: 1, marginTop: 50 }}>
        <Text>Nom de la ville : {weather.city.name}</Text>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={setWeather(
            GetForecastData(location.coords.latitude, location.coords.longitude)
          )}
          style={{
            padding: 10,
            backgroundColor: "blue",
            borderRadius: 20,
            margin: 10,
          }}
        >
          <Text style={{ color: "white" }}>Rafraichir</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={GetData()}
          style={{ padding: 10, backgroundColor: "blue", borderRadius: 20 }}
        >
          <Text style={{ color: "white" }}>
            Rechercher depuis stockage local
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        {NomVille()}
      </View>
      <ScrollView horizontal={true}>{ShowFurureWeather()}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
