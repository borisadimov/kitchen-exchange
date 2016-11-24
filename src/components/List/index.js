import React, { Component } from 'react';
import global from '../../constants/styles/settings.scss';
import styles from './index.scss';
import cn from 'classnames';

import arrow from '../../assets/images/arrow.svg';
import { Icon } from 'react-fa';

class List extends Component {

  render() {
    const { goods, handleSliderArrow, totalPrice, filteredGoods, toggleCategory } = this.props;


    return (
      <div className={global.container}>
        <div className={styles.list}>
          {Object.keys(goods).filter(category => goods[category].enabled).map((category) => (
              <div key={category} className={styles.slider}>
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
                              <span className={styles.name}>
                                {el.name[0]}
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
          <span className={styles.key}>
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
        </div>
        <div className={styles.sale_price}>
          Со скидкой при покупке комплекта: {totalPrice - (totalPrice * 5 / 100)}
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
