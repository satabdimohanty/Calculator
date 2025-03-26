import React, { useState } from "react";
import styles from "./Calculator.module.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    if (value === "=") {
      try {
        if (input.trim()) {
          const output = new Function(`return ${input}`)();
          setResult(output.toString());
        } else {
          setResult("0");
        }
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttonValues = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+"
  ];

  return (
    <div className={styles.calculator}>
      <div className={styles.display}>
        <input type="text" value={input} readOnly placeholder="0" />
        <div className={`${styles.result} ${result === "Error" ? styles.error : ""}`}>
          {result || "0"}
        </div>
      </div>

      <div className={styles.buttons}>
        {buttonValues.map((btn) => (
          <button
            key={btn}
            onClick={() => handleClick(btn)}
            className={btn === "=" ? styles.equals : ""}
          >
            {btn}
          </button>
        ))}
        <button className={styles.clear} onClick={() => handleClick("C")}>
          C
        </button>
      </div>
    </div>
  );
};

export default Calculator;
