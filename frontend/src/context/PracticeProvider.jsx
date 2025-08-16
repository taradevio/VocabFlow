import { useState, useEffect } from "react";
import { PracticeContext } from "./PracticeContext";
import { supabase } from "../../auth/supabaseClient";

const PRACTICE_WORDS = "practice_words";
// export const usePractice = () => useContext(PracticeContext);
export const PracticeProvider = ({ children }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState([]);
  const [isShuffle, setIsShuffle] = useState(false);
  const [words, setWords] = useState(() => {
    try {
      const practiceWords = localStorage.getItem(PRACTICE_WORDS);
      return practiceWords ? JSON.parse(practiceWords) : [];
    } catch {
      return [];
    }
  });
  const [customNumber, setCustomNumber] = useState(0);
  const [fiveNumber, setFiveNumber] = useState(0);
  const [tenNumber, setTenNumber] = useState(0);
  const [fifteenNumber, setFifteenNumber] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    localStorage.setItem(PRACTICE_WORDS, JSON.stringify(words));
  }, [words]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLogin(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLogin(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <PracticeContext.Provider
      value={{
        selectedDifficulty,
        setSelectedDifficulty,
        isShuffle,
        setIsShuffle,
        words,
        setWords,
        customNumber,
        setCustomNumber,
        fiveNumber,
        setFiveNumber,
        tenNumber,
        setTenNumber,
        fifteenNumber,
        setFifteenNumber,
        isLogin,
        setIsLogin,
        session,
        setSession,
      }}
    >
      {children}
    </PracticeContext.Provider>
  );
};
