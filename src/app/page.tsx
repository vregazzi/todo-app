import App from "../App";
import * as api from "../utils/api";

export default async function Page() {
  const todoItems = await api.getTodoItems();
  return <App todoItems={todoItems} />;
}
