import "./App.css";
import { useState } from "react";
import { kebabCaseToTitleCase } from "./helpers.js";

function App() {
  const [disabled, setDisabled] = useState(false);
  const [buttonColor, setButtonColor] = useState("medium-violet-red");

  const nextColorClass =
    buttonColor === "medium-violet-red" ? "midnight-blue" : "medium-violet-red";
  const nextColorTitleCase = kebabCaseToTitleCase(nextColorClass);
  const className = disabled ? "gray" : buttonColor;

  return (
    <div>
      <button
        className={className}
        onClick={() => setButtonColor(nextColorClass)}
        disabled={disabled}
      >
        Change to {nextColorTitleCase}
      </button>
      <br />
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={false}
        onChange={(e) => setDisabled(e.target.checked)}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
