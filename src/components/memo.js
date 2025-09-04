import React, { useState } from "react";

const Child = React.memo(({ value }) => {
  console.log("Child render");
  return <p>Child value: {value}</p>;
});

function MemoDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  return (
    <div>
      <h2>React.memo Demo</h2>
      <button onClick={() => setCount(count + 1)}>Increment: {count}</button>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something"
      />
      <Child value={text} />
    </div>
  );
}

export default MemoDemo;
