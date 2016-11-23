import React, {Component} from 'react';
import Header from './components/Header';

class App extends Component {

  // updateColor = (color) => {
  //   const { actions, goods } = this.props;
  //   Object.keys(goods).forEach((category) => {
  //     actions.changeSlide({
  //       category: category,
  //       index: 0
  //     })
  //   })
  //   actions.updateColor({
  //     color: color
  //   })
  // }

  toggleCategory = (category) => {

    const { actions } = this.props;
    actions.toggle({
      category: category
    })
  }

  // handleFilterSelect = (event, category) => {
  //   const { actions } = this.props;
  //
  //   actions.updateFilter({
  //     category: category,
  //     value: event.target.value
  //   })
  //
  //   actions.changeSlide({
  //     category: category,
  //     index: 0
  //   })
  //
  // }
  //
  // handleSliderArrow = (category, dir) => {
  //   const { goods, filteredGoods, actions } = this.props;
  //
  //   const currentIndex = goods[category].selected;
  //   const lastItemIndex = filteredGoods[category].length-1;
  //   const value = (dir === 'prev')
  //     ? (currentIndex > 0 ? currentIndex-1 : lastItemIndex)
  //     : (currentIndex < lastItemIndex ? currentIndex+1 : 0)
  //
  //   actions.changeSlide({
  //     category: category,
  //     index: value
  //   })
  //
  // }

  render() {
    const { goods, filteredGoods, color, totalPrice } = this.props;

    return (
      <div className="App">
        <Header color={color} goods={goods} toggleCategory={this.toggleCategory}/>


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
        {
          totalPrice
        }
        </div> 
      </div>
    );
  }
}


export default App;
