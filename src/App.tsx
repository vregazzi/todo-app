import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import ClearRoundedIcon from '@mui/icons-material/Clear';
import EditRoundedIcon from '@mui/icons-material/Edit';
import SaveRoundedIcon from '@mui/icons-material/Save';
import AddRoundedIcon from '@mui/icons-material/AddRounded'; import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


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

const validateInput = (text: string, list: TodoItem[]) => {
  let error = "";
  if (text.length < 3) {
    error = "Text must be at least 3 characters long.";
  }
  else if (list.some((item) => item.text === text)) {
    error = "Input must be new value.";
  }

  return error;
}

function App() {
  const [listItems, setListItems] = useState<TodoItem[]>([]);
  const todoItems = listItems.map((entry, index) =>
    <TodoEntry item={entry} setList={setListItems} list={listItems} index={index} key={entry.id} />
  )

  return (
    <div id="main-div">
      <AddNewItemForm setList={setListItems} list={listItems} />
      <br></br>
      <Table sx={{ maxWidth: 500 }}>
        {todoItems}
      </Table>
    </div >
  );
}

function TodoEntry(props: TodoEntryProps) {
  const [editMode, updateEdit] = useState(false)
  const [inputText, setEditText] = useState(props.item.text);
  const [textError, setTextError] = useState("")

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

  const handleSubmit = () => {
    if (inputText === props.item.text) {
      updateEdit(false)
      return;
    }

    const error = validateInput(inputText, props.list);
    if (error) {
      setTextError(error);
      return;
    }

    let newList = [...props.list]
    newList[props.index] = { text: inputText, id: props.item.id }
    props.setList(newList)

    updateEdit(false)
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Escape") {
      setEditText(props.item.text)
      updateEdit(false);
    }
    else if (event.key === "Enter") {
      handleSubmit()
    }
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setEditText(event.target.value)
    setTextError("")
  }

  return (
    <TableRow>
      <TableCell>{editMode ?
        <TextField
          variant="standard"
          value={inputText}
          onChange={handleChange}
          autoFocus={true}
          error={textError ? true : false}
          helperText={textError}
          autoComplete='off'
          onKeyDown={handleKeyDown}
        />
        : props.item.text}
      </TableCell>

      <TableCell width={50}>{editMode ?
        <Button variant="contained" size={"small"} style={{ minWidth: 20 }} onClick={handleSubmit}>
          <SaveRoundedIcon />
        </Button>
        : <Button variant="contained" onClick={handleEditClick} size="small" style={{ minWidth: 20 }} disabled={editMode}>
          <EditRoundedIcon />
        </Button>
      }
      </TableCell>

      <TableCell width={50}>
        <Button variant="contained" onClick={handleDeleteClick} size="small" style={{ minWidth: 20 }} disabled={editMode}>
          <ClearRoundedIcon />
        </Button >
      </TableCell>
    </TableRow >
  )
}

function AddNewItemForm(props: AddNewItemFormProps) {
  const [inputText, setInputText] = useState("");
  const [textError, setTextError] = useState("")

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputText(event.target.value)
    setTextError("")
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const error = validateInput(inputText, props.list);
    if (error) {
      setTextError(error);
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
      <Typography variant="h6" style={{ paddingTop: "30px" }} gutterBottom>
        To do list
      </Typography>
      <TextField
        variant="standard"
        value={inputText}
        onChange={handleChange}
        autoFocus={true}
        error={textError ? true : false}
        helperText={textError}
        autoComplete='off'
        placeholder="Enter task"
      />
      &emsp;
      <Button variant="contained" type="submit" className='submitButton'>
        <AddRoundedIcon fontSize='small'></AddRoundedIcon>
      </Button>
    </form >
  )
}

export default App;
