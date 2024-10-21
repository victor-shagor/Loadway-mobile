import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@src/components/ThemedText";
import { appColors } from "@src/constants/colors";
import useOnboardingContext from "@src/utils/Context";
import { navigate } from "@src/navigation";
import { timestampDisplay } from "@src/utils/helper";

const PushNotifications = () => {

  const {alertNotifications, generalNotifications} = useOnboardingContext()
  if(!alertNotifications?.length && !generalNotifications?.length) return (<View></View>)
  return (
    <View style={styles.pushNotificationWrapper}>
      <View style={{ gap: 8 }}>
        <View style={{ gap: 8 }}>
          <ThemedText
            type="default"
            className="py-3"
            style={{ color: appColors.lightGray, fontWeight: 600 }}
          >
            Push Notifications
          </ThemedText>

          {(alertNotifications && alertNotifications.length > 0) &&<TouchableOpacity onPress={()=>navigate('UserNotifications', {alert:true, item: null})} style={styles.alertContainer}>
            <ThemedText
              type="small"
              style={{ fontWeight: 700, color: appColors.orange }}
            >
              {alertNotifications[0]?.title}
            </ThemedText>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{width:'70%', gap: 2}}>
              <ThemedText
                type="default"
                style={{ color: appColors.white, fontWeight: 600 }}
              >
                {alertNotifications[0]?.description}
              </ThemedText>
              <ThemedText
                type="default"
                 ellipsizeMode="tail"
                numberOfLines={2}
                style={{ color: appColors.white, fontSize: 12 }}
              >
                {alertNotifications[0]?.content}
              </ThemedText>
              </View>

              <View style={[styles.highRisk, {alignItems: 'flex-end'}]}>
              <ThemedText style={{color:appColors.white}} type="small">{timestampDisplay(alertNotifications[0]?.createdAt).formattedDate}</ThemedText>
              <ThemedText style={{color:appColors.white}} type="small">{timestampDisplay(alertNotifications[0]?.createdAt).formattedTime}</ThemedText>
              </View>
            </View>
          </TouchableOpacity>}
        </View>

        {generalNotifications && generalNotifications.length > 0 && <TouchableOpacity onPress={()=>navigate('UserNotifications', {})} style={styles.gateAccess}>
          <ThemedText
            type="small"
            style={{ fontWeight: 700, color: appColors.lightGray, textTransform: 'uppercase' }}
          >
            {generalNotifications[0]?.title}
          </ThemedText>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{width:'70%', gap: 2}}>
            <ThemedText
                type="default"
                style={{ fontWeight: 600 }}
              >
                {generalNotifications[0]?.description}
              </ThemedText>
              <ThemedText
              ellipsizeMode="tail"
                type="default"
                numberOfLines={2}
                style={{ fontSize: 12 }}
              >
                {generalNotifications[0]?.content}
              </ThemedText>
              </View>
            <View style={{ alignItems: 'flex-end' }}>
            <ThemedText type="small">{timestampDisplay(generalNotifications[0]?.createdAt).formattedDate}</ThemedText>
              <ThemedText type="small">{timestampDisplay(generalNotifications[0]?.createdAt).formattedTime}</ThemedText>
            </View>
          </View>
        </TouchableOpacity>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pushNotificationWrapper: {
    flex: 1,
    marginBottom: 20,
  },
  alertContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: appColors.black,
    borderRadius: 10,
    minHeight: 100,
    gap: 8,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  highRisk: {
    borderRadius: 5,
    padding: 6,
    color: appColors.white,
  },
  gateAccess: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: appColors.white,
    borderWidth: 1,
    borderColor: appColors.gray,
    borderRadius: 10,
    minHeight: 100,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});

export default PushNotifications;
