import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TodoEntry from "./TodoEntry";
import TodoItem from "./types/TodoItem";
import { validateInput } from "./TodoEntry";

describe("validateInput", () => {
  it("text less than 3 characters returns error", () => {
    let item = { text: "test text", id: "1" };
    let list: TodoItem[] = [item];
    let error = validateInput("ab", list);
    expect(error).toBe("Text must be at least 3 characters long.");
  });

  it("duplicate text returns error", () => {
    let item = { text: "test text", id: "1" };
    let list: TodoItem[] = [item];
    let error = validateInput("test text", list);
    expect(error).toBe("Input must be new value.");
  });

  it("valid text returns empty string", () => {
    let item = { text: "test text", id: "1" };
    let list: TodoItem[] = [item];
    let error = validateInput("new text", list);
    expect(error).toBe("");
  });
});

describe("TodoEntry", () => {
  it("should render without crashing", () => {
    let item = { text: "test text", id: "1" };
    let list: TodoItem[] = [item];
    let deleteTodo = async () => {};
    let editTodo = async () => {};
    render(
      <table>
        <tbody>
          <TodoEntry
            list={list}
            item={item}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        </tbody>
      </table>
    );
  });

  it("clicking delete calls deleteTodo", () => {
    // arrange
    let item = { text: "test text", id: "1" };
    let list: TodoItem[] = [item];
    let deleteTodo = jest.fn();
    let editTodo = async () => {};
    render(
      <table>
        <tbody>
          <TodoEntry
            list={list}
            item={item}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        </tbody>
      </table>
    );

    // act
    userEvent.click(screen.getByTitle("Delete todo item."));

    // assert
    expect(deleteTodo).toHaveBeenCalledWith(item.id);
  });

  it("clicking edit sets editMode to true", () => {
    // arrange
    let item = { text: "test text", id: "1" };
    let list: TodoItem[] = [item];
    let deleteTodo = async () => {};
    let editTodo = async () => {};
    render(
      <table>
        <tbody>
          <TodoEntry
            list={list}
            item={item}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        </tbody>
      </table>
    );

    // act
    userEvent.click(screen.getByTitle("Edit todo item."));

    // assert
    expect(screen.getByTitle("Save todo item.")).toBeInTheDocument();
  });

  it("clicking save calls editTodo", () => {
    // arrange
    let item = { text: "test text", id: "1" };
    let newText = "new text";
    let list: TodoItem[] = [item];
    let deleteTodo = async () => {};
    let editTodo = jest.fn();
    render(
      <table>
        <tbody>
          <TodoEntry
            list={list}
            item={item}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        </tbody>
      </table>
    );

    // act
    userEvent.click(screen.getByTitle("Edit todo item."));
    userEvent.type(screen.getByRole("textbox"), newText);
    userEvent.click(screen.getByTitle("Save todo item."));

    // assert
    expect(editTodo).toHaveBeenCalledWith(item.id, item.text + newText);
  });

  it("clicking save with error calls setTextError", () => {
    // arrange
    let item = { text: "1", id: "1" };
    let newText = "1";
    let list: TodoItem[] = [item];
    let deleteTodo = async () => {};
    let editTodo = jest.fn();
    render(
      <table>
        <tbody>
          <TodoEntry
            list={list}
            item={item}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        </tbody>
      </table>
    );

    // act
    userEvent.click(screen.getByTitle("Edit todo item."));
    userEvent.type(screen.getByRole("textbox"), newText);
    userEvent.click(screen.getByTitle("Save todo item."));

    // assert
    expect(
      screen.getByText("Text must be at least 3 characters long.")
    ).toBeInTheDocument();
  });

  it("clicking save with same text sets edit mode false", () => {
    // arrange
    let item = { text: "1", id: "1" };
    let list: TodoItem[] = [item];
    let deleteTodo = async () => {};
    let editTodo = jest.fn();
    render(
      <table>
        <tbody>
          <TodoEntry
            list={list}
            item={item}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        </tbody>
      </table>
    );

    // act
    userEvent.click(screen.getByTitle("Edit todo item."));
    userEvent.click(screen.getByTitle("Save todo item."));

    // assert
    expect(screen.getByTitle("Edit todo item.")).toBeInTheDocument();
  });

  it("pressing escape sets edit mode false", () => {
    // arrange
    let item = { text: "1", id: "1" };
    let list: TodoItem[] = [item];
    let deleteTodo = async () => {};
    let editTodo = async () => {};
    render(
      <table>
        <tbody>
          <TodoEntry
            list={list}
            item={item}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        </tbody>
      </table>
    );

    // act
    userEvent.click(screen.getByTitle("Edit todo item."));
    userEvent.keyboard("{esc}");

    // assert
    expect(screen.getByTitle("Edit todo item.")).toBeInTheDocument();
  });

  it("pressing enter calls handleSubmit", () => {
    // arrange
    let item = { text: "1", id: "1" };
    let list: TodoItem[] = [item];
    let deleteTodo = async () => {};
    let editTodo = async () => {};
    render(
      <table>
        <tbody>
          <TodoEntry
            list={list}
            item={item}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        </tbody>
      </table>
    );

    // act
    userEvent.click(screen.getByTitle("Edit todo item."));
    userEvent.keyboard("{enter}");

    // assert
    expect(screen.getByTitle("Edit todo item.")).toBeInTheDocument();
  });
});
