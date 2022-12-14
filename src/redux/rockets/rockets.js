const GET_ROCKETS = 'space-travelers-hub/rockets/GET_ROCKETS';
const GET_ROCKETS_SUCCESS = 'space-travelers-hub/rockets/GET_ROCKETS_SUCCESS';
const RESERVE_ROCKET = 'space-travelers-hub/rockets/RESERVE_ROCKET';

const URL = 'https://api.spacexdata.com/v3/rockets';
const initialState = { rockets: [] };

const getRockets = () => async (dispatch) => {
  dispatch({ type: GET_ROCKETS });
  const response = await fetch(URL);
  const data = await response.json();
  return dispatch({ type: GET_ROCKETS_SUCCESS, data });
};

const renderRockets = (data) => {
  const rocketsArr = data.map((rocket) => ({
    id: rocket.id,
    flickr_images: rocket.flickr_images[0],
    description: rocket.description,
    rocket_name: rocket.rocket_name,
    reserved: false,
  }));
  return rocketsArr;
};

const reserveRocket = (payload) => ({
  type: RESERVE_ROCKET,
  payload,
});

const rocketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROCKETS:
      return { ...state, loading: true };

    case GET_ROCKETS_SUCCESS:
      renderRockets(action.data);
      return { ...state, loading: false, rockets: renderRockets(action.data) };

    case RESERVE_ROCKET:
      return {
        ...state,
        rockets: state.rockets.map((rocket) => {
          if (rocket.id !== action.payload) {
            return rocket;
          }
          return { ...rocket, reserved: !rocket.reserved };
        }),
      };

    default:
      return state;
  }
};

export { rocketsReducer, getRockets, reserveRocket };
