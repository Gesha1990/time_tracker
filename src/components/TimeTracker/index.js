import React, { useState, useEffect } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { addTimeTrackerAC } from "../../redux/timeTrackerReducer";
import { deleteTimeTrackerAC } from "../../redux/timeTrackerReducer";
//Styles
import "./style.scss";
import pause_icon from "../../assets/pause_circle.svg";
import play_icon from "../../assets/play.svg";
import delete_icon from "../../assets/delete.svg";

const TimeTracker = ({ id, startTime, deleteTimeTrackerAC, name }) => {
  const endTime = new Date().getTime();
  const [time, addTime] = useState(endTime - startTime);
  const [intervalId, setIntervalId] = useState(null);
  const [isStoppedTimeTracker, stopTimeTracker] = useState(false);
  const displayTime = () => {
    // Find a real time calculating difference between start time and cycle creating end time
    const endTime = new Date().getTime();
    let realTime = endTime - startTime;
    addTime(realTime);
  };

  useEffect(() => {
    if (isStoppedTimeTracker) {
      clearInterval(intervalId);
    } else {
      const intervalID = setInterval(displayTime, 1000);
      setIntervalId(intervalID);
    }
    return () => {
        clearInterval(intervalId);
    }
  }, [isStoppedTimeTracker]);

  return (
    <div className={`time-tracker ${!isStoppedTimeTracker && 'active'}`}>
      <div className="time-tracker__name">{name}</div>
      <div className="additional-wrapper">
        <div className="time-tracker__time">
          {moment()
            .hour(0)
            .minute(0)
            .second(0)
            .milliseconds(time)
            .format("HH : mm : ss")}
        </div>
        <div className="time-tracker__icons">
          {isStoppedTimeTracker ? (
            <img
              src={play_icon}
              alt="pause_icon"
              onClick={() => {
                stopTimeTracker(false);
              }}
            />
          ) : (
            <img
              src={pause_icon}
              alt="pause_icon"
              onClick={() => {
                stopTimeTracker(true);
              }}
            />
          )}
          <img src={delete_icon} alt="delete_icon" onClick={()=>{
              deleteTimeTrackerAC(id)
          }} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    time_trackers: state.timeTrackerPage.time_trackers,
  };
};

export default connect(mapStateToProps, {
  addTimeTrackerAC,
  deleteTimeTrackerAC
})(TimeTracker);
