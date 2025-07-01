'use client';
import { useState } from 'react';
export default function CounterPage() {
  const [count, setCount] = useState(0);
  return (
    <main>
      <h1>Counter Page</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </main>
  );
}
