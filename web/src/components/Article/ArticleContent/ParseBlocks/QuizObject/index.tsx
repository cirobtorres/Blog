"use client";

import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

const QuizObjects = ({ block }: { block: Quiz }) => {
  const [checked, setChecked] = useState<[number, boolean] | []>([]); // Option is clicked (selected) but not yet confirmed with a button click
  const [selected, setSelected] = useState<boolean>(false); // Option is confirmed
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // If the correct option was chosen
  const [choosedWrong, setChoosedWrong] = useState<number | null>(null); // Index of the correct option
  const chars = ["A", "B", "C", "D"];

  const handleSelect = () => {
    if (checked.length > 0) {
      setSelected(true);
      setIsCorrect(checked[1] || null);
      const indexOfCorrectOption = block.opts
        .map((opt) => opt.alt[1])
        .indexOf(true);
      setChoosedWrong(indexOfCorrectOption);

      const quizKey = `quiz-${block.key}`;
      sessionStorage.setItem(`${quizKey}-checked`, JSON.stringify(checked));
      sessionStorage.setItem(`${quizKey}-selected`, JSON.stringify(true));
      sessionStorage.setItem(
        `${quizKey}-isCorrect`,
        JSON.stringify(checked[1] || null)
      );
      sessionStorage.setItem(
        `${quizKey}-indexOfCorrectOption`,
        JSON.stringify(indexOfCorrectOption)
      );
    }
  };

  useEffect(() => {
    const quizKey = `quiz-${block.key}`;
    const sessionChecked = sessionStorage.getItem(`${quizKey}-checked`);
    const sessionSelected = sessionStorage.getItem(`${quizKey}-selected`);
    const sessionIsCorrect = sessionStorage.getItem(`${quizKey}-isCorrect`);
    const sessionIndexOfCorrectOption = sessionStorage.getItem(
      `${quizKey}-indexOfCorrectOption`
    );

    if (
      sessionChecked &&
      sessionSelected &&
      sessionIsCorrect &&
      sessionIndexOfCorrectOption
    ) {
      setChecked(JSON.parse(sessionChecked));
      setSelected(JSON.parse(sessionSelected));
      setIsCorrect(JSON.parse(sessionIsCorrect));
      setChoosedWrong(JSON.parse(sessionIndexOfCorrectOption));
    }
  }, [block.key]);

  return (
    <div className="flex flex-col items-center gap-8 border border-blog-border rounded-3xl p-8 bg-blog-background-2 shadow-lg mb-10">
      <p className="">{block.quiz}</p>
      <ul className="w-full grid grid-cols-1 gap-1">
        {block.opts.map((opt, index: number) => (
          <li key={index}>
            <button
              onClick={() => setChecked([index, opt.alt[1]])}
              className={`w-full flex items-center gap-4 px-3 py-2 text-sm border transition-all duration-500 bg-blog-background-2 group${
                !selected && " hover:bg-blog-background-1"
              }`}
              disabled={selected}
              style={{
                borderColor:
                  selected && isCorrect && checked[0] === index // Correctly chosen
                    ? "var(--blog-border-green)"
                    : selected && !isCorrect && checked[0] === index // Wrongly chosen
                    ? "var(--blog-border-red)"
                    : selected && !isCorrect && choosedWrong === index // Wrongly chosen (highlight correct option)
                    ? "var(--blog-border-green)"
                    : !selected && checked[0] === index // Highlight borders before confirm
                    ? "var(--blog-foreground-highlight)"
                    : "var(--blog-border)",
                backgroundColor:
                  selected && isCorrect && checked[0] === index
                    ? "var(--blog-green)"
                    : selected && !isCorrect && checked[0] === index
                    ? "#450a0a"
                    : choosedWrong === index
                    ? "var(--blog-green)"
                    : checked[0] === index
                    ? "var(--blog-background-1)"
                    : "",
              }}
            >
              <p className="flex items-center justify-center shrink-0 rounded-full size-8 font-extrabold text-blog-foreground-readable-hover bg-blog-foreground-highlight">
                {chars[index]}
              </p>
              <p
                className="truncate transition-all duration-500 group-hover:text-blog-foreground-readable-hover"
                style={{
                  color:
                    checked[0] === index
                      ? "var(--blog-foreground-readable-hover)"
                      : "",
                }}
              >
                {opt.alt[0]}
              </p>
            </button>
          </li>
        ))}
      </ul>
      <button
        className="w-[205px] flex items-center gap-2 border px-8 py-[9px] transition-all duration-500 bg-blog-background-2 hover:bg-blog-background-1 group"
        onClick={handleSelect}
        disabled={selected}
        style={{
          borderColor: selected
            ? isCorrect
              ? "var(--blog-border-green)"
              : "var(--blog-border-red)"
            : "var(--blog-border)",
          backgroundColor: selected
            ? isCorrect
              ? "var(--blog-green)"
              : "#450a0a"
            : "",
        }}
      >
        {!selected ? (
          <p className="w-full transition-all duration-500 text-sm group-hover:text-blog-foreground-readable-hover">
            Responder
          </p>
        ) : isCorrect ? (
          <>
            <FaCheck className="text-green-500" />
            <p className="text-sm text-blog-foreground-readable-hover">
              Resposta correta!
            </p>
          </>
        ) : (
          <>
            <FaCheck className="text-red-500" />
            <p className="text-sm text-blog-foreground-readable-hover">
              Resposta errada
            </p>
          </>
        )}
      </button>
    </div>
  );
};

export default QuizObjects;
