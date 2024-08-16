import React from "react";
import {
  StyleSheet,
  FlatList,
  View,
  ImageBackground,
  ImageSourcePropType,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { appColors } from "@src/constants/colors";
import { ThemedText } from "@src/components/ThemedText";
import images from "@src/constants/images";
import CustomModal from "@src/components/CustomModal";
import FundWalletModal from "../modals/fundWallet";

const { width: screenWidth } = Dimensions.get("window");

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
    <>
      <View
        style={[styles.renderCardWrapper, { backgroundColor: prop.bgColor }]}
      >
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

            <CustomModal
              triggerItem={
                <>
                  <AntDesign name="plus" size={15} color={appColors.white} />
                  <ThemedText
                    type="small"
                    style={{ color: appColors.white, fontWeight: "600" }}
                  >
                    Fund Wallet
                  </ThemedText>
                </>
              }
              triggerItemStyle={[styles.renderCardHeader, styles.cardButton]}
              modalContent={<FundWalletModal />}
            />
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
    </>
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
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
    />
  );
};

const styles = StyleSheet.create({
  renderCardWrapper: {
    height: 200,
    width: screenWidth * 0.85,
    marginHorizontal: 10,
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
