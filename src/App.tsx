import { useState } from 'react';
import Table from '@mui/material/Table';
import TodoEntry from './TodoEntry';
import AddNewItemForm from './AddNewItemForm';
import TodoItem from './types/TodoItem';


export default function App() {
  const [listItems, setListItems] = useState<TodoItem[]>([]);

  return (
    <div id="main-div">
      <AddNewItemForm setList={setListItems} list={listItems} />
      <br></br>
      <Table sx={{ maxWidth: 500 }}>
        {listItems.map((entry, index) =>
          <TodoEntry
            key={entry.id}
            item={entry}
            setList={setListItems}
            list={listItems}
            index={index}
          />
        )}
      </Table>
    </div >
  );
}
