import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import global from '../../constants/styles/settings.scss';
import styles from './index.scss';
import Popup from '../Popup';
import CSSModules from 'react-css-modules';

import arrow from '../../assets/images/arrow.svg';
import { Icon } from 'react-fa';

const options = {
  allowMultiple: true
}

class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: 'slider'
    }
  }



  onPrevArrow() {
    this.state = {
      name: 'slider_reverse'
    }
  }

  onNextArrow() {
    this.state = {
      name: 'slider'
    }
  }

  renderParams(item, lim = item.param.length) {
    let params = item.param,
        i = 0,
        arrayOfParams = [],
        result = [];

    for (let param of params) {
      ++i;
      arrayOfParams.push(
        <div styleName="param" key={i}>
          <div styleName="param_name">
            <Icon name="check" styleName="check" />
            {param.$.name}:
          </div>
          <div styleName="param_value">{param._}</div>
        </div>
      );
    };

    for (let count=0; count < lim; count++) {
      result[count] = arrayOfParams[count];
    }

    return result;
  }

  countActive() {
    const { goods } = this.props;
    let count = 0;

    for (let category of Object.keys(goods)) {
      goods[category].enabled !== false ? count++ : count--;
    }

    return count === 5 ? true : false;

  }

  render() {
    const { goods, handleSliderArrow, totalPrice, filteredGoods, toggleCategory, showModal, hideModal, modal } = this.props;
    const { renderParams } = this;

    return (
      <div className={global.container}>
        <div >
          {Object.keys(goods).filter(category => goods[category].enabled).map((category) => (
              <div key={category} styleName="slider">
                <div styleName="close_slider" onClick={(e) => {toggleCategory(category)}}>+</div>
                <span
                  styleName="arrow"
                  onClick={(e) => {
                     handleSliderArrow(category, 'prev');
                     this.onPrevArrow()
                   }}>
                    <img src={arrow} alt="" />
                </span>
                <ReactCSSTransitionGroup transitionName={this.state.name} transitionLeaveTimeout={500} transitionEnterTimeout={500}>
                  {
                    filteredGoods[category].map((el, index) => {
                      return goods[category].selected===index && (
                        <div key={el.name[0]} styleName="element" >
                        {
                        //  console.log(goods[category])
                        }
                          <div styleName="inner">
                            <div styleName="image" >
                              <img src={el.picture[0]} alt="" />
                            </div>
                            <div styleName="about">
                              <span styleName="name">
                                {el.name[0]}
                              </span>
                              <div styleName="params">
                                {this.renderParams(el, 4)}
                              </div>
                              <Popup {...{showModal, hideModal, modal, renderParams, el}} label="Подробнее..." />
                            </div>
                            <span styleName="price">
                              <span>{el.price[0]}</span>
                              <Icon name="rub" styleName="rub_ico"/>
                            </span>
                         </div>
                        </div>
                      )


                    })
                  }
                </ReactCSSTransitionGroup>
                  <span
                    styleName="arrow arrow_reverse"
                    onClick={(e) => {
                      handleSliderArrow(category, 'next');
                      this.onNextArrow();
                    }}>
                      <img src={arrow} alt="" />
                  </span>
              </div>

            )
          )
        }

        <div styleName="additional">
          <span styleName={`key ${this.countActive() ? 'hidden' : ''}`}>
            Добавить:

          </span>
          {Object.keys(goods).map((category, i) => (

              <span styleName={`addit ${!goods[category].enabled ? 'active' : ''}`} key={category} onClick={(e) => {toggleCategory(category)}}>
                {goods[category].name}
              </span>
          ))}

        </div>
        <div styleName="final_price">
          Общая стоимость: {totalPrice}
          <Icon name="rub" styleName="rub_ico"/>
        </div>
        <div styleName="sale_price">
          Со скидкой при покупке комплекта: {totalPrice - Math.floor(totalPrice * 5 / 100)}
          <Icon name="rub" styleName="rub_ico"/>
        </div>

        <div styleName="buy">
          <span styleName="button">
            <Icon name="credit-card" styleName="credit_card" />
            Купить комплект в один клик
          </span>
        </div>

        <div styleName="advice">
          <span styleName="link">
            <Icon name="phone" styleName="phone" />
            Посоветоваться с консультантом
          </span>
        </div>

        </div>
      </div>
    )
  }
}

export default CSSModules(List, styles, options);
