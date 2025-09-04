import { useState, useRef } from "react";

function ControlledForm() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Controlled value: " + name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Controlled Form</h2>
      <input
        type="text"
        value={name} // React controls value
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

function UncontrolledForm() {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Uncontrolled value: " + inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Uncontrolled Form</h2>
      <input type="text" ref={inputRef} placeholder="Enter your name" />
      <button type="submit">Submit</button>
    </form>
  );
}

function FormDemo() {
  return (
    <div>
      <h1>Controlled vs Uncontrolled Demo</h1>
      <ControlledForm />
      <UncontrolledForm />
    </div>
  );
}

export default FormDemo;
