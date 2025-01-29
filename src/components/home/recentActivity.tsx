import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ActivityType } from "@src/models/User";
import { renderIcon } from "../common/renderIcon";
import { formatString, formatTimestamp } from "@src/utils/helper";
import useOnboardingContext from "@src/utils/Context";
import { ScrollView } from "react-native-gesture-handler";
import images from "@src/constants/images";
import { Image } from "expo-image";


type ListIconProps = {
  type: ActivityType;
};

const ListIcon = ({ type }: ListIconProps) => {
  const iconMap = {
    COMPLAINT: images.quickLInks.complaints,
    GATE_ACCESS: images.quickLInks.visitors,
    WALLET: images.quickLInks.wallet,
    PASSWORD_CHANGE: images.quickLInks.complaints,
  };
  return (
    <View className='w-14 h-14 items-center justify-center rounded-full bg-[#F8F8F8]'>
      <Image source={iconMap[type]} contentFit='cover' className='w-8 h-8' />
    </View>
  );
};

const RecentActivity = () => {
  const { currentUser } = useOnboardingContext();
  const activities = currentUser?.activities || [];

  return (
    <View className='gap-2'>
      <Text className='text-black font-medium text-base'>RECENT ACTIVITY</Text>
      <ScrollView className='max-h-[300px] bg-white rounded-lg px-4'>
        {!activities.length ? (
          <View className='flex-row items-center py-8'>
            {renderIcon("clock", "MaterialCommunityIcons", 32, "#929292")}
            <Text className='ml-2 text-black/50 text-base'>
              No activity yet
            </Text>
          </View>
        ) : (
          activities.map((item, index) => (
            <View
              key={index}
              className={`flex-row py-4 ${
                index === activities?.length - 1 ? "" : "border-b"
              } border-black/30`}
              style={styles.listItem}
            >
              <ListIcon type={item.activityType as ActivityType} />
              <View className='flex-1 justify-center'>
                <Text className='text-black/80 text-xs'>
                  {formatString(item.activityType)}
                </Text>
                <Text className='text-black text-base'>{item.title}</Text>
              </View>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                <Text className='text-black/80 text-xs'>
                  {formatTimestamp(item.createdAt)}
                </Text>
                {(item.status && item.status !== 'ACTIVE') && <View style={{ alignItems: "center", justifyContent:'center', padding: 5, backgroundColor: '#E85637', borderRadius: 10}}>
                  <Text className="text-white">{ item.status}</Text>
                </View>}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    gap: 8,
  },
});

export default RecentActivity;
