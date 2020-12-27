import React, { useRef, useState, useEffect } from "react";
import Card from "@material/react-card";
import { Button } from "@material/react-button";
import MaterialIcon from "@material/react-material-icon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { TextField, TextFieldHTMLProps, TextFieldProps } from "@rmwc/textfield";

import "@material/react-card/dist/card.css";
import "@material/react-button/dist/button.css";
import "@material/react-checkbox/dist/checkbox.css";
import "@material/react-icon-button/dist/icon-button.css";
import "@material/react-list/dist/list.css";
import "@material/react-material-icon/dist/material-icon.css";
import "@material/react-text-field/dist/text-field.css";
import "@material/react-material-icon/dist/material-icon.css";

import "src/App-style.scss";
import { TransitionStatus } from "react-transition-group/Transition";
import s from "src/styles.module.scss";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import { Drawer } from "@material-ui/core";
import StateTest from "./StateTest";

import { Transition } from "react-transition-group";

/*
 * 1. List of selectable values to add to input array
 * 2. Add new value to selectable values to add to input array
 * 3. Append selected values to form input
 */

const duration = 300;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 1,
  transform: "translateX(-100%)",
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: "#fff",
  zIndex: 10,
};

const transitionStyles = {
  entering: { opacity: 1, transform: "translateX(0)" },
  entered: { opacity: 1, transform: "translateX(0)" },
  exiting: { opacity: 0, transform: "translateX(-100%)" },
  exited: { opacity: 0, transform: "translateX(-100%)" },
} as any;

const ListOfSelectableValues = ({ initialValues = [] }: any) => {
  const [checked, setChecked] = React.useState(initialValues);
  const inputRef = useRef<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.value =
        initialVals.length === 1
          ? initialValues[0]
          : `${initialVals.length} recipients selected`;
    }
    // eslint-disable-next-line
  }, [inputRef]);

  const toggleShowList = () => setOpen((val) => !val);

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
      input.value = arrayVals.join(", ");
    }
  };

  const handleClose = () => {
    toggleShowList?.();
    handleSetToList(checked);
  };

  return (
    <>
      <TextField
        label="to"
        // helperText={<HelperText>Help Me!</HelperText>}
        onClick={toggleShowList}
        trailingIcon={<MaterialIcon role="button" icon="add" />}
        name="to"
        inputRef={inputRef}
        readOnly
        helpText={{
          persistent: true,
          children: `${
            inputRef.current?.value.split(",").length || 0
          } recipients selected`,
        }}
      />
      <Transition in={open} timeout={duration}>
        {(state) => (
          <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
            <Button onClick={handleClose}>{"< Back"}</Button>
            <List dense>
              {Array.from({ length: 200 }, (_, i) => `email address ${i}`).map(
                (value) => {
                  const labelId = `checkbox-list-secondary-label-${value}`;

                  return (
                    <ListItem key={value} button onClick={handleToggle(value)}>
                      <ListItemText id={labelId} primary={value} />
                      <ListItemSecondaryAction>
                        <Checkbox
                          onClick={handleToggle(value)}
                          edge="end"
                          checked={checked.indexOf(value) !== -1}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                }
              )}
            </List>
          </div>
        )}
      </Transition>
    </>
  );
};

const initialVals = ["email address 9"];

function App() {
  const handleSubmit = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    const data = new FormData(e.target);
    const to = data.get("to");
    const object = data.get("subject");
    console.log(to, object);
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
              <Input
                label="subject"
                // helperText={<HelperText>Help Me!</HelperText>}
                name="subject"
                initialValue="Annual agenda"
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

const Input = ({
  initialValue,
  onChange,
  ...props
}: { initialValue: string; onChange?(e?: string): void } & TextFieldProps &
  TextFieldHTMLProps) => {
  const [value, setValue] = useState<string>();

  const handleOnBlur = (e: any) => {
    onChange?.(value);
  };
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <TextField
      value={value}
      onChange={(e: any) => {
        setValue(e.target?.value);
      }}
      onBlur={handleOnBlur}
      {...props}
    />
  );
};
