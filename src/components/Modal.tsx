import { useState } from "react";
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextInput,
  TextStyle,
  Pressable,
} from "react-native";

interface Props {
  onPress: (title: string, message: string) => void;
}

export const AddTodoScreen = ({ onPress }: Props) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const onButtonPressed = () => {
    if (title && message) {
      onPress(title, message);
    }
  };
  return (
    <View style={container}>
      <View style={textContainer}>
        <TextInput
          value={title}
          style={textInput}
          placeholder="Todo Title"
          onChangeText={setTitle}
        />
        <TextInput
          value={message}
          style={textInput}
          placeholder="Todo Message"
          onChangeText={setMessage}
        />
      </View>
      <Pressable onPress={onButtonPressed} style={button}>
        <Text>Create</Text>
      </Pressable>
    </View>
  );
};

const container: StyleProp<ViewStyle> = {
  flex: 1,
  paddingHorizontal: 30,
};

const textInput: StyleProp<TextStyle> = {
  height: 40,
  borderBottomWidth: 1,
  marginVertical: 10,
};

const button: StyleProp<ViewStyle> = {
  justifyContent: "center",
  alignItems: "center",
  height: 55,
  backgroundColor: "lightblue",
  marginBottom: 20,
  borderRadius: 10,
};

const textContainer: StyleProp<TextStyle> = {
  flex: 1,
};
