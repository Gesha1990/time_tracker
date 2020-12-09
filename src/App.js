import React, { useState } from "react";
import TimeTracker from "./components/TimeTracker/index";
import { connect } from "react-redux";
import { addTimeTrackerAC } from "./redux/timeTrackerReducer";
import moment from "moment";
//Styles
import "./App.scss";
import play_icon from "./assets/play_circle.svg";

function App({ time_trackers, addTimeTrackerAC }) {
  debugger;
  const [timeTrackerName, setTimeTrackerName] = useState("");
  return (
    <div className="App">
      <h1>tracker</h1>
      <div className="time-tracker-wrapper">
        <input
          type="text"
          onChange={(e) => {
            setTimeTrackerName(e.target.value);
          }}
          value={timeTrackerName}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTimeTrackerAC({
                id: Date.now(),
                name:
                  timeTrackerName.length > 0
                    ? timeTrackerName
                    : `No name tracker #${time_trackers.length + 1}`,
                startTime: new Date().getTime(),
              });
              setTimeTrackerName("");
            }
          }}
        />
        <div className="time-tracker-wrapper__btn">
          <img
            src={play_icon}
            alt="play"
            onClick={() => {
              addTimeTrackerAC({
                id: Date.now(),
                name:
                  timeTrackerName.length > 0
                    ? timeTrackerName
                    : `No name tracker #${time_trackers.length + 1}`,
                startTime: new Date().getTime(),
              });
              setTimeTrackerName("");
            }}
          />
        </div>
      </div>
      <div className="timer-list">
        {time_trackers.map((el, key) => {
          return (
            <TimeTracker
              key={el.id}
              id={el.id}
              startTime={el.startTime}
              name={el.name}
            />
          );
        })}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    time_trackers: state.timeTrackerPage.time_trackers,
  };
};

export default connect(mapStateToProps, {
  addTimeTrackerAC,
})(App);
