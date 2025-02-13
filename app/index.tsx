//react
import React, { useCallback, useEffect, useRef, useState } from "react";

//react native
import {
  ActivityIndicator,
  Image,
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

//debounce
import debounce from "lodash/debounce";

//apis
import { fetchForecast, fetchLocationBySearch } from "@/api/weather";

//icons
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function Home() {
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchByData, setSearchByData] = useState([]);
  const [currentWeather, setCurrentWeather] = useState<any>({});
  const inputRef = useRef<TextInput>(null);

  const AppBackground = "../assets/images/bg.jpg";
  const weatherIcon = "../assets/images/weather/party-cloudy.png";

  const handleLocation = (item: any) => {
    setSearchByData([]);
    setIsLoading(true);
    if (inputRef.current) {
      inputRef.current.clear();
    }

    fetchForecast(item?.name).then((data) => {
      setCurrentWeather(data);
      setIsLoading(false);
      Keyboard.dismiss();
      setIsPreview(false);
    });
  };

  const handleSearch = (cityName: string) => {
    setIsPreview(true);
    if (cityName.length > 2) {
      fetchLocationBySearch(cityName).then((data) => {
        setSearchByData(data);
      });
    } else {
      setIsPreview(false);
    }
  };

  useEffect(() => {
    fetchFirstWeather();
  }, []);

  const fetchFirstWeather = async () => {
    fetchForecast("Istanbul").then((data) => {
      setCurrentWeather(data);
      setIsLoading(false);
    });
  };

  const handleTextDeb = useCallback(debounce(handleSearch, 1000), []);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
      className="flex-1 relative overflow-hidden"
    >
      {/* <View className="absolute w-full h-full bg-black/10 z-[1]"></View> */}

      <Image
        source={require(AppBackground)}
        resizeMode="cover"
        className="absolute w-full h-full inset-0"
      />

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#135D66" />
        </View>
      ) : (
        <SafeAreaView className="w-full h-full">
          <View className="px-6 py-10 w-full flex">
            <View className="flex flex-col w-full mb-16 relative">
              <View
                className={`w-full flex-row items-center justify-between bg-primary/10 px-3 rounded-md ${
                  searchByData?.length > 0 && "rounded-b-none"
                }`}
              >
                <View className="w-[90%]">
                  <TextInput
                    ref={inputRef}
                    onChangeText={handleTextDeb}
                    className="text-primary py-4 w-full"
                    placeholder="Search"
                    placeholderTextColor="#135D66"
                  />
                </View>

                <View className="w-11 h-11 flex items-center justify-center rounded-full">
                  <Feather name="search" size={24} color="#135D66" />
                </View>
              </View>
              {searchByData?.length > 0 && isPreview && (
                <View className="w-full h-auto absolute top-[45px] bg-primary/85 z-10 border-t border-light rounded-b-md">
                  {searchByData?.map((item: any, index) => (
                    <TouchableOpacity
                      onPress={() => handleLocation(item)}
                      key={index}
                      className="flex flex-row items-center gap-2 border-b border-light px-3 py-4"
                    >
                      <Entypo name="location-pin" size={24} color="#F2613F" />
                      <View>
                        <Text className="text-lg text-white">{item?.name}</Text>
                        <Text className="text-sm text-white italic">
                          {item?.country}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View className="flex flex-col items-center gap-6 mb-6">
              <View className="w-full flex justify-center items-center">
                <Image
                  //source={require(weatherIcon)}
                  source={{
                    uri: "https:" + currentWeather?.current?.condition?.icon,
                  }}
                  className="w-64 h-64 object-cover"
                />
              </View>
              <View className="flex flex-row items-end gap-1">
                <Text className="text-3xl font-bold text-primary">
                  {currentWeather?.location?.name},
                </Text>
                <Text className="text-lg font-light italic text-primary">
                  {currentWeather?.location?.country}
                </Text>
              </View>

              <View className="flex flex-col items-center gap-10">
                <Text className="text-4xl text-primary">
                  {currentWeather?.current?.condition?.text}
                </Text>
                <Text className="text-8xl font-bold text-primary">
                  {currentWeather?.current?.temp_c.toFixed()}&deg;
                </Text>
              </View>
            </View>
            <View className="flex flex-row justify-around items-center">
              <View className="flex flex-row items-center gap-2">
                <FontAwesome5 name="wind" size={24} color="#F2613F" />
                <Text className="text-xl font-bold text-primary">
                  {currentWeather?.current?.wind_mph} mph
                </Text>
              </View>
              <View className="flex flex-row items-center gap-2">
                <Entypo name="water" size={24} color="#F2613F" />
                <Text className="text-xl font-bold text-primary">
                  {currentWeather?.current?.humidity} %
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}
    </TouchableOpacity>
  );
}
