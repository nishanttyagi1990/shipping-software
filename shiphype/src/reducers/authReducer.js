import {
  CUSTOME_PACKAGING_FETCH,
  CUSTOME_PROMOTIONAL_FETCH,
} from "../constants";

const initialState = {
  customepackaging: null,
  promotionalinsert: null,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case CUSTOME_PACKAGING_FETCH:
      return {
        ...state,
        customepackaging: action.data,
      };
    case CUSTOME_PROMOTIONAL_FETCH:
      return {
        ...state,
        promotionalinsert: action.data,
      };

    default:
      return state;
  }
};
