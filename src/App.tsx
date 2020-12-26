import React, { useState } from "react";
import Card from "@material/react-card";
import TextField, { HelperText, Input } from "@material/react-text-field";
import { Button } from "@material/react-button";
import MaterialIcon from "@material/react-material-icon";

import "@material/react-card/dist/card.css";
import "@material/react-button/dist/button.css";
import "@material/react-checkbox/dist/checkbox.css";
import "@material/react-icon-button/dist/icon-button.css";
import "@material/react-list/dist/list.css";
import "@material/react-material-icon/dist/material-icon.css";
import "@material/react-text-field/dist/text-field.css";
import "@material/react-material-icon/dist/material-icon.css";

import "src/App-style.scss";
import s from "src/styles.module.scss";

function App() {
  const [hiddenFields, setHiddenFields] = useState(true);
  const handleSubmit = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    const data = new FormData(e.target);

    console.log(data.getAll("cc"));
  };

  return (
    <div className="App">
      <header className="App-header">
        <Card className={s.card}>
          <form onSubmit={handleSubmit} className={s.form}>
            <TextField
              label="to"
              name="to"
              // helperText={<HelperText>Help Me!</HelperText>}
              onTrailingIconSelect={() => {
                setHiddenFields((prev) => !prev);
              }}
              trailingIcon={<MaterialIcon role="button" icon="add" />}
            >
              <Input />
            </TextField>
            {hiddenFields && (
              <TextField
                label="cc"
                // helperText={<HelperText>Help Me!</HelperText>}
              >
                <Input name="cc" value={["sdfsdf", "sdfsdf@sdf.cpm"]} />
              </TextField>
            )}
            <TextField
              label="subject"
              name="subject"
              // helperText={<HelperText>Help Me!</HelperText>}
            >
              <Input name="subject" value={"Make to work"} />
            </TextField>
            <Button type="submit">Submit</Button>
          </form>
        </Card>
      </header>
    </div>
  );
}

export default App;
