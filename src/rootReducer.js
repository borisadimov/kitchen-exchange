// Actions
const CHANGE_SLIDE  = 'kitchen/goods/CHANGE_SLIDE';
const UPDATE_FILTER = 'kitchen/goods/UPDATE_FILTER';

// Action Creators
export function changeSlide(payload) {
  return { type: CHANGE_SLIDE, ...payload };
}

export function updateFilter(payload) {
  return { type: UPDATE_FILTER, ...payload };
}

const initialState = {
  data: [
    ["foo 1", "foo 2", "foo 3", "foo 22", "foo 33"],
    ["bar 1", "bar 2", "bar 3", "bar 222", "bar 32"],
    ["buzz 1", "buzz 2", "buzz 3", "buzz 22", "buzz 222", "buzz 23", "buzz 323"]
  ],
  slides: [ 0, 0, 0],
  filters: ['','','']
}

// Reducer
const goodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SLIDE:
      return {
        ...state,
        slides: state.slides.map((e, i) => (i!==action.slider) ? e : action.index)
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filters: state.filters.map((e, i) => (i!==action.filter) ? e : action.value)
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
