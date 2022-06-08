import * as Location from "expo-location";
import { Alert } from "react-native";

export default async function GetLocation(setLocation) {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission not granted");
    return;
  }

  let location = await Location.getCurrentPositionAsync({});

  setLocation(location);
}
