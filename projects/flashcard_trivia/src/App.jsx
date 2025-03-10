import { useState } from "react";
import "./index.css";

const flashcards = [
  { question: "What “S” Microsoft laptop is a hybrid tablet/computer, first announced in 2012? Its name implies that it is the top layer of your computer needs.", answer: "Microsoft Surface" },
  { question: "What popular operating system, launched in 1991, also has its own mascot, Tux the penguin?", answer: "Linux" },
  { question: "It sounds like a circus performer from Taos and allows you to download PDFs with the greatest of ease. I'm talking about what A-word family of software?", answer: "Adobe Acrobat" },
  { question: "What computer and printer giant was founded in 1939 in Palo, Alto, CA? It is sometimes better known by the two-letter acronym based on its founders' names.", answer: "Hewlett-Packard"},
  { question: "When a password is limited strictly to numeric characters, the secret is often referred to as a PIN. What does that acronym stand for?", answer: "Personal Identification Number"},
  { question: "What website was co-founded by computer scientist Larry Page in 1998 under the name BackRub?", answer: "Google"},
  { question: "What is the computer term coined by Lou Montulli that refers to information sent from the browser to the web server?", answer: "Cookie"},
  { question: "Which device debuted in 2007 with the slogan 'This is only the beginning?'", answer: "iPhone"},
];

export default function FlashcardApp() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setFlipped(false);
  };

  const handleBack = () => {
    setIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    setFlipped(false);
  };

  return (
    <div className="contents">
      <h1 className="title">Tech Trivia Flashcards</h1>
      <h4 className="subtitle">Caught up on the tech world? Test your knowledge here!</h4>
      <p className="subtitle">Number of cards: 8</p>

      <div className="flip-card" onClick={() => setFlipped(!flipped)}>
      <div className="flip-card-inner" style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
        <div className="flip-card-front">
          <p>{flashcards[index].question}</p>
        </div>
        <div className="flip-card-back">
          <p>{flashcards[index].answer}</p>
        </div>
      </div>
    </div>

    <div className="button-container">
        <button className="navigate" onClick={handleBack}>Back</button>
        <button className="navigate" onClick={handleNext}>Next</button>
    </div>
  </div>
  );
}
