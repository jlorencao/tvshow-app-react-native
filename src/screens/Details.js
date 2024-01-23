import React, { useEffect } from "react";
import { Image, SafeAreaView, Text, StyleSheet, View, ScrollView } from "react-native";

const Details = ({ navigation, route }) => {
  const { image, name, object, type } = route.params;

  if (type == "cast") {
    const characterData = object.character;
    const actorData = object.person;

    return (
      <SafeAreaView style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.title}>{name}</Text>
        <View>
          <Text style={styles.bodyText}>
            <Text style={{ fontWeight: "bold" }}>Gender: </Text>
            {actorData.gender}
          </Text>
          <Text style={styles.bodyText}>
            <Text style={{ fontWeight: "bold" }}>Birthday: </Text>
            {actorData.birthday}
          </Text>
        </View>
        <Text style={styles.title}>"{characterData.name}"</Text>
        <Image
          source={{ uri: characterData.image.original }}
          style={styles.image}
        />
      </SafeAreaView>
    );
  }

  if (type == "season") {

  const seasonData = object
  const summaryOriginal = seasonData.summary
    ? seasonData.summary
    : "000 We don't have a summary for Season " + seasonData.number + " yet. Hang in there, or go ahead and contribute one.0000";
  const summaryEdited = summaryOriginal.substring(3,summaryOriginal.length - 4);

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.title}>Season {name}</Text>
          <Text style={{ textAlign: "center" }}>
            <Text style={{ fontWeight: "bold" }}>Started: </Text>
            {seasonData.premiereDate} -
            <Text style={{ fontWeight: "bold" }}> Ended: </Text>
            {seasonData.endDate}
          </Text>
          <View style={styles.summary}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Episodes: </Text>
              {seasonData.episodeOrder}
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Summary: </Text>
              {summaryEdited}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  if(type == "episode") {

    const episodeData = object
    const summaryOriginal = episodeData.summary
      ? episodeData.summary
      : "000 We don't have a summary for this episode yet. Hang in there, or go ahead and contribute one.0000";
    const summaryEdited = summaryOriginal.substring(
      3,
      summaryOriginal.length - 4
    );

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.title}>
            {episodeData.season} x {episodeData.number} - {name}
          </Text>
          <Text style={{ textAlign: "center" }}>
            <Text style={{ fontWeight: "bold" }}>Air date: </Text>
            {episodeData.airdate}
          </Text>
          <View style={styles.summary}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Rating: </Text>
              {episodeData.rating.average}
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Summary: </Text>
              {summaryEdited}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignSelf: "center",
    flexDirection: "row",
  },
  title: {alignSelf:"center",
    fontSize: 26,
    textAlign: "center",
    color: "black",
    marginTop: 10,
    marginBottom: 0,
    maxWidth:300,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 22,
    textAlign: "center",
    color: "black",
  },
  image: {
    marginTop: 12,
    alignSelf: "center",
    width: 280,
    height: 280,
  },
  bodyText: {
    textAlign: "center",
    fontSize: 16,
    alignSelf: "center",
  },
  summary: {
    color: "black",
    margin: 20,
    textAlign: "center",
    backgroundColor: "#ADD8E6",
    fontFamily: "Roboto",
    padding: 20,
    borderRadius: 20,
  },
});


export default Details;