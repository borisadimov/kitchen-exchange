import React from 'react';
import styles from './index.scss';
import global from '../../constants/styles/settings.scss';

const Footer = () => {


  return (
    <div className={styles.footer}>
      <div className={styles.top}>
        <div className={global.container}>
          <span className={styles.txt}>
            Вы можете оплатить технику сейчас, а доставку заказать в любое удобное время в течение 1 года
          </span>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={global.container}>
          <div className={styles.number}>
            8 (800) 333-17-90
          </div>

          <div className={styles.mail}>
            info@birja-kuhon.ru
          </div>
        </div>
      </div>
    </div>
  )


}

export default Footer;
