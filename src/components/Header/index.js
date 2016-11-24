import React, { Component } from 'react';
import global from "../../constants/styles/settings.scss";
import styles from './index.scss';
import cn from 'classnames';
import classNames from 'classnames/bind';

import logo from '../../assets/images/slider-button.png';
import icon1 from '../../assets/images/checkbox_icon1.svg';
import check_icon from '../../assets/images/checked.svg';

let cx = classNames.bind(styles);

class Header extends Component {

  render() {
    const { goods, color, toggleCategory, updateColor } = this.props;

    return (
      <div className={styles.header}>
        <div className={cn(global.container, styles.container)}>
          <div className={styles.top}>
            <div className={styles.left_inner}>
              <div className={styles.logo}>
                <div className={styles.row}>
                  <span className={styles.name}>БИРЖА<br />КУХОНЬ</span>
                  <span className={styles.city}>Город: Москва</span>
                </div>
                <div className={styles.row}>
                  <img src={logo} alt="" />
                </div>
              </div>
            </div>

            <div className={styles.right_inner}>

              <div className={styles.buttons}>
                <a href="#" className={styles.button}>Мне нужна кухня</a>
                <a href="#" className={styles.button}>8(800)333-17-90</a>
              </div>

            </div>

          </div>
          <div className={styles.middle}>
            <div className={styles.title}>Умная покупка кухонной техники</div>
            <div className={styles.subtitle}>После оплаты техника может храниться на складе до готовности кухни, потом мы её привезём, подключим и даже научим ей пользоваться 🎂</div>
          </div>

          <div className={styles.checkboxes}>

              {Object.keys(goods).map((category, i) => (
                  <div key={category} className={cx(styles.category, goods[category].enabled ? styles.active : null)} >
                    <div className={styles.inner} onClick={(e) => {toggleCategory(category)}}>
                      <span className={styles.toggle}>
                        {
                          goods[category].enabled
                          ? <img src={check_icon} className={styles.icon} alt="" />
                          : null
                        }
                      </span>

                      <img src={icon1} className={styles.image} alt="" />

                      <span className={styles.name_category}>
                        {goods[category].name}
                      {console.log(goods[category].name)}
                      </span>
                    </div>
                    <span className={styles.select}>
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
              <div className={styles.color_select}>
                <div className={styles.heading}>
                  Какого цвета техника вам подойдет?
                </div>
              </div>
              <div className={styles.color_picker}>
              {
                Object.keys(color.types).map(c => (
                  <div
                    key={c}
                    className={/*`colorSelector ${color.selectedColor===c ? 'active' : ''}`*/ styles.colorSelector}
                    onClick={e => updateColor(c)}>
                    <img src={check_icon} className={styles.checked_icon} alt="" />
                    {color.types[c].alias}
                  </div>
                ))
              }
              </div>
          </div>

        </div>

        <div className={styles.subheader}>
          <a href="#" className={styles.link}>
            Топ 10 комплектов техники по акции!
          </a>
        </div>
      </div>

    )
  }
};

export default Header;
