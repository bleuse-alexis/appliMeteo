import { Text, View, Image } from "react-native";

export default function ShowFutureWeather(weather) {
  return weather.list.map((props) => {
    return (
      <View
        style={{
          flex: 1,
          margin: 10,
          paddingBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
          backgroundColor: "#b0b0b0",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>{props.dt_txt}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: 80, height: 50 }}
            source={{
              uri: `http://openweathermap.org/img/w/${props.weather[0].icon}.png`,
            }}
          />
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>{props.weather[0].description}</Text>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text> min : {props.main.temp_min} °C </Text>
          <Text> max : {props.main.temp_max} °C</Text>
          <Text>vent : {props.wind.speed} m/s</Text>
        </View>
      </View>
    );
  });
}
