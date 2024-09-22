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
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";

const LandingScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

console.log("Authenticated User: ", user);

  const navigation = useNavigation();
  const pan = useRef(new Animated.ValueXY()).current;
  const pepperRef = useRef(null);
  const circleRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const circleLayouts = useRef(null); // UseRef to store circle layouts
  const isReady = useRef(true); // Flag to track if layouts have been measublue

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
                      navigation.navigate("Home");
                    } else if (index === 1) {
                      navigation.navigate("TrsMarket");
                    } else if (index === 2) {
                      setLocationTitle("Account");
                      // navigation.navigate("Splash");
                    } else if (index === 3) {
                      setLocationTitle("Exit");
                      // navigation.navigate("Splash");
                    } else if (index === 4) {
                      setLocationTitle("Main Chat");
                      // navigation.navigate("Splash");
                    } else if (index === 5) {
                      setLocationTitle("Map");
                      // navigation.navigate("Splash");
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

    // Measure the circles after the component has mounted
    setTimeout(() => measureCircles(), 500);
  }, []);

  const handleLogout = () => {
    // Perform logout logic here
    dispatch(logoutUser());
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Pepper in the Center with Hand Icon */}
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
      <View>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
        </TouchableOpacity>
      </View>
      <View>
        {/* Dynamic Top Title */}
        <Text style={styles.title}>{locationTitle}</Text>
      </View>

      {/* Middle Circles (TRS Marketplace, Learn, Account) */}
      <View className="flex-1 justify-center items-center">
        <View>
          <Text className="text-center mb-3">Home</Text>
          <View ref={circleRefs[0]} style={styles.circle}></View>
        </View>
        <View style={styles.row}>
          <View>
            <Text>Market Place</Text>
            <View ref={circleRefs[1]} style={styles.circle}></View>
          </View>
          <View>
            <Text>Account</Text>
            <View ref={circleRefs[2]} style={styles.circle}></View>
          </View>
        </View>
        <Text style={styles.pepperText}>
          Drop the pepper into a bubble to navigate
        </Text>
      </View>

      {/* Bottom Circles (Exit, Main Chat, Map) */}
      <View style={styles.row}>
        <View ref={circleRefs[3]} style={styles.circle}>
          <Text>X</Text>
        </View>
        <View ref={circleRefs[4]} style={styles.circle}>
          <Text>🗨️</Text>
        </View>
        <View ref={circleRefs[5]} style={styles.circle}>
          <Text>M</Text>
        </View>
      </View>
    </SafeAreaView>
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
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  circle: {
    width: Dimensions.get("window").width * 0.2, // Dynamic circle size
    height: Dimensions.get("window").width * 0.2,
    borderRadius: Dimensions.get("window").width * 0.1,
    borderWidth: 2,
    borderColor: "#f33", // Pink color for border
    justifyContent: "center",
    alignItems: "center",
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

export default LandingScreen;
