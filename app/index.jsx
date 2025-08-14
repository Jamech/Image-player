import { StyleSheet, Text, View,Button, SafeAreaView } from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react';
import { Image } from 'react-native';
import { StatusBar } from 'react-native';
import { Platform } from 'react-native';


const Home = () => {

 const images=[
    require('../assets/images/image1.jpg'),
    require('../assets/images/image2.jpg'),
    require('../assets/images/image3.jpg'),
    require('../assets/images/image4.jpg'),
    require('../assets/images/image5.jpg'),
 ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [playing, setPlaying] = useState(true);

  const showNextImage = () => {
  setCurrentIndex((prevIndex) => {
    if (shuffle) {
      // Pick a random image index that’s different from the current one
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * images.length);
      } while (randomIndex === prevIndex && images.length > 1);
      return randomIndex;
    } else {
      // Go to next image in sequence
      const nextIndex = prevIndex + 1;
      if (nextIndex >= images.length) {
        // End of images
        return repeat ? 0 : prevIndex; // Loop if repeat is ON, else stay on last
      } else {
        return nextIndex;
      }
    }
  });
};
    useEffect(() => {
        if (playing) {
        const interval = setInterval(() => {
            showNextImage();
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval);
        }
    }, [playing, shuffle, repeat]);

  return (

    <SafeAreaView style={styles.container}>
        <StatusBar
        backgroundColor={Platform.OS === 'android' ? '#000' : undefined}
        barStyle="light-content"
      />
      <View>
        <Image
            source={images[currentIndex]}
            style={{ width: '100%', height: 300, resizeMode: 'contain' }}
        />

        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Button title={shuffle ? "Shuffle ON" : "Shuffle OFF"} onPress={() => setShuffle(!shuffle)} />
          <View style={{ height: 10 }} />
          <Button title={repeat ? "Repeat ON" : "Repeat OFF"} onPress={() => setRepeat(!repeat)} />
          <View style={{ height: 10 }} />
          <Button title={playing ? "Pause" : "Play"} onPress={() => setPlaying(!playing)} />
</View>
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      paddingTop: 30,
    }
})