import React from "react";
import { Image } from "react-native";
import Home from "../screen/Home";
import Portfolio from "../screen/Portfolio";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Camera from "../screen/Camera";
import Login from "../screen/Login";
import Signup from "../screen/Signup";
import AboutUs from "../screen/AboutUs";

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size }) => {
          let iconImage;

          if (route.name === "Home") {
            iconImage = require("../assets/homeImg.png");
          } else if (route.name === "Portfolio") {
            iconImage = require("../assets/portfolioImg.png");
          } else if (route.name === "Camera") {
            iconImage = require("../assets/cameraImg.png");
          } else if (route.name === "AboutUs") {
            iconImage = require("../assets/aboutImg.png");
          }

          return <Image source={iconImage} style={{ width: size, height: size }} />;
        },
        tabBarStyle: {
          backgroundColor: "#F2F2F2",
          borderColor: "#F4F4F4",
          borderWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: "black", 
        tabBarInactiveTintColor: "gray", 
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false, tabBarLabel: "", tabBarIconStyle: { marginTop: 15 } }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{ headerShown: false, tabBarLabel: "", tabBarIconStyle: { marginTop: 15 } }}
      />
      <Tab.Screen
        name="Camera"
        component={Camera}
        options={{ headerShown: false, tabBarLabel: "", tabBarIconStyle: { marginTop: 15 } }}
      />
      <Tab.Screen
        name="AboutUs"
        component={AboutUs}
        options={{ headerShown: false, tabBarLabel: "", tabBarIconStyle: { marginTop: 15 } }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
export default function Appnav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Login" component={Login} />  */}
      {/* <Stack.Screen name="Signup" component={Signup} />  */}
      <Stack.Screen name="BottomTab" component={BottomTab} />
    </Stack.Navigator>
  );
}
