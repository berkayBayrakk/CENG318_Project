import React, { useState } from "react";
import "./CreatePoll.css";
import { Navbar } from "../../Components/Navbar";

const CreatePoll = () => {
  const [pollName, setPollName] = useState("");
  const [questions, setQuestions] = useState([""]);
  const [answers, setAnswers] = useState([["", ""]]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const addQuestion = () => {
    setQuestions([...questions, ""]);
    setAnswers([...answers, ["", ""]]);
  };

  const removeQuestion = (index) =>
    setQuestions(questions.filter((_, i) => i !== index));

  const setAnswersForSelectedQuestion = (newAnswers) => {
    const updatedAnswers = [...answers];
    updatedAnswers[selectedQuestionIndex] = newAnswers;
    setAnswers(updatedAnswers);
  };

  const addAnswer = () => {
    const newAnswers = [...answers[selectedQuestionIndex], ""];
    setAnswersForSelectedQuestion(newAnswers);
  };

  const removeAnswer = (index) => {
    const newAnswers = answers[selectedQuestionIndex].filter(
      (_, ai) => ai !== index
    );
    setAnswersForSelectedQuestion(newAnswers);
  };

  return (
    <div className="create-poll-wrapper">
      <Navbar />
      <div className="container">
        <div className="questions-section">
          <input
            type="text"
            placeholder="Poll Name"
            value={pollName}
            onChange={(e) => setPollName(e.target.value)}
          />
          {questions.map((q, index) => (
            <div key={index} className="question-item">
              <input
                type="text"
                placeholder={`Question ${index + 1}`}
                value={q}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[index] = e.target.value;
                  setQuestions(newQuestions);
                }}
              />
              <button
                className={`select-question ${
                  selectedQuestionIndex === index ? "selected" : ""
                }`}
                onClick={() => setSelectedQuestionIndex(index)}
              >
                {index + 1}
              </button>
              {questions.length > 1 && (
                <button onClick={() => removeQuestion(index)}>🗑️</button>
              )}
            </div>
          ))}
          <button className="add-question" onClick={addQuestion}>
            +
          </button>
        </div>
        <div className="answers-section">
          <h2>{questions[selectedQuestionIndex]}</h2>
          {answers[selectedQuestionIndex] &&
            answers[selectedQuestionIndex].map((a, index) => (
              <div key={index} className="answer-item">
                <input
                  type="text"
                  placeholder={`Answer ${index + 1}`}
                  value={a}
                  onChange={(e) => {
                    const newAnswers = [...answers[selectedQuestionIndex]];
                    newAnswers[index] = e.target.value;
                    setAnswersForSelectedQuestion(newAnswers);
                  }}
                />
                {answers[selectedQuestionIndex].length > 2 && (
                  <button onClick={() => removeAnswer(index)}>🗑️</button>
                )}
              </div>
            ))}
          <button className="add-answer" onClick={addAnswer}>
            +
          </button>
        </div>
        <div className={`settings-section ${showSettings ? "expanded" : ""}`}>
          <button
            className="toggle-settings"
            onClick={() => setShowSettings(!showSettings)}
          >
            {showSettings ? "▶️" : "◀️"}
          </button>
          {showSettings && (
            <div>
              <div className="date-picker-row">
                <label>
                  Start Date:
                  <input
                    type="date"
                    value={startDate?.toISOString().substr(0, 10)}
                    onChange={(e) => setStartDate(new Date(e.target.value))}
                  />
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      e.target.checked && setStartDate(new Date())
                    }
                  />
                  Enable
                </label>
              </div>
              <div className="date-picker-row">
                <label>
                  End Date:
                  <input
                    type="date"
                    value={endDate?.toISOString().substr(0, 10)}
                    onChange={(e) => setEndDate(new Date(e.target.value))}
                  />
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => e.target.checked && setEndDate(new Date())}
                  />
                  Enable
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;