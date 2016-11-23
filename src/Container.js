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

const colorFilter = (items, filter) =>
  items.filter(item => filter.length === 0 ? true :
    filter.split(',').reduce((counter, word) => {
      return counter +
        (item.param
        .reduce((acc, value) => acc+' '+value['_'], '').toLowerCase()
        .indexOf(word.toLowerCase()) > -1
        ? 1
        : 0)
      }
    , 0) > 0
  )


function createSelectorsForCategories(state) {
  return Object.keys(state.goods).reduce((acc, category) => {
    const offersSelector = (state) => state.goods[category].data
    const filterSelector = (state) => state.goods[category].filter

    const colorFilterSelector = (state) =>  state.color.selectedColor.length > 0
      ? state.color.types[state.color.selectedColor].query
      : ''

    const filteredItemsSelector = createSelector([offersSelector, filterSelector], itemFilter)
    acc[category] = createSelector([filteredItemsSelector, colorFilterSelector], colorFilter)(state)
    return acc
  },{})
}

function mapStateToProps(state, props) {
  window.state = state;
  return {
    goods: state.goods,
    color: state.color,
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
