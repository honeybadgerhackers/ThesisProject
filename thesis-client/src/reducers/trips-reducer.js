// import trips from './trips-list.json';

// export default () => trips;
export default function (state = { trips: [], loading: false }, action) {
  // console.log(action.type);
  switch (action.type) {
    case 'GET_TRIPS':
      return { ...state, loading: true };
    case 'GET_TRIPS_SUCCESS':
      // console.log(action.payload);
      return { trips: action.payload, loading: false };
    default:
      return state;
  }
} 
