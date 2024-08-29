"use server";
import { revalidateTag } from "next/cache";

const baseUrl = "http://api:5100";

export async function getTodoItems(): Promise<any> {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
    next: {
      tags: ["GET_TODO_ITEMS"],
    },
  };

  const response = await fetch(`${baseUrl}/todo`, requestOptions);
  return await response.json();
}

export async function postTodoItem(itemText: string) {
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

  let response = await fetch(`${baseUrl}/todo`, requestOptions);
  revalidateTag("GET_TODO_ITEMS");
  return await response.json();
}

export async function deleteTodoItem(id: string) {
  const requestOptions: RequestInit = {
    method: "DELETE",
    redirect: "follow",
  };

  const response = await fetch(`${baseUrl}/todo/${id}`, requestOptions);
  revalidateTag("GET_TODO_ITEMS");
  return response.ok;
}

export async function patchTodoItem(id: string, text: string) {
  const requestOptions: RequestInit = {
    method: "PATCH",
    redirect: "follow",
  };

  const response = await fetch(
    `${baseUrl}/todo/${id}?text=${text}`,
    requestOptions
  );
  revalidateTag("GET_TODO_ITEMS");
  return await response.json();
}
