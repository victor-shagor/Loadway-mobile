import { View, Text, Modal, Image } from "react-native";
import React, { useState } from "react";
import CustomText from "../UserAuthentication/CustomText";
import { EmailInput } from "../UserAuthentication/Inputs";
import ForgotPasswordBtn from "../UserAuthentication/ForgotPasswordBtn";



const illustration = require("@/src/assets/icons/boyIluustration.png");
const ResetPasswordModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}) => {


  return (
    <View>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }}>
          <View className=" flex-1 flex-row h-screen justify-center items-center">
            <View className=" bg-[#FFFFFF] rounded-2xl">
              <Image source={illustration} className=" m-5"/>
              <CustomText
                heading="Forgot password?"
                sub_heading="Enter your email address and we will send you reset instructions."
              />
              <EmailInput action='changePassword' />
              <View className=" flex-row relative right-3 my-5">
                <ForgotPasswordBtn
                  bg_color="#F6411B1A"
                  border_color="#CD361633"
                  text_color="#CD3616"
                  text="Cancel"
                  type="modal"
                  setModalVisible={setModalVisible}
                  action="cancelModal"
                />
                <ForgotPasswordBtn
                  bg_color="#F6411B"
                  border_color="#F6411B"
                  text_color="#FFFFFF"
                  text={"send"}
                  type="modal"
                  action="sendEmailToBackend"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ResetPasswordModal;
