import React, {Component} from 'react';
import Header from './components/Header';
import List from './components/List';
import Footer from './components/Footer';

class App extends Component {

  updateColor = (color) => {
    const { actions, goods } = this.props;

    Object.keys(goods).forEach((category) => {
      actions.changeSlide({
        category,
        index: 0
      })
    })
    actions.updateColor({ color })
  }

  toggleCategory = (category) => {

    const { actions } = this.props;
    actions.toggle({ category })
  }

  handleFilterSelect = (event, category) => {
    const { actions } = this.props;

    actions.updateFilter({
      category,
      value: event.target.value
    })

    actions.changeSlide({
      category,
      index: 0
    })

  }

  handleSliderArrow = (category, dir) => {
    const { goods, filteredGoods, actions } = this.props;

    const currentIndex = goods[category].selected;
    const lastItemIndex = filteredGoods[category].length-1;
    const index = (dir === 'prev')
      ? (currentIndex > 0 ? currentIndex-1 : lastItemIndex)
      : (currentIndex < lastItemIndex ? currentIndex+1 : 0)

    actions.changeSlide({
      category,
      index
    })

  }

  render() {
    const { goods, filteredGoods, color, totalPrice, modal, actions: {showModal, hideModal} } = this.props;
    const { toggleCategory, updateColor, handleFilterSelect, handleSliderArrow} = this;
    return (
      <div className="App">
        <Header {...{color, goods, toggleCategory, updateColor, handleFilterSelect}} />
        <List {...{goods, filteredGoods, handleSliderArrow, totalPrice, toggleCategory, showModal, hideModal, modal}}  />
        <Footer />
      </div>
    );
  }
}


export default App;
