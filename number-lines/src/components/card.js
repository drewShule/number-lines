import { React, useState } from "react";
import Confetti from "react-confetti";
//import CurveArrow from "../icons/curve-arrow";

const randomNumberInRange = (min, max) => {
  // get number between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default function Card() {
  // keep track of random number to count to
  const [num, nextNum] = useState(randomNumberInRange(1, 100));
  // array that shows number lines being added -> start from 0 or ""
  const [numArray, addNumArray] = useState([]);
  // answer is the total added by user
  const [answer, addAnswer] = useState(0);
  // shows correct or not when user clicks
  const [notCorrect, correct] = useState("");
  // Keep track of amount correct
  const [amtCorrect, addAmtCorrect] = useState(0);
  // keep Track of amount of number segments
  const [numberSegments, addNumberSegments] = useState(0);
  // Confetti State...
  const [confetti, setConfetti] = useState(false);
  const [onShow, setOnShow] = useState(false);
  let lineTracker = 0;

  const getLeastLinesUsed = (number) => {
    let getLeast = number;

    while (getLeast >= 10) {
      lineTracker += (getLeast / 10) | 0;

      getLeast = getLeast % 10;
    }
    while (getLeast >= 5) {
      lineTracker += (getLeast / 5) | 0;

      getLeast = getLeast % 5;
    }
    while (getLeast >= 1) {
      lineTracker += (getLeast / 1) | 0;

      getLeast = getLeast % 1;
    }

    return lineTracker | 0;
  };

  const onAddClick = (number) => {
    // Add number segment to answer by number segment
    setOnShow(true);
    addAnswer(answer + number);

    if (number === 1) {
      setTimeout(function () {
        addNumArray((prevNum) => [...prevNum, `|-1-|`]);
      }, 100);
    } else if (number === 5) {
      setTimeout(function () {
        addNumArray((prevNum) => [...prevNum, `|---5---|`]);
      }, 100);
    } else {
      setTimeout(function () {
        addNumArray((prevNum) => [...prevNum, `|-----10-----|`]);
      }, 100);
    }

    // Add to # of segments used
    addNumberSegments(numberSegments + 1);
  };

  /*   const onMinusClick = (number) => {
    // Add number segment to answer by number segment
    setOnShow(true);
    addAnswer(answer - number);

    if (number === 1) {
      setTimeout(function () {
        addNumArray((prevNum) => [...(prevNum -= "|--1--|")]);
      }, 100);
    } else if (number === 5) {
      setTimeout(function () {
        addNumArray((prevNum) => [...(prevNum -= "----|"), `|`]);
      }, 100);
    } else {
      setTimeout(function () {
        addNumArray((prevNum) => [...prevNum, `-------|`]);
      }, 100);
    }

    // Add to # of segments used
    addNumberSegments(numberSegments + 1);
  }; */

  const tryBetter = () => {
    addAnswer(0);
    addNumArray([]);
    addNumberSegments(0);
    correct(
      `You got it in ${numberSegments} Lines! Can you do it in ${lineTracker}?`
    );
  };

  const checkCorrect = (number, answer) => {
    getLeastLinesUsed(num);
    // If correct set confetti to true, correct to Correct and Increase amount correct
    if (answer === number && numberSegments === lineTracker) {
      setConfetti(true);
      setTimeout(function () {
        setOnShow(false);
        correct("");
        addAmtCorrect(amtCorrect + 1);
      }, 1000);

      // call reset once done
      reset();
    } else if (answer === number && numberSegments !== lineTracker) {
      tryBetter();
    } else if (answer !== number) {
      correct("Not Correct!");
    }
  };

  const reset = () => {
    setTimeout(function () {
      nextNum(randomNumberInRange(1, 100));
      addAnswer(0);
      addNumArray([]);
      addNumberSegments(0);
      setConfetti(false);
      notCorrect("");
      setOnShow(false);
    }, 1000);
  };

  const onUndoClick = () => {
    setTimeout(function () {
      addNumberSegments(0);
      setOnShow(false);
      addAnswer(0);
      addNumArray((prevNum) => [...(prevNum = "")]);
    }, 1000);
  };

  return (
    <div>
      <Confetti className={confetti ? "" : "hidden"} />
      <div className="card">
        <div className="card-body">
          <h4 className="equals">
            Does <span className="USER">{answer}</span> ={" "}
            <span className="GOAL">{num}</span>?
          </h4>
          <span className={onShow ? "" : "hidden"}>
            {numArray} = {answer}
          </span>
          <br />
          <span className="number-line">{numberSegments} Lines Used</span>
          <hr />
          {/* {getLeastLinesUsed(num)} */}
          <div className="Body">
            <p className="card-title">
              Try to Reach <span className="GOAL">{num}</span> by adding with
              the buttons below. Do it in the least amount of Lines to move on!
            </p>
            <hr />
            <span className="ButtonGroup">
              <button
                className="btn btn-primary m-2"
                onClick={() => onAddClick(1)}
              >
                +1
              </button>
              <button
                className="btn btn-primary m-2"
                onClick={() => onAddClick(5)}
              >
                +5
              </button>
              <button
                className="btn btn-primary m-2"
                onClick={() => onAddClick(10)}
              >
                +10
              </button>
            </span>
            <hr />
            {/*             <span className="ButtonGroup">
              <button
                className="btn btn-primary"
                onClick={() => onMinusClick(1)}
              >
                -1
              </button>
              <button
                className="btn btn-primary"
                onClick={() => onMinusClick(5)}
              >
                -5
              </button>
              <button
                className="btn btn-primary"
                onClick={() => onMinusClick(10)}
              >
                -10
              </button>
              <span className={!confetti ? "" : "hidden"}>{notCorrect}</span>
            </span> */}
            <button
              className="btn btn-success m-1"
              onClick={() => checkCorrect(num, answer)}
            >
              Check
            </button>
            <button
              className="btn btn-success m-1"
              onClick={() => onUndoClick()}
            >
              Clear
            </button>
            <hr />
            <span className={!confetti ? "" : "hidden"}>{notCorrect}</span>
          </div>
        </div>
        <div className="CorrectAnswers ml-3">
          <h4>{amtCorrect} Correct Answers!</h4>
        </div>
      </div>
      <div class="container">
        <footer class="py-5">
          <div class="row">
            <div class="col-6 col-md-2 mb-3">
              <h5>Section</h5>
              <ul class="nav flex-column">
                <li class="nav-item mb-2">Home</li>
                <li class="nav-item mb-2">Features</li>
                <li class="nav-item mb-2">Pricing</li>
                <li>About</li>
              </ul>
            </div>

            <div class="col-md-5 offset-md-1 mb-3">
              <form>
                <h5>Subscribe to our newsletter</h5>
                <p>Monthly digest of what's new and exciting from us.</p>
                <div class="d-flex flex-column flex-sm-row w-100 gap-2">
                  <label for="newsletter1" class="visually-hidden">
                    Email address
                  </label>
                  <input
                    id="newsletter1"
                    type="text"
                    class="form-control"
                    placeholder="Email address"
                  ></input>
                  <button class="btn btn-primary" type="button">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

/*       <div className="ButtonGroup">
        <button className="btn btn-primary" onClick={() => onMinusClick(1)}>
          -1
        </button>
        <button className="btn btn-primary" onClick={() => onMinusClick(5)}>
          -5
        </button>
        <button className="btn btn-primary" onClick={() => onMinusClick(10)}>
          -10
        </button>
      </div> */
//const { width, height } = useWindowSize();
/*   const onMinusClick = (number) => {
    addAnswer(answer - number);
    if (number === 1) {
      addNumArray((prevNum) => [...prevNum, `|--1--|`]);
    } else if (number === 5) {
      addNumArray((prevNum) => [...prevNum, `|----5----|`]);
    } else {
      addNumArray((prevNum) => [...prevNum, `|------10------|`]);
    }

    //checkCorrect(number, addAnswer);
  }; */
