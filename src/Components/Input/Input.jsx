import { useRef, useState } from "react";
import "./Input.css";

export const Input = () => {
  const [textArray, setTextArray] = useState([]);
  const [backSpaceCount, setBackSpaceCount] = useState(0);
  const inputRef = useRef(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setBackSpaceCount(0);
    }
  };

  const handleKey = (e) => {
    if (inputRef.current) {
      const textValue = inputRef?.current.innerText;
      if (e.key === "Enter") {
        if (textValue) {
          e.preventDefault();
          setTextArray((prev) => [...prev, textValue]);
          inputRef.current.innerText = "";
        }
      }
      if (e.key !== "Backspace") {
        setBackSpaceCount(0);
      }
      if (!textValue.length && textArray.length && e.key === "Backspace") {
        switch (backSpaceCount) {
          case 0:
            setBackSpaceCount(1);
            break;
          case 1:
            setBackSpaceCount(2);
            deletItem();
        }
        console.log(backSpaceCount);
      }
    }
  };
  const deletItem = () => {
    console.log("i ran");
    setTextArray((prev) => prev.filter((_, i) => i !== prev.length - 1));
    setBackSpaceCount(0);
  };
  //   console.log(inputRef?.current?.innerText, textArray);
  return (
    <div className="custom_input" onClick={focusInput}>
      {textArray.map((t, i) => (
        <span
          className={`pill ${
            backSpaceCount === 1 && i === textArray.length - 1
              ? " highlight"
              : ""
          }`}
        >
          {/* <img /> */}
          {t}
        </span>
      ))}
      <span className="wrapper">
        <span
          ref={inputRef}
          contentEditable
          className="input"
          role="textbox"
          value={"value"}
          onKeyDown={handleKey}
        />
        <div className="suggestion_box"></div>
      </span>
    </div>
  );
};
