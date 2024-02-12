import { Pressable, Text, View, ViewStyle } from "react-native";

export const ListItem = ({
  item,
  onPress,
}: {
  item: any;
  onPress: () => void;
}) => {
  const { title, message, completed } = item;

  const containerStyle: ViewStyle = {
    height: 75,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    borderBottomWidth: 1,
  };

  const completedStatus: ViewStyle = {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: completed ? "lightblue" : "white",
    borderWidth: 1,
    borderColor: "black",
  };

  return (
    <Pressable style={containerStyle} onPress={onPress}>
      <View>
        <Text>{title}</Text>
        <Text>{message}</Text>
      </View>
      <View style={completedStatus} />
    </Pressable>
  );
};
