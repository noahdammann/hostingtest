import React from "react";
import './Question.css'

export default function Question(props) {

    const buttonElements = props.isSubmitted ? 
    props.possibleAnswers.map(item => {
        return <button className={item === props.correctAnswer ? "correct answer--button" : item === props.userAnswer ? "incorrect answer--button" : "answer--button"} key={item} dangerouslySetInnerHTML={{__html: item}}></button>
    }):
    props.possibleAnswers.map(item => {
        return <button className={item === props.userAnswer ? "selected answer--button" : "answer--button"} onClick={props.selectAnswer} key={item} dangerouslySetInnerHTML={{__html: item}}></button>
    })

    return (
        <div className="question--container">
            <h2 className="question--text" dangerouslySetInnerHTML={{__html: props.question}}></h2>
            <div className="buttons--row">
                {buttonElements}
            </div>
            <hr />
        </div>
    )
}