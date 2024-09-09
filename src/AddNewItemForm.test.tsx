import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import AddNewItemForm from "./AddNewItemForm";
import TodoItem from "./types/TodoItem";

describe("AddNewItemForm", () => {
  it("should render without crashing", () => {
    let list: TodoItem[] = [];
    let createTodo = async () => {};
    render(<AddNewItemForm list={list} createTodo={createTodo} />);
  });

  it("typing input displays text", () => {
    // arrange
    let list: TodoItem[] = [];
    let createTodo = async () => {};
    let inputText = "test text";
    render(<AddNewItemForm list={list} createTodo={createTodo} />);

    // act
    userEvent.type(screen.getByPlaceholderText("Enter task"), inputText);

    // assert
    expect(screen.getByPlaceholderText("Enter task")).toHaveValue(inputText);
  });

  it("submitting form calls createTodo", () => {
    // arrange
    let list: TodoItem[] = [];
    let createTodo = jest.fn();
    let inputText = "test text";
    render(<AddNewItemForm list={list} createTodo={createTodo} />);
    userEvent.type(screen.getByPlaceholderText("Enter task"), inputText);

    // act
    userEvent.click(screen.getByRole("button"));

    // assert
    expect(createTodo).toHaveBeenCalledWith(inputText);
  });

  it("submitting form under 3 characters does not call createTodo", () => {
    // arrange
    let list: TodoItem[] = [];
    let createTodo = jest.fn();
    let inputText = "e";
    render(<AddNewItemForm list={list} createTodo={createTodo} />);
    userEvent.type(screen.getByPlaceholderText("Enter task"), inputText);

    // act
    userEvent.click(screen.getByRole("button"));

    // assert
    expect(createTodo).not.toHaveBeenCalled();
  });

  it("submitting form already existing item does not call createTodo", () => {
    // arrange
    let item: TodoItem = { text: "test text", id: "1" };
    let list: TodoItem[] = [item];
    let createTodo = jest.fn();
    let inputText = "test text";
    render(<AddNewItemForm list={list} createTodo={createTodo} />);
    userEvent.type(screen.getByPlaceholderText("Enter task"), inputText);

    // act
    userEvent.click(screen.getByRole("button"));

    // assert
    expect(createTodo).not.toHaveBeenCalled();
  });
});
