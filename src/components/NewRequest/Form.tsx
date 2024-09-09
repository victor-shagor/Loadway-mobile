import {
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";

const Form = ({
  handleSubmit,
  selectedFrequent,
}: {
  handleSubmit: (value: any) => void;
  selectedFrequent: any;
}) => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    setState({ ...selectedFrequent });
  }, [selectedFrequent]);

  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: string) => {
    setState({ ...state, [name]: value });
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      await handleSubmit(state);
      setState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="First Name"
        placeholderTextColor={"#66635A"}
        inputMode="text"
        className="mx-3  bg-[#D6D6D666] p-5 rounded-lg mb-5"
        onChangeText={(text) => handleChange("firstName", text)}
        value={state.firstName}
      />
      <TextInput
        placeholder="Last Name"
        placeholderTextColor={"#66635A"}
        inputMode="text"
        className="mx-3  bg-[#D6D6D666] p-5 rounded-lg mb-5"
        onChangeText={(text) => handleChange("lastName", text)}
        value={state.lastName}
      />
      <TextInput
        placeholder="Phone Number"
        placeholderTextColor={"#66635A"}
        inputMode="tel"
        className="mx-3  bg-[#D6D6D666] p-5 rounded-lg mb-5"
        onChangeText={(text) => handleChange("phoneNumber", text)}
        value={state.phoneNumber}
      />
      <TouchableOpacity
        className="bg-[#F6411B] mx-3 py-4 rounded-lg mb-[10%] mt-[10%]"
        disabled={loading}
        onPress={onSubmit}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text className="text-white text-center font-semibold">
            Create Request
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Form;
