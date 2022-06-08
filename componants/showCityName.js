import { Text, View } from "react-native";

export default function ShowCityName(weather) {
  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <Text>Nom de la ville : {weather.city.name}</Text>
    </View>
  );
}
