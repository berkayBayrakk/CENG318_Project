import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnswersByPollId, getPollById, saveAnswer } from "../../firebase";
import { Navbar } from "../../Components/Navbar";
import "./PollPage.css";
import PollResults from "../PollResults/PollResults";
import { DeviceUUID } from "device-uuid";
export const PollPage = () => {
  const { pollID } = useParams();
  const [poll, setPoll] = useState();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isEnded, setIsEnded] = useState(false);

  const [fetchedAnswers, setFetchedAnswers] = useState([]);

  useEffect(() => {
    const fetchPoll = async () => {
      return await getPollById(pollID);
    };
    fetchPoll().then((poll) => {
      setPoll(poll);
      setAnswers(Array(poll?.questions?.length).fill(""));
      getAnswersByPollId(pollID).then((array) => {
        setFetchedAnswers(array);

        // eslint-disable-next-line no-undef
        var uuid = new DeviceUUID().get();
        console.log(uuid);
        array.forEach((element) => {
          if (element.pollID == pollID && element.userID === uuid){
            setIsSubmitted(true);
            setIsEnded(true);
          }
            


        });
        const date = new Date(poll.endDate.seconds * 1000);
        const currentDate = new Date();
        if (currentDate > date) {
          setIsSubmitted(true);
          setIsEnded(true);
        }
      });
    });
  }, []);

  const [answers, setAnswers] = useState(
    Array(poll?.questions?.length).fill("")
  );

  const handleSubmit = () => {
    if (answers.some((answer) => answer === ""))
      alert("You should fill all of questions");
    else {
      getAnswersByPollId(pollID).then((array) => {
        setFetchedAnswers(array);
      });
      setIsSubmitted(true);
      const userAnswer = {};
      var uuid = new DeviceUUID().get();
      userAnswer.answers = answers;
      userAnswer.pollID = pollID;
      userAnswer.userID = uuid;
      saveAnswer(userAnswer);
      
    }
  };

  if (isSubmitted) {
    return (
      <div className="background-pic-poll">
          <PollResults questions={poll.questions} answers={fetchedAnswers} />
      </div>
    );
  } else {
    return (
      <div className="background-pic-poll">
        {isEnded ? (
          <PollResults questions={poll.questions} answers={fetchedAnswers} />
        ) : (
          <div className="poll-container">
            {poll ? <h1>{poll.name}</h1> : null}
            {poll ? (
              <Questions
                questions={poll.questions}
                setUserAnswers={setAnswers}
              />
            ) : null}
            <div className="submit-button">
              <button className="a" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
};

const Questions = (props) => {
  return props.questions.map((question, index) => (
    <div className="question-container" key={index}>
      <div>
        <h2>{question.title}</h2>
      </div>
      <div className="answers-container">
        <Answers
          answers={question.answers}
          setUserAnswers={props.setUserAnswers}
          index={index}
        />
      </div>
    </div>
  ));
};

const Answers = (props) => {
  function onInputChange(value) {
    props.setUserAnswers((os) => {
      const temp = [...os];
      temp[props.index] = value;
      return temp;
    });
  }

  const [selectedAnswer, setSelectedAnswer] = useState();
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState();

  const handleClick = (answer, index) => {
    setSelectedAnswer(answer);
    setSelectedAnswerIndex(index);
    onInputChange(answer);
  };
  return props.answers.map((answer, index) => (
    <button
      className="a"
      style={
        selectedAnswerIndex === index
          ? { color: "blue", marginLeft: 15 }
          : { marginLeft: 15 }
      }
      key={index}
      onClick={() => handleClick(answer, index)}
    >
      {answer}
    </button>
  ));
};
