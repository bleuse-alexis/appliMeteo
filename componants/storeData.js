import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function StoreData(weather) {
  await AsyncStorage.setItem("@weather", JSON.stringify(weather), (err) => {
    if (err) {
      console.log("error occured");
      throw err;
    }
    console.log("success");
  }).catch((err) => {
    console.log(err);
  });
}
