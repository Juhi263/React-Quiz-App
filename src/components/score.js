import React, { Component } from 'react';
import '../App.css'

class Score extends Component {
    render() {
        const { score, correctAnswers, totalQuestions, questionBank, selectedOptions } = this.props;

        console.log("questionBank:", questionBank);
        console.log("selectedOptions:", selectedOptions);

        return (
            <div>
                <h2>Results</h2>
                <h4>Your score: {score} / {totalQuestions}</h4>
                <h3>Questions and Answers:</h3>
                <ul>
                    {questionBank.map((question, index) => (
                        <li key={index}>
                            {question.question}
                            <br />
                            Correct Answer: {question.answer}
                            <br />
                            Your Answer: {selectedOptions && selectedOptions[index] !== undefined ? selectedOptions[index] : "No answer submitted"}
                            <br />
                            <br />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Score;
