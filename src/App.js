import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as rootActions from './rootReducer';

class App extends Component {

  constructor(props) {
    super(props);

    // this.state = {
    //   data: {}
    // };
  }

  toggleCategory = (i) => {
    const { filters, actions } = this.props;

    actions.updateFilter({
      filter: i,
      value: filters[i]!==null ? null : ''
    })

  }

  handleFilterSelect = (e, i) => {
    const { filters, actions } = this.props;

    actions.updateFilter({
      filter: i,
      value: e.target.value
    })

    actions.changeSlide({
      slider: i,
      index: 0
    })

  }

  handleSliderArrow = (i, dir) => {
    const { slides, actions } = this.props;

    let value = (dir === 'prev') ? slides[i]-1 : slides[i]+1

    actions.changeSlide({
      slider: i,
      index: value
    })

  }

  render() {
    const { data, slides, filters, actions } = this.props;

    return (
      <div className="App">
        <div className="controls">
          {[0,1,2].map((i) => (
              <div key={i}>
                <span className="toggle" onClick={(e) => {this.toggleCategory(i)}}>
                  {
                    filters[i]!==null
                    ? <span>✅</span>
                    : <span>❎</span>
                  }
                </span>
                {' _ '}
                <span className="select">
                  <select value={filters[i]!==null ? filters[i] : ''} onChange={(e) => {this.handleFilterSelect(e,i)}} disabled={filters[i]===null}>
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
          {[0,1,2].filter(i => filters[i]!==null).map((i) => (
              <div key={i} className="slider">
                <span onClick={(e) => this.handleSliderArrow(i, 'prev')}> {'<'} </span>
                  {data[i].filter(el => el.indexOf(filters[i])!==-1).map((el, j) => (
                      <span key={el} className="element">
                        {
                          slides[i]===j
                          ? <b>{el}{',  '}</b>
                          : <span>{el}{',  '}</span>
                        }
                      </span>
                    )
                  )}
                  <span onClick={(e) => this.handleSliderArrow(i, 'next')}> {'>'} </span>
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
    data: state.goodsReducer.data,
    slides: state.goodsReducer.slides,
    filters: state.goodsReducer.filters
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(rootActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
