import { useState } from "react";
import styles from "./SwitchButton.module.css";
import { useAppData } from "../../context/appContext";

export default function SwitchButton() {
  const { user, theme } = useAppData();
  const [selectedOption, setSelectedOption] = useState(2);
  const option1 = selectedOption === 0 ? "\uD83C\uDF89 Party" : "Party";
  const option2 = selectedOption === 1 ? "\uD83C\uDFAE Matches" : "Matches";
  const option3 = selectedOption === 2 ? "\uD83C\uDFA5 Streams" : "Streams";
  const options = [option1, option2, option3];

  return (
    <div
      className={`${styles.mainContainer} ${styles[`mainContainer${theme}`]}`}
    >
      {user ? (
        <div
          className={`${styles.highlightSelection} ${
            styles[`position${selectedOption}`]
          } ${styles[`highlightSelection${theme}`]}`}
        />
      ): <p className = {`${styles.option} ${styles[`text${theme}`]}`}>Inicie sesión para habilitar todas las funciones</p>}
      {user &&
        options.map((option, index) => (
          <button
            key={index}
            className={`${styles.option} ${styles[`text${theme}`]} ${
              selectedOption === index &&
              (styles.selectedOption, styles[`highlightedText${theme}`])
            }`}
            onClick={() => setSelectedOption(index)}
          >
            {option}
          </button>
        ))}
    </div>
  );
}
