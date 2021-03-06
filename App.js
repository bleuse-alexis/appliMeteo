import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import GetLocation from "./componants/getLocation";
import StoreData from "./componants/storeData";
import GetData from "./componants/getData";
import ShowFutureWeather from "./componants/showFutureWeather";
import GetForecastData from "./componants/getForecastData";
import ShowCityName from "./componants/showCityName";

export default function App() {
  const [weather, setWeather] = useState({ city: {}, list: [] });
  const [location, setLocation] = useState({ coords: {} });

  useEffect(() => {
    console.log(weather);
  }, [weather]);

  useEffect(() => {
    GetLocation(setLocation);
  }, []);

  useEffect(() => {
    GetForecastData(
      location.coords.latitude,
      location.coords.longitude,
      setWeather
    );
  }, [location]);

  useEffect(() => {
    StoreData(weather);
  }, [weather]);

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => GetLocation(setLocation)}
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
          onPress={() => GetData()}
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
        {ShowCityName(weather)}
      </View>
      <ScrollView horizontal={true}>{ShowFutureWeather(weather)}</ScrollView>
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
