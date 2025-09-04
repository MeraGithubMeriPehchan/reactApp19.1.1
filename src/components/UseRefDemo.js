import { useRef, useState } from "react";

function UseRefDemo() {
  const inputRef = useRef(null); // DOM reference
  const countRef = useRef(0);    // Mutable value (not tied to DOM)
  const [count, setCount] = useState(0);

  const focusInput = () => {
    inputRef.current.focus(); // access DOM directly
  };

  const increment = () => {
    countRef.current += 1; // update ref
    console.log("Ref count:", countRef.current);
    setCount(count + 1); // update state
  };

  return (
    <div>
      <h1>useRef Demo</h1>
      <input ref={inputRef} placeholder="Click button to focus me" />
      <button onClick={focusInput}>Focus Input</button>

      <h2>State Count: {count}</h2>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default UseRefDemo;
