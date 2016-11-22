// Actions
const CHANGE_SLIDE  = 'kitchen/goods/CHANGE_SLIDE';
const UPDATE_FILTER = 'kitchen/goods/UPDATE_FILTER';
const TOGGLE = 'kitchen/goods/TOGGLE';

// Action Creators
export function changeSlide(payload) {
  return { type: CHANGE_SLIDE, ...payload };
}

export function updateFilter(payload) {
  return { type: UPDATE_FILTER, ...payload };
}

export function toggle(payload) {
  return { type: TOGGLE, ...payload };
}

const initialState = {
  hood: {
    selected: 0,
    filter: '',
    data: ["foo 1", "foo 2", "foo 3", "foo 22", "foo 33"],
    enabled: true,
  },
  hob: {
    selected: 0,
    filter: '',
    data: ["bar 1", "bar 2", "bar 3", "bar 222", "bar 32"],
    enabled: true,
  },
  oven: {
    selected: 0,
    filter: '',
    data: ["buzz 1", "buzz 2", "buzz 3", "buzz 22", "buzz 222", "buzz 23", "buzz 323"],
    enabled: true,
  },
  dishwasher: {
    selected: 0,
    filter: '',
    data: ["kokoko 1", "kokoko 2", "kokoko 3", "kokoko 22", "kokoko 33"],
    enabled: false,
  },
  fridge: {
    selected: 0,
    filter: '',
    data: ["nasnas 1", "nasnas 2", "nasnas 3", "nasnas 22", "nasnas 33"],
    enabled: false,
  },
}

// Reducer
const goodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SLIDE:
      return {
        ...state,
        [action.category]: {
          ...state[action.category],
          selected: action.index
        }
      };
    case UPDATE_FILTER:
      return {
        ...state,
        [action.category]: {
          ...state[action.category],
          filter: action.value
        }
      }
    case TOGGLE:
      return {
        ...state,
        [action.category]: {
          ...state[action.category],
          enabled: !state[action.category].enabled
        }
      }
    default:
      return state;
  }
};

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  goodsReducer
});

export default rootReducer;
