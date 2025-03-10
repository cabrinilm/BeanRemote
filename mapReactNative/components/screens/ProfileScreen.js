// import React from "react";
// import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
// import styles from "./styles/ProfileScreenStyles";

// const ProfileScreen = ({ route }) => {
//   const username = route?.params?.username || "Guest";

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.profilePictureContainer}>
//           <Image
//             source={{ uri: "https://via.placeholder.com/100" }}
//             style={styles.profilePicture}
//           />
//         </View>

//         <View style={styles.userInfo}>
//           <Text style={styles.username}>{username}</Text>
//           <View style={styles.statsContainer}>
//             <View style={styles.stat}>
//               <Text style={styles.statNumber}>12</Text>
//               <Text style={styles.statLabel}>Posts</Text>
//             </View>
//             {/* <View style={styles.stat}>
//               <Text style={styles.statNumber}>245</Text>
//               <Text style={styles.statLabel}>Followers</Text>
//             </View>
//             <View style={styles.stat}>
//               <Text style={styles.statNumber}>180</Text>
//               <Text style={styles.statLabel}>Following</Text>
//             </View> */}
//           </View>
//         </View>
//       </View>

//       <View style={styles.bioContainer}>
//         <Text style={styles.bioText}>Coffe and Code. ☕</Text>
//       </View>

//       <TouchableOpacity style={styles.editButton}>
//         <Text style={styles.editButtonText}>Edit Profile</Text>
//       </TouchableOpacity>

//       <View style={styles.postsContainer}>
//         <View style={styles.postRow}>
//           <View style={styles.postPlaceholder} />
//           <View style={styles.postPlaceholder} />
//           <View style={styles.postPlaceholder} />
//         </View>
//         <View style={styles.postRow}>
//           <View style={styles.postPlaceholder} />
//           <View style={styles.postPlaceholder} />
//           <View style={styles.postPlaceholder} />
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default ProfileScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Button,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "./styles/ProfileScreenStyles";

const ProfileScreen = ({ route }) => {
  const username = route?.params?.username || "Guest";
  const [bioText, setBioText] = useState("Coffee and Code. ☕");
  const [modalVisible, setModalVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState(
    "https://via.placeholder.com/100"
  );
  const [posts, setPosts] = useState([]);

  const pickImage = async (setImage) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      selectionLimit: 1,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    addPost();
    setModalVisible(false);
  };

  const addPost = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      selectionLimit: 1,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setPosts((prevPosts) => [...prevPosts, result.assets[0].uri]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profilePictureContainer}>
          <Image
            source={{ uri: profilePicture }}
            style={styles.profilePicture}
          />
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.username}>{username}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{posts.length}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>{bioText}</Text>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.postsContainer}>
        <View style={styles.postsGrid}>
          {posts.map((post, index) => (
            <Image
              key={index}
              source={{ uri: post }}
              style={styles.postImage}
            />
          ))}
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalTitle}>Edit Profile</Text>

            <Text style={modalStyles.label}>Change Profile Picture:</Text>
            <Button
              title="Pick an Image"
              onPress={() => pickImage(setProfilePicture)}
            />

            <Text style={modalStyles.label}>Edit Bio:</Text>
            <TextInput
              style={modalStyles.input}
              value={bioText}
              onChangeText={(text) => setBioText(text)}
            />

            <Text style={modalStyles.label}>Add Post:</Text>
            <Button title="Pick an Image for Post" onPress={addPost} />

            <View style={modalStyles.buttonContainer}>
              <Button title="Save" onPress={handleSave} />
              <Button
                title="Cancel"
                color="red"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    marginTop: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 8,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
  },
  postImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 5,
  },
  postsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default ProfileScreen;
