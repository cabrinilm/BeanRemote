import { View } from "react-native";
import MapBox from "./components/MapBox";

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <MapBox />
    </View>
  );
}
