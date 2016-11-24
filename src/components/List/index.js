import React, { Component } from 'react';
import global from '../../constants/styles/settings.scss';
import styles from './index.scss';
import cn from 'classnames';

import arrow from '../../assets/images/arrow.svg';


class List extends Component {

  render() {
    const { goods, handleSliderArrow, totalPrice, filteredGoods } = this.props;


    return (
      <div className={global.container}>
        <div className={styles.list}>
          {Object.keys(goods).filter(category => goods[category].enabled).map((category) => (
              <div key={category} className={styles.slider}>
                <span className={styles.arrow} onClick={(e) => handleSliderArrow(category, 'prev')}> <img src={arrow} alt="" /> </span>
                  {filteredGoods[category].map((el, index) => (
                      <div key={el.name[0]} className={styles.element} >

                        {
                          goods[category].selected===index
                          ? <div className={styles.inner}>
                              <div className={styles.image} > <img src={el.picture[0]} /> </div>
                              <span className={styles.name}>{el.name[0]}</span>
                           </div>
                          : null
                        }

                      </div>

                    )
                  )}
                  <span className={cn(styles.arrow, styles.arrow_reverse)} onClick={(e) => handleSliderArrow(category, 'next')}> <img src={arrow} alt="" /> </span>
              </div>

            )
          )
        }

        <div className={styles.additional}>
          <span className={styles.key}>
            Добавить:
          </span>

          <span className={styles.addit}>Посудомоечная машина</span>
          <span className={styles.addit}>Холодильник</span>
        </div>
        <div className={styles.final_price}>
          Общая стоимость: {totalPrice}
        </div>
        <div className={styles.sale_price}>
          Со скидкой при покупке комплекта: {totalPrice - (totalPrice * 5 / 100)}
        </div>

        <div className={styles.buy}>
          <span className={styles.button}>
            Купить комплект в один клик
          </span>
        </div>

        <div className={styles.advice}>
          <span className={styles.link}>
            Посоветоваться с консультантом
          </span>
        </div>

        </div>
      </div>
    )
  }
}

export default List;
