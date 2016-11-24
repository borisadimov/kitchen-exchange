
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


import data from './data.xml';
const offers = data.yml_catalog.shop[0].offers[0].offer;

let initialState = {
  hood: {
    id: "79732",
    name: "Вытяжки",
    selected: 0,
    filters: {
      'Встраиваемая, 60 см': 'Встраиваемая 60 см',
      'Встраиваемая, 90 см': 'Встраиваемая 90 см',
      'Пристенная, 50 см': 'Подвесная 50 см',
      'Пристенная, 60 см': 'Подвесная 60 см',
      'Подвесная, 70 см': 'Подвесная 70 см',
      'Подвесная, 80 см': 'Подвесная 80 см',
    },
    filter: '',
    data: [],
    enabled: true,

  },
  hob: {
    id: "79735",
    selected: 0,
    filters: {
      'электрическая': '⚡ Электрическая',
      'газовая': '🔥 Газовая',
    },
    filter: '',
    data: [],
    enabled: true,
  },
  oven: {
    id: "79736",
    selected: 0,
    filters: {
      'electic': 'Электрический',
      'gas': 'Газовый',
    },
    filter: '',
    data: [],
    enabled: true,
  },
  dishwasher: {
    id: "79737",
    selected: 0,
    filters: {
      'sm': '45см',
      'bg': '60см',
    },
    filter: '',
    data: [],
    enabled: false,
  },
  fridge: {
    id: "79734",
    selected: 0,
    filters: {
      'sm': 'Высота 120 см',
      'md': 'Высота 140 см',
      'bg': 'Высота 160 см',
    },
    filter: '',
    data: [],
    enabled: false,
  },
}

offers.forEach((offer) => {
  switch (offer.categoryId[0]){
    case "79732": initialState.hood.data.push(offer); break;
    case "79735": initialState.hob.data.push(offer); break;
    case "79736": initialState.oven.data.push(offer); break;
    case "79737": initialState.dishwasher.data.push(offer); break;
    case "79734": initialState.fridge.data.push(offer); break;
    default: return false;
  }
})

// Reducer
const goods = (state = initialState, action) => {
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

const UPDATE_COLOR = 'kitchen/goods/UPDATE_COLOR';
export function updateColor(payload) {
  return { type: UPDATE_COLOR, ...payload };
}

const color = (state = {
  types: {
    black: {
      alias: 'Черная',
      query: 'черн',
    },
    silver: {
      alias:  'Серебристая',
      query: 'серебр',
    },
    white: {
      alias:  'Белая',
      query: 'бел',
    },
    cream: {
      alias:  'Кремовая',
      query: 'крем',
    },
  },
  selectedColor: ''
}, action) => {
  switch (action.type) {
    case UPDATE_COLOR:
      return {
        ...state,
        selectedColor: action.color
      }
    default:
      return state;
  }
}

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  color,
  goods
});

export default rootReducer;
