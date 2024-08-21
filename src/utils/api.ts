const baseUrl = "http://localhost:5100";

async function getTodoItems(): Promise<any> {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(`${baseUrl}/todo`, requestOptions);
  const data = await response.json();
  return data;
}

function postTodoItem(itemText: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    text: itemText,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(`${baseUrl}/todo`, requestOptions);
}

function deleteTodoItem(id: string) {
  const requestOptions: RequestInit = {
    method: "DELETE",
    redirect: "follow",
  };

  return fetch(`${baseUrl}/todo/${id}`, requestOptions);
}

async function patchTodoItem(id: string, text: string) {
  const requestOptions: RequestInit = {
    method: "PATCH",
    redirect: "follow",
  };

  return fetch(`${baseUrl}/todo/${id}?text=${text}`, requestOptions);
}

const api = {
  getTodoItems,
  postTodoItem,
  deleteTodoItem,
  patchTodoItem,
};

export default api;
