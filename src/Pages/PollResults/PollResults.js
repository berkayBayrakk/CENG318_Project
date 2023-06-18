import React from 'react';
import "./PollResults.css"
const PollResults = ({ questions, answers }) => {
  const calculatePercentages = (questionIndex) => {
    const answerCounts = {};
    answers.forEach((answer) => {
      const userAnswer = answer.answers[questionIndex];
      answerCounts[userAnswer] = (answerCounts[userAnswer] || 0) + 1;
    });
    const totalCount = answers.length;
    return Object.keys(answerCounts).map((answer) => ({
      answer,
      percentage: (answerCounts[answer] / totalCount) * 100,
    }));
  };

  return (
    <div className="poll-results-container">
      <h1>
        Results
      </h1>
      {questions.map((question, index) => (
        <div key={index} className="result-question-container">
          <h2>{question.title}</h2>
          <div className="percentage-bars-container">
            {calculatePercentages(index).map((result, idx) => (
              <div key={idx} className="percentage-bar">
                <span>{`${result.answer} ${result.percentage.toFixed(2)}%`}</span>

                <div
                  className="fill"
                  style={{ width: `${result.percentage}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PollResults;
