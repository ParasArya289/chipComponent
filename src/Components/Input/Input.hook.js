import { useMemo, useRef, useState } from "react";

export const useInputHook = ({ data }) => {
  const [selectedUserArray, setSelectedUserArray] = useState([]);
  const [usersArray, setUsersArray] = useState(data);
  const [backSpaceCount, setBackSpaceCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const handleInput = (e) => {
    setInputValue(e.target.innerText.trim().toLowerCase());
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

  //input focus handler

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setBackSpaceCount(0);
    }
  };
  return {
    inputRef,
    focusInput,
    handleInput,
    deleteUser,
    selectUser,
    handleKey,
    filteredData,
    selectedUserArray,
    backSpaceCount,
  };
};
