import React, { Component } from "react";
import { toWylie } from "wylie";
import randomWord from "./randomWord";

export default class App extends Component {
  constructor(props) {
    super(props);

    const [tibetan, meaning] = randomWord();
    const wylie = toWylie(tibetan).trim();

    this.state = {
      tibetan,
      wylie,
      meaning,
      hint: false,
      userAnswer: "",
      counter: 0,
    };
  }

  handleChange = (e) => {
    const userAnswer = e.target.value;
    this.setState({ userAnswer });

    if (userAnswer === this.state.wylie) {
      const [tibetan, meaning] = randomWord();
      const wylie = toWylie(tibetan).trim();

      this.setState({
        tibetan,
        wylie,
        meaning,
        hint: false,
        userAnswer: "",
        counter: this.state.counter + 1,
      });
    }
  };

  render() {
    const { tibetan, wylie, meaning, hint, userAnswer, counter } = this.state;

    return (
      <React.Fragment>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-lg-7 text-center main-panel">
            <p lang="bo" className="display-1 my-3">
              {tibetan}
            </p>
            <p>{meaning}</p>
            <p className="margin-y-1">
              <input
                type="text"
                className="form-control bg-dark text-light text-center"
                onChange={this.handleChange}
                value={userAnswer}
              />
            </p>
          </div>
        </div>
        <div className="left-panel my-2 pt-2 mx-3">
          <p>Count: {counter}</p>
        </div>
        <div className="right-panel my-2 mx-3">
          <input
            type="button"
            className="btn btn-secondary round"
            value="❔"
            onClick={() => this.setState({ hint: !hint })}
          />
          <p className={hint ? "my-2" : "my-2 invisible"}>{wylie}</p>
        </div>
      </React.Fragment>
    );
  }
}
