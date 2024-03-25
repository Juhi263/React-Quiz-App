import React, { Component } from "react";
import Question from "./components/question";
import qBank from "./components/questionbank";
import Score from "./components/score";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionBank: qBank,
            currentQuestion: 0,
            selectedOptions: new Array(qBank.length).fill(""),
            score: 0,
            quizEnd: false,
            theme: "light",
        };
    }

    toggleTheme = () => {
        this.setState((prevState) => ({
            theme: prevState.theme === "light" ? "dark" : "light",
        }));
    };

    handleOptionChange = (e) => {
        const { currentQuestion, selectedOptions } = this.state;
        const newOptions = [...selectedOptions];
        newOptions[currentQuestion] = e.target.value;
        this.setState({ selectedOptions: newOptions });
    };

    handleFormSubmit = (e) => {
      e.preventDefault();
      this.checkAnswer();
      this.setState((prevState) => ({
          selectedOptions: [
              ...prevState.selectedOptions,
              prevState.selectedOption
          ]
      }));
      this.handleNextQuestion();
  };
  
    checkAnswer = () => {
        const { questionBank, currentQuestion, selectedOptions, score } = this.state;
        if (selectedOptions[currentQuestion] === questionBank[currentQuestion].answer) {
            this.setState((prevState) => ({ score: prevState.score + 1 }));
        }
    };

    handleNextQuestion = () => {
      const { questionBank, currentQuestion } = this.state;
      if (currentQuestion + 1 < questionBank.length) {
          this.setState((prevState) => ({
              currentQuestion: prevState.currentQuestion + 1,
              selectedOption: "",
          }));
      } else {
          this.setState({
              quizEnd: true,
          });
      }
  };
  

  render() {
    console.log('questionBank:', this.state.questionBank);
    console.log('selectedOptions:', this.state.selectedOptions);

    const { questionBank, currentQuestion, selectedOptions, score, quizEnd, theme } = this.state;
    const themeClass = theme === "light" ? "light-theme" : "dark-theme";

    return (
        <div className={`App ${themeClass}`}>
            <h1 className="app-title">QUIZ APP</h1>
            <div className="quiz-container">
                {!quizEnd ? (
                    questionBank && questionBank.length > 0 && currentQuestion < questionBank.length ? (
                        <Question
                            question={questionBank[currentQuestion]}
                            selectedOption={selectedOptions[currentQuestion]}
                            onOptionChange={this.handleOptionChange}
                            onSubmit={this.handleFormSubmit}
                        />
                    ) : (
                        <div>No more questions.</div>
                    )
                ) : (
                    <Score
                        score={score}
                        const correctAnswers = {selectedOptions.filter((option, index) => {
                          if (questionBank && questionBank[index] && questionBank[index].answer) {
                              return option === questionBank[index].answer;
                          }
                          return false;
                      }).length}
                      
                      
                        totalQuestions={questionBank.length}
                        questionBank={questionBank}
                        selectedOptions={selectedOptions}
                    />
                )}
            </div>
            <div className="theme-toggle">
                <span className="left-text">Left</span>
                <label className="switch">
                    <input type="checkbox" onChange={this.toggleTheme} />
                    <span className="slider round"></span>
                </label>
                <span className="right-text">Right</span>
            </div>
        </div>
    );
}



}

export default App;
