"use client";
import Table from "@mui/material/Table";
import TodoEntry from "./TodoEntry";
import AddNewItemForm from "./AddNewItemForm";
import TodoItem from "./types/TodoItem";
import * as api from "./utils/api";
import { TableBody } from "@mui/material";
import { useTransition, useOptimistic } from "react";

interface AppProps {
  todoItems: TodoItem[];
}

interface Action {
  type: string;
  value: any;
}

export default function App(props: AppProps) {
  const [pending, startTransition] = useTransition();
  const [optimisticTodoItems, updateOptimistic] = useOptimistic(
    props.todoItems,
    (state, action: Action) => {
      if (action.type === "delete") {
        return state.filter((todoItem) => todoItem.id !== action.value);
      } else if (action.type === "edit") {
        return state.map((todoItem) => {
          if (todoItem.id === action.value.id) {
            return { ...todoItem, text: action.value.text };
          }
          return todoItem;
        });
      } else if (action.type === "create") {
        return state.concat({ id: "", text: action.value });
      } else {
        return state;
      }
    }
  );

  const createTodo = async (text: string) => {
    startTransition(() => updateOptimistic({ type: "create", value: text }));
    await api.postTodoItem(text);
  };

  const deleteTodo = async (id: string) => {
    startTransition(() => updateOptimistic({ type: "delete", value: id }));
    await api.deleteTodoItem(id);
  };

  const editTodo = async (id: string, text: string) => {
    startTransition(() =>
      updateOptimistic({ type: "edit", value: { id, text } })
    );
    await api.patchTodoItem(id, text);
  };

  return (
    <div id="main-div">
      <AddNewItemForm list={optimisticTodoItems} createTodo={createTodo} />
      <br></br>
      {pending && <h1>{"pending"}</h1>}
      <Table sx={{ maxWidth: 500 }}>
        <TableBody>
          {optimisticTodoItems.map((entry) => (
            <TodoEntry
              key={entry.id}
              item={entry}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              list={optimisticTodoItems}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
