import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function GetData() {
  const storedData = await AsyncStorage.getItem("@weather");
  if (storedData !== null) {
    console.log("data récupéré");
    return JSON.parse(storedData);
  }
}
