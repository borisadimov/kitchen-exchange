import React from 'react';
import styles from './index.scss';
import global from '../../constants/styles/settings.scss';
import CSSModules from 'react-css-modules';

const options = {
  allowMultiple: true
}

const Footer = () => {


  return (
    <div styleName="footer">
      <div styleName="top">
        <div className={global.container}>
          <span>
            Вы можете оплатить технику сейчас, а доставку заказать в любое удобное время в течение 1 года
          </span>
        </div>
      </div>

      <div styleName="bottom">
        <div className={global.container}>
          <div styleName="number">
            8 (800) 333-17-90
          </div>

          <div styleName="mail">
            info@birja-kuhon.ru
          </div>
        </div>
      </div>
    </div>
  )

}

export default CSSModules(Footer, styles, options);
