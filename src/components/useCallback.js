import React, { useState, useCallback } from "react";

// ✅ React.memo stops unnecessary re-renders if props don’t change
const Button = React.memo(({ onClick }) => {
  console.log("👉 Child Button rendered");
  return <button onClick={onClick}>Click Me</button>;
});

function CallbackDemo() {
  const [count, setCount] = useState(0);

  // ✅ Stable function reference
  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []);

  return (
    <div>
      <h2>useCallback + React.memo Example</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Button onClick={handleClick} />
    </div>
  );
}

export default CallbackDemo;
