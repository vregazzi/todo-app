import React, { useState } from 'react';
import './App.css';

interface TodoItem {
  id: number,
  text: string,
}

interface AddNewItemFormProps {
  setList: (list: TodoItem[]) => void,
  list: TodoItem[],
}

interface TodoEntryProps {
  item: TodoItem,
  setList: (list: TodoItem[]) => void,
  list: TodoItem[],
  index: number,
}

function App() {
  const [listItems, setListItems] = useState<TodoItem[]>([]);
  const todoItems = listItems.map((entry, index) =>
    <TodoEntry item={entry} setList={setListItems} list={listItems} index={index} key={entry.id} />
  )

  return (
    <>
      <div id="main-div">
        <AddNewItemForm setList={setListItems} list={listItems} />
        <br></br>
        {todoItems}
      </div >
    </>
  );
}

function TodoEntry(props: TodoEntryProps) {
  const [edit, updateEdit] = useState(false)
  const [inputText, setEditText] = useState(props.item.text);

  const handleDeleteClick = () => {
    let newList = [...props.list]
    let index = newList.findIndex(v => v.id === props.item.id)

    newList.splice(index, 1);
    props.setList(newList);
  }

  const handleEditClick = () => {
    let newList = [...props.list]
    props.setList(newList);
    updateEdit(true)
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!inputText) {
      return;
    }

    let newList = [...props.list]
    newList[props.index] = { text: inputText, id: props.item.id }
    props.setList(newList)

    updateEdit(false)
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setEditText(event.target.value)
  }

  if (!edit) {
    return (
      <>
        <div>
          <li>
            <button className="deleteButton" onClick={handleDeleteClick}>X</button>
            &emsp;
            <button className="editButton" onClick={handleEditClick}>edit</button>
            &emsp;
            {props.item.text}
          </li>
        </div>
      </>
    )
  }
  else {
    return (
      <li>
        <button type="button" className="deleteButton" disabled={true}>X</button>
        &emsp;
        <button type="button" className="editButton" disabled={true}>edit</button>
        &emsp;
        <form className="editForm" onSubmit={handleSubmit}>
          <input type="text" value={inputText} onChange={handleChange} autoFocus={true}></input>
          &emsp;
          <button className="submitButton">submit</button >
        </form>
      </li>
    )
  }
}

function AddNewItemForm(props: AddNewItemFormProps) {
  const [inputText, setInputText] = useState("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputText(event.target.value)
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!inputText) {
      return;
    }

    let newItem: TodoItem = {
      id: Math.random() * 100,
      text: inputText,
    }

    props.setList([...props.list, newItem])
    setInputText("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>To do list</p>
      <input type="text" value={inputText} onChange={handleChange}></input>
      &emsp;
      <button className="submitButton">submit</button >
    </form>
  )
}

export default App;
