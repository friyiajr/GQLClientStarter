import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  Modal,
} from "react-native";

import { ListItem } from "./components/ListItem";

import { useState } from "react";
import { AddTodoScreen } from "./components/Modal";

const mockData = [
  {
    title: "Hello",
    message: "World",
    completed: false,
  },
];

export function Home() {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const createTodo = async (title: string, message: string) => {
    setVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mockData}
        renderItem={(data) => {
          return <ListItem item={data.item} onPress={() => {}} />;
        }}
      />
      <Pressable style={styles.floatingButton} onPress={showModal} />
      <Modal visible={visible} animationType="slide">
        <AddTodoScreen onPress={createTodo} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  floatingButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "blue",
    position: "absolute",
    right: 20,
    bottom: 20,
  },
});
