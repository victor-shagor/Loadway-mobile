import React, { createElement } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { appColors } from "@src/constants/colors";
import { quickLinksArray } from "@src/constants/data";

export type QuickLinksRootStackParamList = {
  GateAccess: undefined;
  Emergency: undefined;
  Message: undefined;
  Electricity: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  QuickLinksRootStackParamList,
  keyof QuickLinksRootStackParamList
>;

const QuickLinks = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className='pb-8 pt-10'>
      <FlatList
        data={quickLinksArray}
        horizontal
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate(item.href, item.params as any)}
          >
            {({ pressed }) => (
              <View
                className={`${pressed ? "opacity-50" : ""} gap-4 items-center`}
              >
                <View
                  className='w-16 h-16 items-center justify-center rounded-full'
                  style={{ backgroundColor: item.bgColor }}
                >
                  <View className='w-9 h-9 ml-1'>
                    {createElement(item.icon, {
                      width: 70,
                      height: 70,
                      primaryColor: item.iconColor,
                    })}
                  </View>
                </View>
                <Text className='font-normal text-[#0C0A04]'>{item.name}</Text>
              </View>
            )}
          </Pressable>
        )}
        contentContainerStyle={styles.quickLinksContainer}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  quickLinksContainer: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    flex: 1,
  },
  container: {
    flex: 1,
    gap: 15,
  },
  iconContainer: {
    backgroundColor: appColors.iconGray,
    height: 50,
    width: 50,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  recentChatsContainer: {
    gap: 12,
  },
});

export default QuickLinks;
