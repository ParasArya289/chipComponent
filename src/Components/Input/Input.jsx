import { useMemo, useRef, useState } from "react";
import { Pill } from "../Pill/Pill";
import { UserList } from "../SuggestionBox/UserList";
import "./Input.css";

export const Input = ({ data, placeholder }) => {
  const [selectedUserArray, setSelectedUserArray] = useState([]);
  const [usersArray, setUsersArray] = useState(data);
  const [backSpaceCount, setBackSpaceCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [suggestionBoxVisible, setSuggestionBoxVisible] = useState(false);

  const inputRef = useRef(null);
  const blurTimeoutRef = useRef(null);

  const handleInput = (e) => {
    setInputValue(e.target.innerText.trim());
  };

  // filter user and sort data to closest match
  const filteredData = useMemo(() => {
    return usersArray
      .filter(({ name }) => name?.toLowerCase().includes(inputValue))
      ?.sort((a, b) => {
        const valueA = a?.name.indexOf(inputValue);
        const valueB = b?.name.indexOf(inputValue);
        return valueB - valueA;
      });
  }, [inputValue, usersArray]);

  // handle keydown event
  const handleKey = (e) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        break;
      case "Backspace":
        if (!inputValue.length && selectedUserArray.length) {
          if (backSpaceCount === 0) {
            setBackSpaceCount(1);
          } else {
            deleteLastUser();
            setBackSpaceCount(0);
          }
        }
        break;
      default:
        setBackSpaceCount(0);
        break;
    }
  };

  //add and delete users handlers
  const selectUser = (user) => {
    setSelectedUserArray((prev) => [...prev, user]);
    removeUserFromSuggestion(user?.id);
    setInputValue("");
    inputRef.current.innerText = "";
  };

  const deleteLastUser = () => {
    const lastUser = selectedUserArray.at(-1);
    addUserToSuggestion(lastUser);

    setSelectedUserArray((prev) =>
      prev.filter((_, i) => i !== prev.length - 1)
    );
  };

  const deleteUser = (id) => {
    const user = selectedUserArray.find((user) => user.id === id);
    addUserToSuggestion(user);
    setSelectedUserArray((prev) => prev.filter((user) => id !== user.id));
  };

  const removeUserFromSuggestion = (id) => {
    setUsersArray((prev) => prev.filter((user) => id !== user.id));
  };
  const addUserToSuggestion = (user) => {
    setUsersArray((prev) => [...prev, user]);
  };

  //input and suggestion box blur and focus handlers

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setBackSpaceCount(0);
    }
  };

  const handleInputFocus = () => {
    setSuggestionBoxVisible(true);
    clearTimeout(blurTimeoutRef.current);
  };
  const handleInputBlur = () => {
    blurTimeoutRef.current = setTimeout(() => {
      setSuggestionBoxVisible(false);
    }, 200);
  };

  const handleSuggestionBoxFocus = () => {
    clearTimeout(blurTimeoutRef.current);
  };

  return (
    <div className="custom_input" onClick={focusInput}>
      {selectedUserArray.map((user, i) => (
        <Pill
          key={user.id}
          backSpaceCount={backSpaceCount}
          selectedUserArray={selectedUserArray}
          user={user}
          deleteUser={deleteUser}
          index={i}
        />
      ))}
      <span className="wrapper">
        <span
          ref={inputRef}
          contentEditable
          className="input"
          role="textbox"
          placeholder={placeholder}
          onInput={handleInput}
          onKeyDown={handleKey}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {suggestionBoxVisible && (
          <div
            className="suggestion_box"
            onFocus={handleSuggestionBoxFocus}
            onBlur={handleInputBlur}
          >
            <UserList users={filteredData} selectUser={selectUser} />
          </div>
        )}
      </span>
    </div>
  );
};
