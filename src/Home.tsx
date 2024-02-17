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
import { useTodosByAuthor } from "./hooks/useTodosByAuthor";
import { useCreateTodo } from "./hooks/useCreateTodoForAuthor";
import { useCompleteTodo } from "./hooks/useCompleteTodo";

export function Home() {
  const [visible, setVisible] = useState(false);

  const { data, loading, error, refetch } = useTodosByAuthor("1");

  const { createNewTodo } = useCreateTodo("1");

  const { markTodoAsComplete } = useCompleteTodo("1");

  const showModal = () => {
    setVisible(true);
  };

  const createTodo = async (title: string, message: string) => {
    await createNewTodo(title, message);
    setVisible(false);
    refetch();
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data?.getTodosForAuthor}
        renderItem={(data) => {
          const onPress = () => {
            markTodoAsComplete(data.item.id, !data.item.completed);
          };
          return <ListItem item={data.item} onPress={onPress} />;
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
