import React, { useRef, useState, useEffect } from 'react';
import Card from '@material/react-card';
import { Button } from '@material/react-button';
import MaterialIcon from '@material/react-material-icon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { TextField } from '@rmwc/textfield';

import '@material/react-card/dist/card.css';
import '@material/react-button/dist/button.css';
import '@material/react-checkbox/dist/checkbox.css';
import '@material/react-icon-button/dist/icon-button.css';
import '@material/react-list/dist/list.css';
import '@material/react-material-icon/dist/material-icon.css';
import '@material/react-text-field/dist/text-field.css';
import '@material/react-material-icon/dist/material-icon.css';

import 'src/App-style.scss';
import s from 'src/styles.module.scss';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { Drawer } from '@material-ui/core';
import StateTest from './StateTest';

/**
 * 1. List of selectable values to add to input array
 * 2. Add new value to selectable values to add to input array
 * 3. Append selected values to form input
 */

const ListOfSelectableValues = ({ initialValues = [] }: any) => {
  const [checked, setChecked] = React.useState(initialValues);
  const inputRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.value = initialVals.join(', ');
    }
  }, [inputRef]);

  const toggleShowlist = () => setOpen((val) => !val);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleSetToList = (arrayVals: string[]) => {
    const input = inputRef.current;
    if (input) {
      input.value = arrayVals.join(', ');
    }
  };

  const handleClose = () => {
    handleSetToList?.(checked);
    toggleShowlist?.();
  };

  return (
    <>
      <TextField
        label="to"
        // helperText={<HelperText>Help Me!</HelperText>}
        onClick={toggleShowlist}
        trailingIcon={<MaterialIcon role="button" icon="add" />}
        name="to"
        inputRef={inputRef}
        readOnly
      />
      <Drawer anchor={'right'} open={open} onClose={handleClose}>
        <Button onClick={handleClose}>Save</Button>
        <List dense>
          {['email1', 'email2', 'email3', 'email14'].map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <ListItem key={value} button>
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(value)}
                    checked={checked.indexOf(value) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

const initialVals = ['email1', 'email2'];

function App() {
  const [hiddenFields, setHiddenFields] = useState(true);

  const [testState, setTestState] = useState('');

  const handleSubmit = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    const data = new FormData(e.target);

    console.log(data.getAll('cc'));
  };

  return (
    <div className="App">
      <header className="App-header">
        <Card className={s.card}>
          <form onSubmit={handleSubmit} className={s.form}>
            <StateTest>
              <ListOfSelectableValues initialValues={initialVals} />
            </StateTest>

            <StateTest>
              <input
                onChange={(e) => setTestState(e.target.value)}
                value={testState}
              />
            </StateTest>

            <StateTest>
              <Button type="submit">Submit</Button>
            </StateTest>
          </form>
        </Card>
      </header>
    </div>
  );
}

export default App;
