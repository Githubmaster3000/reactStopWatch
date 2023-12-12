import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);

  const interval = useRef();

  const startTimer = () => {
    if (!interval.current) {
      // if interval.current does not exist
      interval.current = setInterval(() => {
        setSecond((stateVariable) => {
          // state variable is second in this case
          let newValue = stateVariable + 1;
          return newValue;
        });
      }, 1000); // 1000ms = 1s
    }
  };

  useEffect(() => {
    if (second === 60) {
      setSecond(0);
      setMinute((minute) => minute + 1);
    }
  }, [second]);

  useEffect(() => {
    if (minute === 60) {
      setMinute(0);
      setHour((hour) => hour + 1);
    }
  }, [minute]);

  const stopTimer = () => {
    clearInterval(interval.current);
    interval.current = null;
  };


  const resetTimer = () => {
    stopTimer();
    setSecond(0);
    setMinute(0);
    setHour(0);
  };

  const renderTime = (time) => {
    let timeStr = String(time);
    if (timeStr.length === 1) return "0" + timeStr;
    else return timeStr;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          {renderTime(hour)}:{renderTime(minute)}:{renderTime(second)}
        </h1>
        <div>
          <button onClick={stopTimer}>Pause</button>
          <button onClick={startTimer}>Start</button>
          <button onClick={resetTimer}>Reset</button>
        </div>
        <img src={logo} className="App-logo" alt="logo" />

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
