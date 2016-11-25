import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as rootActions from './rootReducer';
import { createSelector } from 'reselect'

import App from './App';

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

const getPrice = (items, index, enabled) => {
  return items.length > 0 && enabled ? parseInt(items[index].price[0], 10) : 0
}

const {goodsSelectors, pricesSelectors} = ['hood', 'hob', 'oven', 'dishwasher', 'fridge'].reduce((acc, category) => {
    const offersSelector = (state) => state.goods[category].data
    const filterSelector = (state) => state.goods[category].filter

    const currentIndexSelector = (state) => state.goods[category].selected
    const enabledSelector = (state) => state.goods[category].enabled

    const colorFilterSelector = (state) =>  state.color.selectedColor.length > 0
      ? state.color.types[state.color.selectedColor].query
      : ''

    const filteredByParamItemsSelector = createSelector([offersSelector, filterSelector], itemFilter)
    const filteredByColorItemsSelector = createSelector([filteredByParamItemsSelector, colorFilterSelector], colorFilter)
    const priceSelector = createSelector([filteredByColorItemsSelector, currentIndexSelector, enabledSelector], getPrice)

    acc.goodsSelectors[category] = filteredByColorItemsSelector;
    acc.pricesSelectors.push(priceSelector);
    return acc
  },{goodsSelectors: {}, pricesSelectors: []})


const totalPriceSelector = createSelector([...pricesSelectors], (...prices) =>
  {
    return prices.reduce((a,b) => a+b,0)
  })



function mapStateToProps(state, props) {
  return {
    modal: state.modal,
    goods: state.goods,
    color: state.color,
    filteredGoods: {
      hood: goodsSelectors.hood(state),
      hob: goodsSelectors.hob(state),
      oven: goodsSelectors.oven(state),
      dishwasher: goodsSelectors.dishwasher(state),
      fridge: goodsSelectors.fridge(state),
    },
    totalPrice: totalPriceSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(rootActions, dispatch)
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

export default Container;
