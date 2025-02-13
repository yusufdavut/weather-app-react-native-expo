import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";

export default function Home() {
  const [text, setText] = useState("");

  const AppBackground = "../assets/images/bg.jpg";
  const weatherIcon = "../assets/images/weather/party-cloudy.png";

  return (
    <View className="flex-1 relative overflow-hidden">
      {/* <View className="absolute w-full h-full bg-black/10 z-[1]"></View> */}
      <Image
        source={require(AppBackground)}
        resizeMode="cover"
        className="absolute w-full h-full inset-0"
      />

      <SafeAreaView className="w-full h-full">
        <View className="px-6 py-10 w-full flex">
          <View className="w-full mb-24 flex-row items-center justify-between bg-primary/10">
            <View className="w-[90%]">
              <TextInput
                onChangeText={setText}
                value={text}
                className=" rounded-md px-2 py-4 w-full"
              />
            </View>

            <View className="w-11 h-11 flex items-center justify-center rounded-full">
              <Feather name="search" size={24} color="#135D66" />
            </View>
          </View>

          <View className="flex flex-col items-center gap-10">
            <View className="flex flex-row items-end gap-1">
              <Text className="text-3xl font-bold text-primary">İstanbul,</Text>
              <Text className="text-lg font-light italic text-primary">
                Türkiye
              </Text>
            </View>

            <View className="w-full flex justify-center items-center">
              <Image
                source={require(weatherIcon)}
                className="w-52 h-52 object-cover"
              />
            </View>

            <View className="flex">
              <Text className="text-8xl font-bold text-primary">5&deg;</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
