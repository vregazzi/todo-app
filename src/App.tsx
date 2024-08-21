import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TodoEntry from "./TodoEntry";
import AddNewItemForm from "./AddNewItemForm";
import TodoItem from "./types/TodoItem";
import api from "./utils/api";

export default function App() {
  const [listItems, setListItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    refreshTodoItems();
  }, []);

  const createTodo = async (text: string) => {
    setListItems([...listItems, { text: text, id: "" }]);
    await api.postTodoItem(text);
    refreshTodoItems();
  };

  const deleteTodo = async (id: string) => {
    setListItems((previousState) => {
      return previousState.filter((entry) => {
        return entry.id !== id;
      });
    });
    await api.deleteTodoItem(id);
    refreshTodoItems();
  };

  const editTodo = async (id: string, text: string) => {
    setListItems((previousState) => {
      return previousState.map((entry) => {
        if (entry.id === id) {
          return { ...entry, text };
        }
        return entry;
      });
    });

    await api.patchTodoItem(id, text);
    refreshTodoItems();
  };

  const refreshTodoItems = async () => {
    setListItems(await api.getTodoItems());
  };

  return (
    <div id="main-div">
      <AddNewItemForm list={listItems} createTodo={createTodo} />
      <br></br>
      <Table sx={{ maxWidth: 500 }}>
        {listItems.map((entry) => (
          <TodoEntry
            key={entry.id}
            item={entry}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            list={listItems}
          />
        ))}
      </Table>
    </div>
  );
}
