
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

const WelcomePopup = ({ isVisible, onClose }) => {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.5}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
        >
          <Text>Welcome to the Supernatural App!</Text>
          <Text>Here you will find everything about our favorite show.</Text>
          <Text>Enjoy!</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={{ color: "blue", marginTop: 10 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default WelcomePopup;