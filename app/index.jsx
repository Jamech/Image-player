import { StyleSheet, Text, View, Button, SafeAreaView, Image, StatusBar, Platform, Dimensions, Animated } from 'react-native';
import React, { useState, useEffect } from 'react';
import ControlButton from './components/ControlButton';
import { useRef } from 'react';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Home = () => {

 const images=[
    require('../assets/images/image10.jpg'),
    require('../assets/images/image9.jpg'),
    require('../assets/images/image8.jpg'),
    require('../assets/images/image7.jpg'),
    require('../assets/images/image6.jpg'),
 ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [playing, setPlaying] = useState(true);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const getNextIndex = (prevIndex) => {
    if (shuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * images.length);
      } while (randomIndex === prevIndex && images.length > 1);
      return randomIndex;
    } else {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= images.length) {
        return repeat ? 0 : prevIndex;
      } else {
        return nextIndex;
      }
    }
  };

  const showNextImage = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = getNextIndex(prevIndex);

      // Skip animation if same image
      if (nextIndex === prevIndex) return prevIndex;

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex(nextIndex);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });

      return prevIndex; // Keep same index until animation completes
    });
  };

  useEffect(() => {
    if (playing) {
      const interval = setInterval(showNextImage, 3000);
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
        <Animated.Image
            source={images[currentIndex]}
            style={[styles.image, { opacity: fadeAnim }]}
        />
      </View>

        <View style={styles.btn}>
  <ControlButton
    title={shuffle ? "Shuffle ON" : "Shuffle OFF"}
    onPress={() => setShuffle(!shuffle)}
    color={shuffle ? '#FF9800' : '#555'}
  />
  <ControlButton
    title={repeat ? "Repeat ON" : "Repeat OFF"}
    onPress={() => setRepeat(!repeat)}
    color={repeat ? '#2196F3' : '#555'}
  />
  <ControlButton
    title={playing ? "Pause" : "Play"}
    onPress={() => setPlaying(!playing)}
    color={playing ? '#4CAF50' : '#F44336'}
  />
</View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: '#000',
      paddingTop: 30,
    },
    image: {
      width: '100%',
      height: screenHeight * 0.80,
      resizeMode: 'contain',
    },
})