import React, {Component} from 'react';

class App extends Component {

  updateColor = (color) => {
    const { actions, goods } = this.props;
    Object.keys(goods).forEach((category) => {
      actions.changeSlide({
        category: category,
        index: 0
      })
    })
    actions.updateColor({
      color: color
    })
  }

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
    const { goods, filteredGoods, actions } = this.props;

    const currentIndex = goods[category].selected;
    const lastItemIndex = filteredGoods[category].length-1;
    const value = (dir === 'prev')
      ? (currentIndex > 0 ? currentIndex-1 : lastItemIndex)
      : (currentIndex < lastItemIndex ? currentIndex+1 : 0)

    actions.changeSlide({
      category: category,
      index: value
    })

  }

  render() {
    const { goods, filteredGoods, color } = this.props;

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
                  <select
                    value={goods[category].enabled ? goods[category].filter : ''}
                    onChange={(event) => {this.handleFilterSelect(event, category)}}
                    disabled={!goods[category].enabled}>
                    <option value=""></option>
                    {
                      Object.keys(goods[category].filters).map(f =>
                        <option key={f} value={f}>{goods[category].filters[f]}</option>
                      )
                    }
                  </select>
                </span>
              </div>
          ))}
          {
            Object.keys(color.types).map(c => (
              <div
                key={c}
                className={`colorSelector ${color.selectedColor===c ? 'active' : ''}`}
                onClick={e => this.updateColor(c)}>
                {color.types[c].alias}
              </div>
            ))
          }
        </div>

        <div className="content">
          {Object.keys(goods).filter(category => goods[category].enabled).map((category) => (
              <div key={category} className="slider">
                <span onClick={(e) => this.handleSliderArrow(category, 'prev')}> {'<'} </span>
                  {filteredGoods[category].map((el, index) => (
                      <span key={el.name[0]} className="element">
                        {
                          goods[category].selected===index
                          ? <b>{el.name[0]}{',  '}</b>
                          : <span>{el.name[0]}{',  '}</span>
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


export default App;
