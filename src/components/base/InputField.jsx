import React from "react";

const InputField = ({ onChange, value, type, name ,placeholder}) => {
  return (
    <>
 
      <input className="form-control" type={type} value={value} onChange={onChange} name={name} placeholder={placeholder}/>
      
    </>
  );
};

export default InputField;
