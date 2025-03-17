import { Stack } from "expo-router";
import './globals.css'; 
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, StatusBar, View } from "react-native";
export default function RootLayout() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null)

  useEffect(()=>{
    const checkUser = async()=>{
    try {
      
        const user = await AsyncStorage.getItem("user")
        const parsedUser = user ? JSON.parse(user) : null ;
        setInitialRoute(parsedUser ? "(tabs)" :"login")
      } catch (error) {
        console.error('Error check user ', error)
        setInitialRoute("login")
      }
    }
      checkUser()
  },[])


  if(initialRoute === null){
    return(
      <View className="flex-1 justify-center items-center bg-gray-900">
      <ActivityIndicator size="large" color="#fff" />
    </View>
    )
  }

  return( 
    <>
    <StatusBar hidden={true}/>
  <Stack initialRouteName={initialRoute}
  >
    
    <Stack.Screen name="(tabs)" options={{ headerShown:false}} />
    <Stack.Screen name="login" options={{ headerShown: false }} />
    <Stack.Screen name="register" options={{ headerShown: false }} />
    <Stack.Screen name="movie/[id]" options={{ headerShown:false}} />
     </Stack>
     </>
     );
}
