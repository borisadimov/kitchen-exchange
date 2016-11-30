import React, { Component } from 'react';
import global from '../../constants/styles/settings.scss';
import styles from './index.scss';
import cn from 'classnames';
import Popup from '../Popup';

import arrow from '../../assets/images/arrow.svg';
import { Icon } from 'react-fa';

class List extends Component {

  renderParams(item, lim = item.param.length) {
    let params = item.param,
        i = 0,
        arrayOfParams = [],
        result = [];

    for (let param of params) {
      ++i;
      arrayOfParams.push(
        <div className={styles.param} key={i}>
          <div className={styles.param_name}>
            <Icon name="check" className={styles.check} />
            {param.$.name}:
          </div>
          <div className={styles.param_value}>{param._}</div>
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
        <div className={styles.list}>
          {Object.keys(goods).filter(category => goods[category].enabled).map((category) => (
              <div key={category} className={styles.slider}>
                <div className={styles.close_slider} onClick={(e) => {toggleCategory(category)}}>+</div>
                <span
                  className={styles.arrow}
                  onClick={(e) => handleSliderArrow(category, 'prev')}>
                    <img src={arrow} alt="" />
                </span>
                  {
                    filteredGoods[category].map((el, index) =>
                        goods[category].selected===index && (
                          <div key={el.name[0]} className={styles.element} >
                            <div className={styles.inner}>
                              <div className={styles.image} >
                                <img src={el.picture[0]} alt="" />
                              </div>
                              <div className={styles.about}>
                                <span className={styles.name}>
                                  {el.name[0]}
                                </span>
                                <div className={styles.params}>
                                  {this.renderParams(el, 4)}
                                </div>
                                <Popup {...{showModal, hideModal, modal, renderParams, el}} label="Подробнее..." />
                              </div>
                              <span className={styles.price}>
                                <span>{el.price[0]}</span>
                                <Icon name="rub" className={styles.rub_ico}/>
                              </span>
                           </div>
                          </div>
                        )

                    )
                  }
                  <span
                    className={cn(styles.arrow, styles.arrow_reverse)}
                    onClick={(e) => handleSliderArrow(category, 'next')}>
                      <img src={arrow} alt="" />
                  </span>
              </div>

            )
          )
        }

        <div className={styles.additional}>
          <span className={`${styles.key} ${this.countActive() ? styles.hidden : null}`}>
            Добавить:

          </span>
          {Object.keys(goods).map((category, i) => (

              <span className={`${styles.addit} ${!goods[category].enabled ? styles.active : ''}`} key={category} onClick={(e) => {toggleCategory(category)}}>
                {goods[category].name}
              </span>
          ))}

        </div>
        <div className={styles.final_price}>
          Общая стоимость: {totalPrice}
          <Icon name="rub" className={styles.rub_ico}/>
        </div>
        <div className={styles.sale_price}>
          Со скидкой при покупке комплекта: {totalPrice - Math.floor(totalPrice * 5 / 100)}
          <Icon name="rub" className={styles.rub_ico}/>
        </div>

        <div className={styles.buy}>
          <span className={styles.button}>
            <Icon name="credit-card" className={styles.credit_card} />
            Купить комплект в один клик
          </span>
        </div>

        <div className={styles.advice}>
          <span className={styles.link}>
            <Icon name="phone" className={styles.phone} />
            Посоветоваться с консультантом
          </span>
        </div>

        </div>
      </div>
    )
  }
}

export default List;
