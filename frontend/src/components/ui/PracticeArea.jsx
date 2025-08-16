import { toast } from "sonner";
import {
  Progress,
  Badge,
  TextArea,
  Button,
  Flex,
  Spinner,
} from "@radix-ui/themes";
import {
  useMutation,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { PracticeContext } from "../../context/PracticeContext";
import ConfettiExplosion from "react-confetti-explosion";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const queryClient = new QueryClient();
export function PracticeArea() {
  return (
    <QueryClientProvider client={queryClient}>
      <GeneratePracticeArea />
    </QueryClientProvider>
  );
}

const GeneratePracticeArea = () => {
  const { selectedDifficulty, words, isShuffle, setWords } =
    useContext(PracticeContext);
  const [wordIndex, setWordIndex] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isShuffled, setIsShuffled] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [AIAnswer, setAIAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (words.length) return;
    try {
      const wordsOnReload = localStorage.getItem("user") || "[]";
      const parseWords = wordsOnReload ? JSON.parse(wordsOnReload) : [];
      if (Array.isArray(parseWords)) {
        setWords(parseWords);
      }
    } catch {
      setWords([]);
    }
  }, [words.length, setWords]);

  const currentWord = words[wordIndex];

  // console.log(currentWord.word);

  // function handleSubmit() {
  //   setSubmitLoading(true);
  //   setTimeout(() => {
  //     setShowAnswer(answer);
  //     setIsSubmit(true);
  //     setAnswer("");
  //     setSubmitLoading(false);
  //   }, 1000);
  // }

  function handleNext() {
    setWordIndex((prev) => prev + 1);
    setIsSubmit(false);
    setAIAnswer("");
    setUserAnswer("");
  }

  function handleFinish() {
    setIsFinish(true);
    setTimeout(() => {
      setShowConfetti(true);
    }, 500);
  }

  const { mutate: generateFeedback } = useMutation({
    mutationFn: async (sentence) => {
      const response = await fetch(
        "https://vocab.nandayavanets.workers.dev/api/gemini",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // the structure below has to be the same as defined in openrouter
            messages: [
              {
                role: "user",
                content: `Peran & Gaya
Kamu adalah pelatih grammar bahasa Inggris yang ramah untuk penutur bahasa Indonesia. Jelaskan dengan bahasa sederhana, ringkas (≤ 90 kata), tanpa menggurui, dan selalu sebutkan konsep grammar yang relevan secara singkat. Sertakan 1 analogi pendek untuk memudahkan pemahaman. Semua penjelasan wajib dalam Bahasa Indonesia.

Tugas
Evaluasi input pengguna ${sentence} (bisa kalimat atau frasa—jangan memaksa jadi kalimat jika frasa sudah benar secara fungsi).

Aturan Keputusan

Jika sudah benar (grammar, kejelasan, dan koheren):

Kembalikan apa adanya.

Beri alasan singkat kenapa sudah pas (sebut konsep: mis. subject–verb agreement, article, preposition, tense, dll).

Opsional: beri catatan register/nuansa (formal/harian) bila relevan.

Jika perlu perbaikan (awkward/redundan/kurang jelas/salah grammar):

Beri Versi Koreksi tunggal yang paling natural.

Jelaskan singkat & mudah: apa yang dibetulkan + nama konsep.

Tambahkan analogi 1 baris untuk konsepnya.

Jika makna ambigu, tawarkan maks 2 opsi (A/B) dan jelaskan kapan dipakai (1 frasa per opsi).

Jika sudah benar tapi bisa lebih natural:

Tampilkan “Lebih natural” sebagai alternatif, lalu alasan singkat (fluency/conciseness).

Gaya Bahasa

Hindari jargon teknis yang berat.

Tanpa orang pertama (“saya/aku”).

Maks 3 poin atau ≤ 2 kalimat di bagian penjelasan.

Format Keluaran (tetap)

Hasil:

Apa adanya: [kalau sudah benar] atau

Koreksi: [kalau ada perbaikan]

Lebih natural (opsional): [jika relevan]

Penjelasan singkat: [2 kalimat atau ≤3 poin, sebut konsep grammar]

Teori & Analogi: [1–2 baris; konsep + analogi micro]

Opsi (jika ambigu): A: … | B: … (+ kapan dipakai)

Contoh tag konsep yang boleh dipakai: subject–verb agreement, article (a/an/the), word choice/collocation, preposition of time/place, tense (Simple Present/Past/Perfect), parallelism, pronoun reference, modifier order.

Contoh nada analogi (pola, bukan isi tetap):
“Pakai the seperti menunjuk barang yang sudah ‘disepakati’; kayak bilang ‘itu yang tadi’.”
              `,
              },
            ],
          }),
        }
      );

      const reader = response.body?.getReader();
      if (!reader) {
        console.error("No reader found on response");
        throw new Error("No response body");
      }
      const decoder = new TextDecoder();
      let buffer = "";
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let lineEnd;
        while ((lineEnd = buffer.indexOf("\n")) !== -1) {
          const line = buffer.slice(0, lineEnd).trim();
          buffer = buffer.slice(lineEnd + 1);

          if (line.startsWith("data: ")) {
            const json = line.slice(6);
            if (json === "[DONE]") break;

            try {
              const parsed = JSON.parse(json);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                result += content;
                // below is called batching in react
                setAIAnswer((prev) => prev + content);
              }
            } catch (err) {
              console.warn("Failed to parse chunk:", err);
            }
          }
        }
      }

      return result;
    },
    onMutate: () => {
      setSubmitLoading(true);
      setIsSubmit(true);
    },
    onSuccess: () => {
      setSubmitLoading(false);
      // get words taken right from local instead of using words from context
      const getData = JSON.parse(localStorage.getItem("user") || "[]");
      const updateIsPractice = getData.map((word) => {
        if (word.word === currentWord.word) {
          return {
            ...word,
            is_practiced: true,
          };
        } else {
          return word;
        }
      });

      localStorage.setItem("user", JSON.stringify(updateIsPractice));
      setWords(updateIsPractice);
      toast.success("Feedback sucessfully generated!");
    },
    onError: (err) => {
      toast.error("Failed fetching:", err);
      console.log("Failed to fetch definition");
    },
  });

  const isAnswerEmpty = userAnswer.trim().length === 0;
  const canSubmit = !isSubmit && !submitLoading && !isAnswerEmpty;
  const canNext = isSubmit && !submitLoading && wordIndex < words.length - 1;

  // if now words are found in the difficulty return error so that users wont proceed to the practice area

  return (
    <div className="ps-5 pe-5">
      <div className="mt-5">
        <div className="flex justify-between">
          <p className="font-medium">
            Question {wordIndex + 1} of {words.length}
          </p>
          <p>Practice Session</p>
        </div>
        <div className="py-2">
          <Progress
            value={((wordIndex + 1) / words.length) * 100}
            color="crimson"
          />
        </div>
      </div>

      <div className="border-1 rounded-md p-5 mt-5">
        {/* {selectedDifficulty.includes("Beginner") ? (
          // filter if users click difficulty beginner, it will show beginner only label
          words.filter((word) => word.difficulty === "Beginner").map((item, index) => (
            <div key={index}>
              <div className="flex justify-start gap-8 items-center">
                <h2 className="text-3xl font-bold">{item.word}</h2>
                <Badge size="2">{item.difficulty}</Badge>
              </div>
              <div className="py-3">
                <p className="italic">{item.definition}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-start gap-8 items-center">
            <h2 className="text-3xl font-bold">
              this is supposed to be like this
            </h2>
            <Badge size="2">Easy</Badge>
          </div>
        )} */}

        {isShuffle ? (
          currentWord ? (
            <div>
              <div className="flex justify-start gap-8 items-center">
                <h2 className="text-3xl font-bold">{currentWord.word}</h2>
                <Badge size="2">{currentWord.difficulty}</Badge>
              </div>
              <div className="py-3">
                <p className="italic">{currentWord.definition}</p>
              </div>
            </div>
          ) : null
        ) : (
          <div>
            <div className="flex justify-start gap-8 items-center">
              <h2 className="text-3xl font-bold">{currentWord.word}</h2>
              <Badge size="2">{currentWord.difficulty}</Badge>
            </div>
            <div className="py-3">
              <p className="italic">{currentWord.definition}</p>
            </div>
          </div>
        )}

        <hr className="mb-8" />

        <div>
          <h3 className="pb-3 font-medium">
            Write a sentence using "{currentWord.word}"
          </h3>
          <div className="pb-2">
            <TextArea
              placeholder="Write your sentence here..."
              resize="vertical"
              size="2"
              onChange={(e) => setUserAnswer(e.target.value)}
              value={userAnswer}
              disabled={isSubmit}
            />
          </div>
        </div>
        <Flex justify="end" gap="3">
          {submitLoading ? (
            <Spinner />
          ) : (
            <Button
              onClick={() => {
                const text = userAnswer.trim();
                if (!text) {
                  toast.error("Please enter a sentence!");
                  return;
                }
                generateFeedback(text);
              }}
              // onClick={() => setIsSubmit(!isSubmit)}
              disabled={!canSubmit}
            >
              Submit
            </Button>
          )}
          {/* if issubmit is true and wordindex is less than the contained words, show button */}
          {canNext && (
            <div>
              <Button onClick={() => handleNext()}>Next</Button>
            </div>
          )}

          {isSubmit && !submitLoading && wordIndex === words.length - 1 && (
            <div>
              <Button
                onClick={() => {
                  handleFinish();
                  toast.info("You will be redirected to your analytics page!")
                  setTimeout(() => {
                    navigate("/dashboard/analytics");
                    localStorage.removeItem("practice_words")
                  }, 5000);
                }}
              >
                Finish
              </Button>
            </div>
          )}
        </Flex>
      </div>

      {showConfetti && (
        <div className="absolute top-0 left-0 w-screen h-screen pointer-events-none items-center z-50 flex justify-center">
          <ConfettiExplosion
            width={800}
            particleCount={250}
            force={0.8}
            height={window.innerHeight}
          />
        </div>
      )}

      {AIAnswer && (
        <div className="my-5">
          <div>
            <h3>Feedback</h3>
            <p>{AIAnswer}</p>
          </div>
        </div>
      )}
    </div>
  );
};
