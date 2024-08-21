import React from "react";
import {
  StyleSheet,
  FlatList,
  View,
  ImageBackground,
  ImageSourcePropType,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { appColors } from "@src/constants/colors";
import { ThemedText } from "@src/components/ThemedText";
import images from "@src/constants/images";
import CustomModal from "@src/components/CustomModal";
import FundWalletModal from "../../screens/modals/fundWallet";
import { User } from "@src/models/User";

const { width: screenWidth } = Dimensions.get("window");

interface DashboardCardProps {
  cardTag: string;
  amount: number;
  date: string;
  bgColor: string;
  bgImage?: ImageSourcePropType | string;
}

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
                style={{ color: appColors.white, fontWeight: 600 }}
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
            <ThemedText
              type="title"
              style={{ color: appColors.white, fontWeight: 800, fontSize: 18 }}
            >
              {prop.amount}
            </ThemedText>
            <ThemedText style={{ color: appColors.white, fontSize: 12 }}>
              {prop.date}
            </ThemedText>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

const Cards = ({ currentUser }: { currentUser: User | null }) => {
  const [indexDot, setIndexDot] = React.useState(0);

  const onChangeDot = (event: any) => {
    setIndexDot(Math.ceil(event.nativeEvent.contentOffset.x / screenWidth));
  };

  const dot = [
    {
      text: "dot1",
    },
    {
      text: "dot2",
    },
  ];

  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const cardArray: DashboardCardProps[] = [
    {
      cardTag: "Wallet Balance",
      amount: currentUser?.wallet?.balance || 0.0,
      date: `as at ${formattedDate}`,
      bgColor: appColors.wine,
      bgImage: images.icons.dashboardCard1,
    },
    {
      cardTag: "Due Bills",
      amount: currentUser?.duesSum || 0.0,
      date: `as at ${formattedDate}`,
      bgColor: appColors.black,
      bgImage: images.icons.dashboardCard1,
    },
  ];

  const renderPagination = React.useMemo(() => {
    return (
      <View style={styles.wrapPagination}>
        {dot.map((_, index) => {
          return (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    indexDot === index
                      ? appColors.deepWine
                      : "rgba(0, 0, 0, 0.3)",
                  width: indexDot === index ? 28 : 10,
                },
              ]}
            />
          );
        })}
      </View>
    );
  }, [dot?.length, indexDot]);

  return (
    <>
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
        onMomentumScrollEnd={onChangeDot}
      />
      {renderPagination}
    </>
  );
};

const styles = StyleSheet.create({
  renderCardWrapper: {
    height: 140,
    width: screenWidth * 0.85,
    marginHorizontal: 10,
    borderRadius: 15,
  },
  renderCardImage: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 15,
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

  wrapPagination: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    marginBottom: 18,
  },
  dot: {
    height: 5,
    borderRadius: 5,
  },
});

export default Cards;
