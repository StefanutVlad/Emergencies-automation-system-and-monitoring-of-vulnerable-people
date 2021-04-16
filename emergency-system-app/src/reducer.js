export const initialState = {
  Name: null,
  BPM: null,
  Temperature: null,
  Latitude: null,
  Longitude: null,
  Fall: null,
};

//listening on the data layer to react to actions 
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return{
                ...state,
                Name: action.Name,
            }
            default:
                return state;
    }
};

export default reducer;