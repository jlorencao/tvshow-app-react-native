import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getEpisodes } from "../api/api";

const Episodes = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true); // Tracking loading state

  useEffect(() => {
   const fetchData = async () => {
     try {
       const response = await getEpisodes();
       setList(response);

     } catch (error) {
       console.error("Error fetching data:", error);

     } finally {
       setLoading(false);
     }
   };

   fetchData();
 }, []);


  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Details", { image: item.image.original, name: item.name, object: item, type: "episode" })
        }
      >
        <View style={styles.renderItem}>
          <Image source={{ uri: item.image.original }} style={styles.image} />
          <Text style={styles.episodeTitle}> 
            {item.season} x {item.number} - {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading || !list) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <FlatList data={list} renderItem={renderItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  renderItem: {
    flexDirection: "row",
    height: 90,
    alignItems: "center",
    marginTop: 10,
    marginStart: 20,
    marginEnd: 20,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: "#c2e3ed",
  },
  episodeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    maxWidth: 270,
  },
  image: {
    marginStart:5,
    borderRadius: 5,
    padding: 10,
    height: 80,
    width: 80,
  },
});

export default Episodes;
