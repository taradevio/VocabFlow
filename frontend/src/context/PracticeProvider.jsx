import { useState } from "react";
import { PracticeContext } from "./PracticeContext";
// export const usePractice = () => useContext(PracticeContext);
export const PracticeProvider = ({ children }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState([]);
  const [isShuffle, setIsShuffle] = useState(false);
  const [words, setWords] = useState([]);
  

  return (
    <PracticeContext.Provider
      value={{ selectedDifficulty, setSelectedDifficulty, isShuffle, setIsShuffle, words, setWords }}
    >
      {children}
    </PracticeContext.Provider>
  );
};
