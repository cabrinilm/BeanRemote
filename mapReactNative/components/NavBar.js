import { View, TextInput, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Navbar = () => {
  return (
    <View style={styles.navbar}>
   
      <TouchableOpacity>
        <Ionicons name="menu" size={28} color="black" />
      </TouchableOpacity>

  
      <TextInput style={styles.searchBar} placeholder="Search..." />

    
      <View style={styles.avatar} />
    </View>
  );
};

const styles = {
  navbar: {
    position: "absolute",
    top: StatusBar.currentHeight + 30, 
    left: 0,
    right: 0,
    height: 80, 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    zIndex: 10, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: "#3498db",
  },
};

export default Navbar;
