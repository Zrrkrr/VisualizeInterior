import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const AboutUs = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={require("../assets/visualize.png")}
          style={styles.logo}
        />
      </View>

      {/* Image Section */}
      <Image
        source={require("../assets/Members/Frame7.png")}
        style={styles.mainImage}
      />

      {/* About Us Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>About Us</Text>
        <Text style={styles.description}>
          At <Text style={styles.boldText}>Visualize Interior</Text> Design, we
          turn your dreams into reality. Our passionate and talented interior
          designers in Pune, Thane, Kalyan, and Nashik will work with you to
          bring your vision to life in no time.
        </Text>
        <Text style={styles.description}>
          From concept to completion, we'll ensure that your home interior
          design, commercial interior design, & office interior design project
          is successful.
        </Text>
        <Text style={styles.description}>
          We are a group of creative minds eager to take on creative challenges
          and provide diverse design ideas for developing your spaces
          (Home/Company/Institutions) in Pune, Thane, Kalyan, and Nashik.
        </Text>
      </View>

      {/* Professional Team Section */}
      <View style={styles.teamSection}>
        <Text style={styles.teamTitle}>MEET OUR PROFESSIONAL TEAM</Text>
        <View style={styles.teamContainer}>
          {/* Member 3 */}
          <View style={styles.teamMember}>
            <Image
              source={require("../assets/Members/member3.png")}
              style={styles.teamImage}
            />
            <Text style={styles.memberName}>Prakash Bheda</Text>
            <Text style={styles.memberRole}>CEO and Founder</Text>
          </View>
          
          {/* Member 2 */}
          <View style={styles.teamMember}>
            <Image
              source={require("../assets/Members/member2.png")}
              style={styles.teamImage}
            />
            <Text style={styles.memberName}>Kunda Wankhede</Text>
            <Text style={styles.memberRole}>Director and Co-Founder</Text>
          </View>

          {/* Member 1 */}
          <View style={styles.teamMember}>
            <Image
              source={require("../assets/Members/member1.png")}
              style={styles.teamImage}
            />
            <Text style={styles.memberName}>Ujwal Bhadane</Text>
            <Text style={styles.memberRole}>Interior Designer</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#eef2f5",
  },
  logo: {
    width: 50,
    height: 50,
  },
  mainImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  textContainer: {
    padding: 20,
    backgroundColor: "#FFCC00",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  teamSection: {
    padding: 20,
    backgroundColor: "#fff",
  },
  teamTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  teamContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  teamMember: {
    alignItems: "center",
  },
  teamImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  memberRole: {
    fontSize: 14,
    color: "#666",
  },
});

export default AboutUs;
