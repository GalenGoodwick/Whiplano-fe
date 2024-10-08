import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  PanResponder,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import color from "../../constant/color";

const screenWidth = Dimensions.get("window").width;
const OrbNavigation = () => {
  const navigation = useNavigation();
  const pan = useRef(new Animated.ValueXY()).current;
  const pepperRef = useRef(null);
  const circleRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const circleLayouts = useRef(null); // UseRef to store circle layouts
  const isReady = useRef(true); // Flag to track if layouts have been measublue

  const [isNavigationVisible, setIsNavigationVisible] = useState(false);

  const toggleNavigation = () => {
    setIsNavigationVisible(!isNavigationVisible);
  };

  // State to store the current title
  const [locationTitle, setLocationTitle] = useState("Location Title");

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => {
        return isReady.current;
      },
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (evt, gestureState) => {
        // Measure the pepper's position
        if (pepperRef.current) {
          pepperRef.current.measureInWindow(
            (pepperX, pepperY, pepperWidth, pepperHeight) => {
              const pepperBox = {
                x: pepperX,
                y: pepperY,
                width: pepperWidth,
                height: pepperHeight,
              };

              if (circleLayouts.current) {
                // Check for collision with each circle
                circleLayouts.current.forEach((circle, index) => {
                  if (isCollision(pepperBox, circle)) {
                    if (index === 0) {
                      navigation.replace("TrsMarket");
                    } else if (index === 1) {
                      navigation.replace("Wallet");
                    } else if (index === 2) {
                      navigation.replace("account");
                    } else if (index === 3) {
                      console.log("2");
                      setLocationTitle("Landing");
                    }
                  }
                });
              }
            }
          );
        }

        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const isCollision = (box1, box2) => {
    return (
      box1.x < box2.x + box2.width &&
      box1.x + box1.width > box2.x &&
      box1.y < box2.y + box2.height &&
      box1.y + box1.height > box2.y
    );
  };

  useEffect(() => {
    if (isNavigationVisible) {
      const measureCircles = () => {
        const layouts = [];
        circleRefs.forEach((ref, index) => {
          ref.current.measureInWindow((x, y, width, height) => {
            layouts.push({ x, y, width, height });
            if (index === circleRefs.length - 1) {
              circleLayouts.current = layouts; // Store the layouts in the ref
              isReady.current = true; // Mark layouts as ready
            }
          });
        });
      };

      // Measure the circles when navigation is visible
      setTimeout(() => measureCircles(), 100);
    }
  }, [isNavigationVisible]);

  return (
    <>
      {/* Pepper button (changes to cross when navigation is visible) */}
      <View
        style={{
          position: "absolute",
          bottom: 30,
          right: 0,
          left: 0, // Ensures the button spans the full width
          width: screenWidth - 30, // Full width minus a little margin
          marginHorizontal: 15, // Center horizontally with margin
          zIndex: 999,
        }}
      >
        <TouchableOpacity
          onPress={toggleNavigation}
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {/* Text
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginRight: 10 }}>
          My TRS Inventory
        </Text> */}

          {/* Image or Icon */}
          <Image
            source={{ uri: "https://i.ibb.co/XWhq3k7/Whippy.png" }} // Replace with the actual logo URL
            style={{ width: 50, height: 50, borderRadius: 15 }} // Icon size and style
          />
        </TouchableOpacity>
      </View>

      {isNavigationVisible && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 1)", // Transparent white background
            zIndex: 998, // Keep it below the pepper icon but above the content
          }}
        >
          <SafeAreaView className="p-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-3xl font-bold text-white">
                ORB Navigation
              </Text>

              <Animated.View
                ref={pepperRef}
                {...(isReady.current ? panResponder.panHandlers : {})} // Only allow pan if ready
                style={[pan.getLayout(), styles.pepper]}
              >
                <Image
                  source={{ uri: "https://i.ibb.co/7jfhC1K/whiplano.png" }} // Replace with your pepper image URL
                  style={styles.pepperImage}
                />
              </Animated.View>
            </View>

            {/* Middle Circles (Home, Learn, Account) */}
            <View style={styles.row}>
              {/* Market circle */}
              <View ref={circleRefs[0]} style={styles.circle}>
                <View>
                  <Text style={styles.circleLabel}>Market</Text>
                </View>
              </View>

              {/* Exit circle */}
              <View ref={circleRefs[1]} style={styles.circle}>
                <Text style={styles.circleLabel}>Wallet</Text>
                {/* <Image source={{ uri: "https://i.ibb.co/7jfhC1K/whiplano.png" }} style={styles.circleLogo} /> */}
              </View>

              {/* Chat circle */}
              <View ref={circleRefs[2]} style={styles.circle}>
                <Text style={styles.circleLabel}>Account</Text>
                {/* <Image source={{ uri: "https://i.ibb.co/7jfhC1K/whiplano.png" }} style={styles.circleLogo} /> */}
              </View>

              {/* Map circle */}
              <View ref={circleRefs[3]} style={styles.circle}>
                <Text style={styles.circleLabel}>Exit</Text>
                {/* <Image source={require('/mnt/data/image.png')} style={styles.circleLogo} /> */}
              </View>
            </View>
          </SafeAreaView>
        </View>
      )}
    </>
  );
};

// Style that adapts to screen size using percentage units
const styles = {
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: "5%",
  },
  title: {
    fontSize: Dimensions.get("window").width * 0.06, // Dynamic font size
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  circle: {
    width: Dimensions.get("window").width * 0.2, // Dynamic circle size
    height: Dimensions.get("window").width * 0.2,
    borderRadius: Dimensions.get("window").width * 0.1,
    borderWidth: 4,
    borderColor: "#f33", // Pink color for border
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    backgroundColor: "white",
  },

  pepperImage: {
    width: Dimensions.get("window").width * 0.2, // Dynamic pepper size
    height: Dimensions.get("window").width * 0.2,
    borderRadius: Dimensions.get("window").width * 0.1,
  },
  pepperText: {
    fontSize: Dimensions.get("window").width * 0.04, // Dynamic font size for instructions
    textAlign: "center",
    marginTop: 10,
  },
};

export default OrbNavigation;
