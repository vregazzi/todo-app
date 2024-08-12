import React, { SetStateAction, useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/Clear';
import EditRoundedIcon from '@mui/icons-material/Edit';
import SaveRoundedIcon from '@mui/icons-material/Save';
import { TableCell, TableRow } from "@mui/material"
import TodoItem from './types/TodoItem';


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

interface TodoEntryProps {
    item: TodoItem,
    setList: React.Dispatch<SetStateAction<TodoItem[]>>,
    list: TodoItem[],
    index: number,
}

export default function TodoEntry(props: TodoEntryProps) {
    const [editMode, setEditMode] = useState(false)
    const [inputText, setEditText] = useState(props.item.text);
    const [textError, setTextError] = useState("")

    const handleDeleteClick = () => {
        let newList = [...props.list]
        let index = newList.findIndex(v => v.id === props.item.id)

        newList.splice(index, 1);
        props.setList(newList);
    }

    const handleEditClick = () => {
        setEditMode(true)
    }

    const handleSubmit = () => {
        if (inputText === props.item.text) {
            setEditMode(false)
            return;
        }

        const error = validateInput(inputText, props.list);
        if (error) {
            setTextError(error);
            return;
        }

        props.setList((previousList) => {
            let newList = [...previousList];
            newList[props.index] = { text: inputText, id: props.item.id };

            return newList;
        });

        setEditMode(false);
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (event.key === "Escape") {
            setEditText(props.item.text)
            setEditMode(false);
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
