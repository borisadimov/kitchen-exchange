import React, {Component} from 'react';
import styles from './index.scss';
import { Icon } from 'react-fa';
import CSSModules from 'react-css-modules';

const options = {
  allowMultiple: true
}

class Popup extends Component {

  render() {
    const { modal, showModal, hideModal, label, renderParams, el } = this.props;

    return (
      <div>
          <div styleName="label" onClick={(e) => {showModal({content: renderParams(el)})}}>
            {label}
          </div>
          {
            modal.show &&
            <div styleName="inner">
              <div>
                <div styleName="modal_inner">
                  <div styleName="header">
                    <span styleName="title">
                      Технические характеристики
                    </span>
                    <div onClick={hideModal} styleName="popup_close">
                      +
                    </div>
                  </div>
                  <div styleName="modal_content">
                    { modal.content }
                  </div>
                  <div styleName="button_inner">
                    <div onClick={hideModal} styleName="button">
                      <Icon name="replay" />
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

export default CSSModules(Popup, styles, options);
