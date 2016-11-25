import React, {Component} from 'react';
import style from './index.scss';
import { Icon } from 'react-fa';

class Popup extends Component {

  render() {
    const { modal, showModal, hideModal, label, renderParams, el } = this.props;

    return (
      <div className={style.popup}>
          <div className={style.label} onClick={(e) => {showModal({content: renderParams(el)})}}>
            {label}
          </div>
          {
            modal.show &&
            <div className={style.inner}>
              <div className={style.overlay}>
                <div className={style.modal_inner}>
                  <div className={style.header}>
                    <span className={style.title}>
                      Технические характеристики
                    </span>
                    <div onClick={hideModal} className={style.popup_close}>
                      +
                    </div>
                  </div>
                  <div className={style.modal_content}>
                    { modal.content }
                  </div>
                  <div className={style.button_inner}>
                    <div onClick={hideModal} className={style.button}>
                      <Icon name="replay" className={style.icon} />
                      <span>Вернуться</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          }
        </div>
    )
  }
}

export default Popup;
