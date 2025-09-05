import { useState } from "react";

function AutoBatchingDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  function handleClick() {
    setCount(c => c + 1);
    setText("Clicked");
    // ✅ React 17: 1 render
    // ✅ React 18: 1 render (same behavior inside event)
  }

  function handleAsync() {
    setTimeout(() => {
      setCount(c => c + 1);
      setText("From timeout");
      // ❌ React 17: 2 renders
      // ✅ React 18: 1 render
    }, 1000);
  }

  return (
    <div>
        <h1>render automatic batching</h1>
      <button onClick={handleClick}>Click (event)</button>
      <button onClick={handleAsync}>Click (async)</button>
      <p>Count: {count}</p>
      <p>Text: {text}</p>
    </div>
  );
}

export default AutoBatchingDemo;
