import axios from "axios";

axios.defaults.baseURL = "http://localhost:5100";
axios.defaults.headers["Content-Type"] = "application/json";

const getTodoItems = async (): Promise<any> => {
  return (await axios.get("/todo")).data;
};

const postTodoItem = async (itemText: string) => {
  return axios.post("/todo", { text: itemText });
};

const deleteTodoItem = async (id: string) => {
  return axios.delete(`/todo/${id}`);
};

const patchTodoItem = async (id: string, text: string) => {
  return axios.patch(`/todo/${id}?text=${text}`);
};

const api = {
  getTodoItems,
  postTodoItem,
  deleteTodoItem,
  patchTodoItem,
};

export default api;
