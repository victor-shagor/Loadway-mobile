import React from "react";
import {
  StyleSheet,
  FlatList,
  View,
  ImageBackground,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { appColors } from "@src/constants/colors";
import { ThemedText } from "@src/components/ThemedText";
import images from "@src/constants/images";

interface DashboardCardProps {
  cardTag: string;
  amount: string;
  date: string;
  bgColor: string;
  bgImage?: ImageSourcePropType | string;
}

const cardArray: DashboardCardProps[] = [
  {
    cardTag: "Wallet Balance",
    amount: "N10,000",
    date: "as at 16 Jan 2023",
    bgColor: appColors.wine,
    bgImage: images.icons.dashboardCard1,
  },
  {
    cardTag: "Due Bills",
    amount: "N20,000",
    date: "as at 17 Feb 2023",
    bgColor: appColors.black,
    bgImage: images.icons.dashboardCard1,
  },
];

const RenderedCard = (prop: DashboardCardProps) => {
  return (
    <View style={[styles.renderCardWrapper, { backgroundColor: prop.bgColor }]}>
      <ImageBackground
        source={prop.bgImage as ImageSourcePropType}
        resizeMode="contain"
        style={styles.renderCardImage}
      >
        <View style={styles.renderCardHeaderContainer}>
          <View style={styles.renderCardHeader}>
            <ThemedText
              type="small"
              style={{ color: appColors.white, fontWeight: "600" }}
            >
              {prop.cardTag}
            </ThemedText>
          </View>

          <TouchableOpacity
            style={[styles.renderCardHeader, styles.cardButton]}
          >
            <AntDesign name="plus" size={15} color={appColors.white} />
            <ThemedText
              type="small"
              style={{ color: appColors.white, fontWeight: "600" }}
            >
              Fund Wallet
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 6 }}>
          <ThemedText type="title" style={{ color: appColors.white }}>
            {prop.amount}
          </ThemedText>
          <ThemedText style={{ color: appColors.white }}>
            {prop.date}
          </ThemedText>
        </View>
      </ImageBackground>
    </View>
  );
};

const Cards = () => {
  return (
    <FlatList
      horizontal
      data={cardArray}
      renderItem={({ item }) => (
        <RenderedCard
          cardTag={item.cardTag}
          amount={item.amount}
          date={item.date}
          bgColor={item.bgColor}
          bgImage={item.bgImage}
        />
      )}
      keyExtractor={(item) => item.cardTag}
      contentContainerStyle={styles.renderedContent}
    />
  );
};

const styles = StyleSheet.create({
  renderedContent: {
    padding: 20,
    gap: 30,
    flex: 1,
    height: 250,
  },
  renderCardWrapper: {
    alignItems: "stretch",
    justifyContent: "flex-end",
    height: "100%",
    width: "100%",
    marginHorizontal: "auto",
    borderRadius: 15,
  },
  renderCardImage: {
    flex: 1,
    justifyContent: "space-around",
    padding: 15,
  },
  renderCardHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  renderCardHeader: {
    borderRadius: 100,
    backgroundColor: appColors.orange,
    paddingVertical: 5,
    paddingHorizontal: 7,
  },
  cardButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "rgba(0,0,0, 0.7)",
  },
});
export default Cards;
