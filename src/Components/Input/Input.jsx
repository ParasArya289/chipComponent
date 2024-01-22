import { useMemo, useRef, useState } from "react";
import { Pill } from "../Pill/Pill";
import { UserList } from "../SuggestionBox/UserList";
import "./Input.css";
import { useInputHook } from "./Input.hook";

export const Input = ({ data, placeholder }) => {
  const {
    inputRef,
    focusInput,
    handleInput,
    deleteUser,
    selectUser,
    handleKey,
    filteredData,
    selectedUserArray,
    backSpaceCount,
  } = useInputHook({ data });

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
        />
        <div className="suggestion_box">
          <UserList users={filteredData} selectUser={selectUser} />
        </div>
      </span>
    </div>
  );
};
