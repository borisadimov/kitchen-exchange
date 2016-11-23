import React, { Component } from 'react';
import { connect } from 'react-redux';
import global from "../../constants/styles/settings.scss";
import styles from './index.scss';
import cn from 'classnames';
import {bindActionCreators} from 'redux';
import { toggle } from '../../rootReducer';

import logo from '../../assets/images/slider-button.png';
import icon1 from '../../assets/images/checkbox_icon1.svg';

class Header extends Component {

  toggleCategory = (category) => {
    const { actions } = this.props;
    actions.toggle({
      category: category
    })
  }

  render() {
    const { goods, color } = this.props;

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


          <div className={styles.color_select}>
            <div className={styles.heading}>
              Какого цвета техника вам подойдет?
            </div>
          </div>
        </div>

      </div>
    )
  }
};

function mapStateToProps(state, props) {
  window.state = state;
  return {
    goods: state.goods,
    color: state.color,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ toggle }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
