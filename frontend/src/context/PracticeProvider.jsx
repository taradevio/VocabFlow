import { useState } from "react";
import { PracticeContext } from "./PracticeContext";
// export const usePractice = () => useContext(PracticeContext);
export const PracticeProvider = ({ children }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState([]);
  const [isShuffle, setIsShuffle] = useState(false);
  const [words, setWords] = useState([]);
  const [customNumber, setCustomNumber] = useState(0);
  const [fiveNumber, setFiveNumber] = useState(0);
  const [tenNumber, setTenNumber] = useState(0);
  const [fifteenNumber, setFifteenNumber] = useState(0);
  

  return (
    <PracticeContext.Provider
      value={{ selectedDifficulty, setSelectedDifficulty, isShuffle, setIsShuffle, words, setWords, customNumber, setCustomNumber, fiveNumber, setFiveNumber, tenNumber, setTenNumber, fifteenNumber, setFifteenNumber }}
    >
      {children}
    </PracticeContext.Provider>
  );
};
