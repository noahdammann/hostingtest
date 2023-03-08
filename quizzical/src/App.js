import React from 'react';
import './App.css';
import Question from './Question'
import img from './images/monkey.png'
import img2 from './images/turtle.png'
import { nanoid } from 'nanoid'

function App() {

    const [questions, setQuestions] = React.useState([])
    const [allQuestions, setAllQuestions] = React.useState([])
    const [submitted, setSubmitted] = React.useState({
        isSubmitted: false,
        score: 0
    })

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=50&category=27&type=multiple")
            .then(res => res.json())
            .then(data => {
                setAllQuestions(data.results)
            })
    }, [])

    function startQuiz() {
        setQuestions(allQuestions.sort(() => 0.5 - Math.random()).slice(0, 5))
        setQuestions(prevQuestions => prevQuestions.map(item => {
            return {...item, id: nanoid(), userAnswer:"", randomOrder:[item.correct_answer, ...item.incorrect_answers].sort(() => 0.5 - Math.random())}
        }))
    }

    function selectAnswer(event, question) {
        setQuestions(prevQuestions => prevQuestions.map(item => {
            return question === item.question ? {...item, userAnswer: event.target.innerHTML} : item
        }))
    }

    function submitQuiz() {
        setSubmitted(prevSubmitted => {
            if (prevSubmitted.isSubmitted) {
                startQuiz()
                return {
                    isSubmitted: false,
                    score: 0
                };
            } else {
                return {
                    isSubmitted: true,
                    score: questions.filter(item => item.correct_answer === item.userAnswer).length
                };
            }
        })

        let correctQuestions = questions.filter(item => {
            return item.correct_answer === item.userAnswer
        })

        console.log(correctQuestions)
    }

    console.log(questions)

    let questionElements = questions.map(item => {
        return <Question 
            key={item.id}
            question={item.question}
            possibleAnswers={item.randomOrder}
            isSubmitted={submitted.isSubmitted}
            selectAnswer={(event) => selectAnswer(event, item.question)}
            userAnswer={item.userAnswer}
            correctAnswer={item.correct_answer}
        />
    })

    return (
        <main>

            <img className="monkey--image" src={img} alt="Monkey decoration" />
            <img className="turtle--image" src={img2} alt="Turtle decoration" />

            { questions.length === 0 ?

            <div className="start--page">
                <h1 className="start--title">Quizzical</h1>
                <p className="start--description">How well do you know your animals?</p>
                <button className="start--button" onClick={startQuiz}>Start Quiz</button>
            </div>

            :

            <div className="questions--page">
                {questionElements}
                {submitted.isSubmitted && <p className="quiz--score">You got {submitted.score}/5 correct answers</p>}
                <button className="check--answers--button" onClick={submitQuiz}>{ submitted.isSubmitted ? "Play Again" : "Check Answers" }</button>
            </div>

            }

        </main>
    )
}

export default App;
