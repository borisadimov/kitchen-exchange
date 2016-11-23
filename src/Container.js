import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as rootActions from './rootReducer';
import { createSelector } from 'reselect'

import App from './App'


const itemFilter = (items, filter) =>
  items.filter(item => filter.length === 0 ? true :
    filter.split(',').reduce((counter, word) => {
      return counter +
        (item.param
        .reduce((acc, value) => acc+' '+value['_'], '').toLowerCase()
        .indexOf(word.toLowerCase()) > -1
        ? 1
        : 0)
      }
    , 0) === filter.split(',').length
  )


function createSelectorsForCategories(state) {
  return Object.keys(state.goodsReducer).reduce((acc, category) => {
    const offersSelector = (state) => state.goodsReducer[category].data
    const filterSelector = (state) => state.goodsReducer[category].filter
    acc[category] = createSelector([offersSelector, filterSelector], itemFilter)(state)
    return acc
  },{})
}

function mapStateToProps(state, props) {
  window.state = state;
  return {
    goods: state.goodsReducer,
    filteredGoods: createSelectorsForCategories(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(rootActions, dispatch)
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

export default Container
