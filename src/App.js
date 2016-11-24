import React, {Component} from 'react';
import Header from './components/Header';
import List from './components/List';
import Footer from './components/Footer';

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
    const { goods, filteredGoods, color, totalPrice } = this.props;

    return (
      <div className="App">
        <Header color={color} goods={goods} toggleCategory={this.toggleCategory} updateColor={this.updateColor} handleFilterSelect={this.handleFilterSelect} />
        <List goods={goods} toggleCategory={this.toggleCategory} filteredGoods={filteredGoods} handleSliderArrow={this.handleSliderArrow} totalPrice={totalPrice} />
        <Footer />
      </div>
    );
  }
}


export default App;
