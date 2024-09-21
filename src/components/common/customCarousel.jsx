// components/CustomCarousel.js
import React, { useState } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

const CustomCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Track active image index
  const images = [
    'https://via.placeholder.com/600x300',
    'https://via.placeholder.com/600x300',
    'https://via.placeholder.com/600x300',
  ];

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / Dimensions.get('window').width);
    setActiveIndex(currentIndex);
  };

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.carouselImage} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  carouselContainer: {
    marginBottom: 16,
  },
  carouselImage: {
    width: screenWidth * 0.9, // Make it fit 90% of the screen width for better alignment
    height: 180,
    borderRadius: 10,
    marginHorizontal: screenWidth * 0.05, // Center the image with margin on both sides
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'blue', // Blue color for active dot
  },
  inactiveDot: {
    backgroundColor: '#E0E0E0', // Light gray for inactive dots
  },
});

export default CustomCarousel;
