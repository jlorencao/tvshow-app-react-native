import React, { useEffect, useState } from "react";
import {getCast, getTVShow} from "../api/api";
import { Image, Text, StyleSheet, ScrollView, Button, View, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const Home = ({ navigation }) => {
  const [show, setShow] = useState(null); // Initializing show as null
  const [castList, setCastList] = useState(null); // Initializing castList as null
  const [loading, setLoading] = useState(true); // Tracking loading state
  

  useEffect(() => {
    const fetchData = async () => {
      try {
      const showResponse = await getTVShow();
       setShow(showResponse);

       const castResponse = await getCast();
       setCastList(castResponse);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const summaryOriginal = show && show.summary ? show.summary : "";
  const summaryEdited = summaryOriginal.substring(
    3,
    summaryOriginal.length - 4
  );

    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", {
              image: item.person.image.original,
              name: item.person.name,
              object: item,
              type: "cast",
            })
          }
        >
          <View style={{ alignContent: "center", margin: 5 }}>
            <Image
              source={{ uri: item.person.image.original }}
              style={styles.castImage}
            />
            <Text>{item.person.name}</Text>
          </View>
        </TouchableOpacity>
      );
    };




  if (loading || !show) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View>
          <Image source={{ uri: show.image.original }} style={styles.image} />
          <Text style={styles.title}>{show.name}</Text>
          <Text style={{ textAlign: "center" }}>
            {show.premiered} - {show.ended}
          </Text>
          <Text style={styles.summary}>{summaryEdited ?? ""}</Text>
          <Text style={styles.subtitle}>Review</Text>
          <View
            style={{
              alignContent: "flex-start",
              marginTop: 10,
              padding: 10,
              marginBottom: 10,
              marginEnd: 20,
              marginStart: 20,
            }}
          >
            <Text>
              <Text style={{ fontWeight: "bold" }}>Genres: </Text>
              {show.genres[0]}, {show.genres[1]}, {show.genres[2]}
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Rating: </Text>
              {show.rating.average}
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Seasons: </Text>
              15
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Episodes: </Text>
              327
            </Text>
          </View>

          {castList && castList.length > 0 && (
            <View style={{marginBottom:20}}>
              <Text style={styles.subtitle}>Cast</Text>
              <FlatList
                horizontal={true}
                data={castList}
                renderItem={renderItem}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    color: "black",
    margin: 10,
    fontWeight: "bold",
  },
  summary: {
    fontSize: 16,
    color: "black",
    margin: 20,
    textAlign: "center",
    backgroundColor: "#ADD8E6",
    fontFamily: "Roboto",
    padding: 20,
    borderRadius: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  bodyText: {
    alignContent: "flex-start",
    padding: 10,
  },
  image: {
    marginTop: 10,
    width: 300,
    height: 300,
    alignSelf: "center",
  },
  castImage: {
    marginTop: 10,
    width: 100,
    height: 100,
    alignSelf: "center",
  },
});

export default Home;
