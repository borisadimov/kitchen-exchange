import React from 'react';
import styles from './index.scss';

import check_icon from '../../assets/images/checked.svg';

const Checkbox = ({ checked, img, title, onClick, category_id }) => {

  return (
    <div className={styles.checkbox} onClick={onClick} id={category_id}>
      {
        checked ? <img src={check_icon} className={styles.icon} alt="" /> : null
      }

      <div className={styles.image}>
        <img src={img} alt="" />
      </div>

      <div className={styles.title}>{title}</div>

      <select className={styles.select}>
        <option className={styles.option}> test </option>
        <option className={styles.option}> test </option>
        <option className={styles.option}> test </option>
      </select>
    </div>
  )

}

export default Checkbox;
