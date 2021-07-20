import React, { useState } from "react";
import "./ToDoList.css";

const useInputValue = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: e => setValue(e.target.value),
    resetValue: () => setValue("")
  };
};

export default ({onSubmit}) => {
  const {resetValue,...name } = useInputValue("");


  return (
    <form className="form-from-form"
        onSubmit={e => {
        e.preventDefault();
        onSubmit(name.value);
        resetValue();
      }}
    >
      <input {...name} 
      className="new-todos-place"
      placeholder="Task name"/>
    </form>
  );
};