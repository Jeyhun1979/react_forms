import { useState } from "react";

export default function HexToRgb() {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    setInput(hex);

    if (hex.length < 7) {
      setResult('');
      setError(false);
      return;
    }

    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);

      const rgb = `rgb(${r}, ${g}, ${b})`;

      setResult(rgb);
      setError(false);
      document.body.style.backgroundColor = hex;
    } else {
      setResult('');
      setError(true);
    }
  };

  return (
    <label className="container">
      <input
        type="text"
        className="input-field"
        placeholder="Your code..."
        value={input}
        onChange={handleChange}
      />
      <span className={`result ${error ? 'error' : ''}`}>
        {error ? 'Ошибка!' : result}
      </span>
    </label>
  );
}