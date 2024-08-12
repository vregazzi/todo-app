import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
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

interface AddNewItemFormProps {
    setList: (list: TodoItem[]) => void,
    list: TodoItem[],
}

export default function AddNewItemForm(props: AddNewItemFormProps) {
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
