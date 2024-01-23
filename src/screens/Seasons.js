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
import { getEpisodes, getSeasons } from "../api/api";

const Seasons = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true); // Tracking loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSeasons();
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
          navigation.navigate("Details", {
            image: item.image.original,
            name: item.number,
            object: item,
            type: "season",
          })
        }
      >
        <View style={styles.renderItem}>
          <Image source={{ uri: item.image.original }} style={styles.image} />
          <Text style={styles.seasonTitle}>Season {item.number}</Text>
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
    alignContent: "center",
  },
  renderItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 20,
    marginStart: 20,
    marginEnd: 20,
    padding: 10,
    elevation: 5,
    backgroundColor: "#c2e3ed",
  },
  seasonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },
  image: {
    borderRadius: 5,
    padding: 5,
    height: 100,
    width: 100,
  },
});


export default Seasons;
