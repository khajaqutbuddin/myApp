import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/movieCard";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/searchBar";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  
  const {
    data:movies,
    loading: moviesLoading,
    error: moviesError,
    reset,
    refetch: loadMovies
  }  = useFetch(()=> fetchMovies({query:searchQuery}), false)


   useEffect(()=>{
   const timer  = setTimeout(async ()=>{
      if(searchQuery.trim()){
        await loadMovies()
     }else{
       reset()
     }
    }
  ,1000)

  return ()=> clearTimeout(timer)
   },[searchQuery])
  return (
    <View className=" flex-1 bg-primary">
     <Image source={images.bg} className="  flex-1 w-full z-0 absolute" resizeMode="cover"/>

    <FlatList
    data={movies}
    renderItem={({item})=> <MovieCard {...item}/>}
    keyExtractor={(item)=>item.id.toString()}
    className=" px-5"
    numColumns={3}
    columnWrapperStyle={{
      justifyContent:'center',
      gap:16,
      marginVertical:16
    }}
    contentContainerStyle={{ paddingBottom:100}}

    ListHeaderComponent={
      <>
      <View className=" w-full flex-row justify-center items-center mt-20">
<Image source={icons.logo} className="w-12 h-10" />
      </View>
      <View className=" my-5">
      <SearchBar 
      value={searchQuery}
      onChangeText={(text:string)=>{setSearchQuery(text)}}
      placeholder="Search Movies ..."/>
      </View>

      {moviesLoading && (<ActivityIndicator size='large' color='#0000ff' className=" my-3" />)}

      {moviesError&& (<Text className=" text-red-500 mt-5 my-3"> Error :{moviesError.message}</Text>)}

      {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length >0 &&
       (
        <Text className=" text-xl text-white font-bold">
          Search Result for {''}
          <Text className=" color-accent"> {searchQuery}</Text>
        </Text>
       )}
      </> 
    }
    ListEmptyComponent={
      !moviesLoading && !moviesError ? (
      <View className=" mt-10 px-5">
        <Text className=" text-center text-2xl text-gray-700 ">{searchQuery.trim()? 'No Movies Found! :(': 'Search for Movies '}</Text>
      </View>
      ): null
    }

    />

    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
