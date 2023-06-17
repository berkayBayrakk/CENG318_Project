import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { getAnswersByPollId, getPollById, saveAnswer } from "../../firebase";
import { Navbar } from "../../Components/Navbar";
import "./PollPage.css"

export const PollPage = () => {

   const {pollID} = useParams();
   const[poll,setPoll]= useState();

   const [isSubmitted,setIsSubmitted]=useState(false);

   const [isEnded,setIsEnded]=useState(false);

    useEffect(()=>{
        const fetchPoll= async () => {
           return await getPollById(pollID)
          }
        fetchPoll().then((poll)=>{
            setPoll(poll);
            setAnswers(Array((poll?.questions?.length)).fill(''))
            getAnswersByPollId(pollID).then((array)=>{
                array.forEach(element => {
                    if(element.pollID==pollID && element.userID==navigator.userAgent) setIsSubmitted(true);
                });
                const date = new Date(poll.endDate.seconds * 1000);
                const currentDate = new Date();
                if(currentDate>date) {
                    setIsSubmitted(true)
                    setIsEnded(true);
                }
                
            })
        })
        
    },[])
  
    const [answers,setAnswers]=useState(Array((poll?.questions?.length)).fill(''));

    const handleSubmit=()=>{
        if(answers.some((answer)=>answer==='')) alert('You should fill all of questions');
        else{
           setIsSubmitted(true);
           const userAnswer={}
           userAnswer.answers=answers;
           userAnswer.pollID=pollID
           userAnswer.userID=navigator.userAgent;
           saveAnswer(userAnswer);
           
        }
    }
  
    if(isSubmitted){
        return(
            <div className="background-pic-poll">
                {isEnded?<h1>
                   Poll is out of date
                </h1>:<h1>
                    You have already submitted this poll
                </h1>}
            </div>
        )
    }
    else{
        return (
     
            <div className="background-pic-poll">
                 { (poll)?<h1>{poll.name}</h1>:null}
               { (poll)?<Questions questions={poll.questions} setUserAnswers={setAnswers}/> :null}
               <div>
                <button className="a" onClick={handleSubmit}>Submit</button>
               </div>
            </div>
        );
    }
    
  };


const Questions=(props)=>{
   
    return(
        props.questions.map((question,index)=>

        <div style={{border: '2px solid black', borderRadius:'30px' , marginBottom:5}}>
            <div>
                <h1>{question.title}</h1>
            </div>
            
            <div style={{display:'flex' , justifyContent:'center'}}>
                <Answers answers={question.answers} setUserAnswers={props.setUserAnswers} index={index}/>
            </div>
           
           
        </div>
    )
    
    )
}

const Answers=(props)=>{

    function onInputChange( value) {
        props.setUserAnswers((os) => {
          const temp = [...os];
          temp[props.index] = value;
          return temp;
        });
      }

    const [selectedAnswer,setSelectedAnswer]=useState();
    const [selectedAnswerIndex,setSelectedAnswerIndex]=useState();

    const handleClick=(answer,index)=>{
        setSelectedAnswer(answer);
        setSelectedAnswerIndex(index);
        onInputChange(answer);
    } 
    return(
   
        props.answers.map((answer,index)=>(
        <button className="a" style={(selectedAnswerIndex===index)?{color:'blue',marginLeft:15}:{marginLeft:15}} key={index} onClick={()=>handleClick(answer,index)}>{answer}</button>
    )
    )
    )
}