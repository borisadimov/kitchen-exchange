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

import hood from './assets/images/checkbox_icon1.svg';
import dishwasher from './assets/images/dishwasher.svg';
import hob from './assets/images/hob.svg';
import oven from './assets/images/oven.svg';
import fridge from './assets/images/fridge.svg';

let initialState = {
  hood: {
    id: "79732",
    name: "Вытяжки",
    selected: 0,
    image: hood,
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
    name: "Варочные панели",
    selected: 0,
    image: hob,
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
    image: oven,
    name: "Духовые шкафы",
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
    name: "Посудомоечные машины",
    selected: 0,
    image: dishwasher,
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
    name: "Микроволновки",
    selected: 0,
    image: fridge,
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
      let prevColor = state.selectedColor,
          curColor =  action.color;
      
      return prevColor === curColor ? {...state, selectedColor: ''} : {...state, selectedColor: action.color}

    default:
      return state;
  }
}

const SHOW_MODAL = 'kitchen/goods/SHOW_MODAL';
const HIDE_MODAL = 'kitchen/goods/HIDE_MODAL';

export function showModal(payload) {
  return { type: SHOW_MODAL, ...payload };
}

export function hideModal() {
  return { type: HIDE_MODAL};
}

const modal = (state = {
  show: false,
  content: {}
}, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        show: true,
        content: action.content
      }
    case HIDE_MODAL:
      return {
        show: false,
        content: {}
      }
    default:
      return state;
  }
}

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  modal,
  color,
  goods
});

export default rootReducer;
