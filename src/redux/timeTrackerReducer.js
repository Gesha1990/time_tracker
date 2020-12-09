const ADD_TIME_TRACKER = "ADD-TIME-TRACKER";
const DELETE_TIME_TRACKER = "DELETE-TIME-TRACKER";

let initialState = {
  time_trackers: [],
};

const timeTrackerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TIME_TRACKER: {
      return {
        time_trackers: [
          ...state.time_trackers,
          {
            id: action.time_tracker.id,
            startTime: action.time_tracker.startTime,
            name: action.time_tracker.name
          },
        ],
      };
    }
    case DELETE_TIME_TRACKER: {
      return {
        time_trackers: state.time_trackers.filter((time_tracker) => time_tracker.id !== action.time_tracker_id),
      };
    }
    default:
      return state;
  }
};
export const addTimeTrackerAC = (time_tracker) => ({
  type: ADD_TIME_TRACKER,
  time_tracker,
});
export const deleteTimeTrackerAC = (time_tracker_id) => ({
  type: DELETE_TIME_TRACKER,
  time_tracker_id,
});

export default timeTrackerReducer;
