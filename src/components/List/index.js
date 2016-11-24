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
                      <span key={el.name[0]} className={styles.element}>
                        {
                          goods[category].selected===index
                          ? <b>{el.name[0]}{',  '}</b>
                          : <span>{el.name[0]}{',  '}</span>
                        }
                      </span>
                    )
                  )}
                  <span className={cn(styles.arrow, styles.arrow_reverse)} onClick={(e) => handleSliderArrow(category, 'next')}> <img src={arrow} alt="" /> </span>
              </div>

            )
          )
        }
        <div className={styles.final_price}>
          Общая стоимость: {totalPrice}
        </div>
        <div className={styles.sale_price}>
          Со скидкой при покупке комплекта: {totalPrice - (totalPrice * 5 / 100)}
        </div>

        </div>
      </div>
    )
  }
}

export default List;
