import React, { Component } from 'react';
import global from "../../constants/styles/settings.scss";
import styles from './index.scss';
import CSSModules from 'react-css-modules';

import logo from '../../assets/images/slider-button.png';
import check_icon from '../../assets/images/checked.svg';

const options = {
  allowMultiple: true
}


class Header extends Component {

  render() {
    const { goods, color, toggleCategory, updateColor, handleFilterSelect } = this.props;

    return (
      <div styleName="header">
        <div className={global.container}>
          <div styleName="top">
            <div styleName="left_inner">
              <div styleName="logo">
                <div styleName="row">
                  <span styleName="name">БИРЖА<br />КУХОНЬ</span>
                  <span styleName="city">Город: Москва</span>
                </div>
                <div styleName="row">
                  <img src={logo} alt="" />
                </div>
              </div>
            </div>

            <div styleName="right_inner">

              <div >
                <a href="#" styleName="button">Мне нужна кухня</a>
                <a href="#" styleName="button">8(800)333-17-90</a>
              </div>

            </div>

          </div>
          <div styleName="middle">
            <div styleName="title">Умная покупка кухонной техники</div>
            <div styleName="subtitle">После оплаты техника может храниться на складе до готовности кухни, потом мы её привезём, подключим и даже научим ей пользоваться 🎂</div>
          </div>

          <div styleName="checkboxes">

              {Object.keys(goods).map((category, i) => (
                  <div key={category} styleName={`category ${!goods[category].enabled ? 'deactive' : ''}`} >
                    <div onClick={(e) => {toggleCategory(category)}}>
                      <span styleName="toggle">
                        {
                          goods[category].enabled
                          ? <img src={check_icon} styleName="icon" alt="" />
                          : null
                        }
                      </span>

                      <img src={goods[category].image} styleName="image" alt="" />

                      <span styleName="name_category">
                        {goods[category].name}
                      </span>
                    </div>
                    <span styleName="select">
                      <select
                        value={goods[category].enabled ? goods[category].filter : ''}
                        onChange={(event) => {handleFilterSelect(event, category)}}
                        disabled={!goods[category].enabled}>
                        {
                          Object.keys(goods[category].filters).map(f =>

                              <option key={f} value={f}>{goods[category].filters[f]}</option>

                          )
                        }
                      </select>
                    </span>
                  </div>
              ))}
              <div styleName="color_select">
                <div styleName="heading">
                  Какого цвета техника вам подойдет?
                </div>
              </div>
              <div styleName="color_picker">
              {
                Object.keys(color.types).map(c => (
                  <div
                    key={c}
                    styleName={`colorSelector ${color.selectedColor===c ? 'active' : ''}`}
                    onClick={e => updateColor(c)}>
                    <img src={check_icon} styleName="checked_icon" alt="" />
                    {color.types[c].alias}
                  </div>
                ))
              }
              </div>
          </div>

        </div>

        <div styleName="subheader">
          <a href="#" styleName="link">
            Топ 10 комплектов техники по акции!
          </a>
        </div>
      </div>

    )
  }
};

export default CSSModules(Header, styles, options);
