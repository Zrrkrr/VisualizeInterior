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
        <Text style={styles.headerTitle}>About Us</Text>
      </View>

      {/* Main Content Section */}
      <View style={styles.content}>
        {/* About Us Text */}
        <View style={styles.textContainer}>
          <Text style={styles.description}>
            At <Text style={styles.boldText}>Visualize Interior Design</Text>, we
            turn your dreams into reality. Our passionate and talented interior
            designers in Pune, Mumbai, Nashik, Aurangabad, Buldhana, Nagpur,
            Bangalore, Wapi, Varodra, Surat, Ahmedabad, Rajkot will work with you
            to bring your vision to life in no time.
          </Text>
          <Text style={styles.description}>
            From concept to completion, we'll ensure that your home interior
            design, commercial interior design, & office interior design project
            is successful.
          </Text>
          <Text style={styles.description}>
            We are a group of creative minds eager to take on creative challenges
            and provide diverse design ideas for developing your spaces in Pune,
            Mumbai, Nashik, Aurangabad, Buldhana, Nagpur, Bangalore, Wapi,
            Varodra, Surat, Ahmedabad, Rajkot, and other cities.
          </Text>
        </View>

        {/* Professional Team Section */}
        <View style={styles.teamSection}>
          <Text style={styles.teamTitle}>Meet Our Professional Team</Text>
          <View style={styles.teamContainer}>
            {/* Member 1 */}
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

            {/* Member 3 */}
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#f8f9fa",
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textContainer: {
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    color: "#444",
    marginBottom: 15,
    textAlign: "justify",
  },
  boldText: {
    fontWeight: "bold",
    color: "#000",
  },
  teamSection: {
    marginTop: 20,
  },
  teamTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  teamContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  teamMember: {
    width: "48%",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
  },
  teamImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  memberRole: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});

export default AboutUs;