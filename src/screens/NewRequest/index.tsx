import { View, ScrollView, Alert, StatusBar } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import FrequentVisit from "@src/components/NewRequest/FrequentVisit";
import SelectContact from "@src/components/NewRequest/SelectContact";
import Form from "@src/components/NewRequest/Form";
import OrFill from "@src/components/NewRequest/OrFill";
import AccessSent from "@src/components/Modal/AccessSent";
import { addToFrequentList, createGateAccess, getFrequesntVisitors } from "@src/api/gateRequest";
import { useRequestContext } from "@src/context/gateRequest";
import { useFocusEffect } from "@react-navigation/native";
import { useCurrentUser } from "@src/hooks/useCurrentUser";

const NewRequest = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("dark-content");
    }, [])
  );

  const { setFrequent, frequents, setRefetch, refetch } = useRequestContext();


  useEffect(() => {
    (async () => {
      const data = await getFrequesntVisitors();
      setFrequent(data);
    })();
  }, []);

  const [selectedFrequent, setSelectedFrequent] = useState<any>({})


  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [access, setAccess] = useState({firstName:'', lastName:'', phoneNumber:''})
  const updateCurrentUser = useCurrentUser();

  const handleSubmit = async (data:any) =>{
    console.log(data)
    try {
      await createGateAccess(data)
      await updateCurrentUser()
      setAccess(data)
      setModalVisible(true)
      setRefetch(!refetch)
    } catch (error:any) {
      console.log(error)
      Alert.alert(error)
    } 
  }

  const handleAddToFrequent = async () =>{
    try {
      await addToFrequentList({phoneNumber: access.phoneNumber })
      const data = await getFrequesntVisitors()
      setFrequent(data)
    } catch (error:any) {
      console.log(error?.reponse?.data)
    }
  }

  return (
    <ScrollView className=" flex-1">
      <View className=" bg-[#FAFAFA] h-screen">
        <FrequentVisit data={frequents} setSelectedFrequent={setSelectedFrequent}/>
        {/* <SelectContact /> */}
        {/* <OrFill /> */}
        <Form handleSubmit={handleSubmit} selectedFrequent={selectedFrequent}/>
        <AccessSent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          access={access}
          handleAddToFrequent={handleAddToFrequent}
        />
      </View>
    </ScrollView>
  );
};

export default NewRequest;