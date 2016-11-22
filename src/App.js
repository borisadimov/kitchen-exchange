import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as rootActions from './rootReducer';

class App extends Component {


  toggleCategory = (category) => {
    const { actions } = this.props;

    actions.toggle({
      category: category
    })

  }

  handleFilterSelect = (event, category) => {
    const { actions } = this.props;

    actions.updateFilter({
      category: category,
      value: event.target.value
    })

    actions.changeSlide({
      category: category,
      index: 0
    })

  }

  handleSliderArrow = (category, dir) => {
    const { goods, actions } = this.props;

    let value = (dir === 'prev') ?
      goods[category].selected-1 : goods[category].selected+1

    actions.changeSlide({
      category: category,
      index: value
    })

  }

  render() {
    const { goods } = this.props;

    return (
      <div className="App">
        <div className="controls">
          {Object.keys(goods).map((category) => (
              <div key={category}>
                <span className="toggle" onClick={(e) => {this.toggleCategory(category)}}>
                  {
                    goods[category].enabled
                    ? <span>✅</span>
                    : <span>❎</span>
                  }
                </span>
                {' _ '}
                <span className="select">
                  <select value={goods[category].enabled ? goods[category].filter : ''} onChange={(event) => {this.handleFilterSelect(event, category)}} disabled={!goods[category].enabled}>
                    <option value=""></option>
                    <option value="1"> c единичками</option>
                    <option value="2"> c двойками</option>
                    <option value="3"> c тройками</option>
                  </select>
                </span>
              </div>
          ))}
        </div>

        <div className="content">
          {Object.keys(goods).filter(category => goods[category].enabled).map((category) => (
              <div key={category} className="slider">
                <span onClick={(e) => this.handleSliderArrow(category, 'prev')}> {'<'} </span>
                  {goods[category].data.filter(el => el.indexOf(goods[category].filter)!==-1).map((el, index) => (
                      <span key={el} className="element">
                        {
                          goods[category].selected===index
                          ? <b>{el}{',  '}</b>
                          : <span>{el}{',  '}</span>
                        }
                      </span>
                    )
                  )}
                  <span onClick={(e) => this.handleSliderArrow(category, 'next')}> {'>'} </span>
              </div>
            )
          )
        }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  window.state = state;
  return {
    goods: state.goodsReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(rootActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
