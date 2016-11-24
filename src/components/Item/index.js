import React, { Component } from 'react';
import styles from './index.scss';
import cn from 'classnames';
import { connect } from 'react-redux';

import arrow from '../../assets/images/arrow.svg';

class Item extends Component {

  constructor(props) {
    super(props);

    this.state = {
      current: 0
    }

    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
  }

  nextSlide() {
    let maxCount = this.props.slides.length

    if (this.state.current < maxCount - 1) {
      this.setState({
        current: ++this.state.current
      });
    }
    else {
      this.setState({
        current: maxCount - 1
      });
    }

  }

  prevSlide() {

    if (this.state.current - 1 > 0) {
      this.setState({
        current: --this.state.current
      })
    }
    else {
      this.setState({
        current: 0
      })
    }
  }

  renderParams(item, lim = item.param.length) {
    let params = item.param,
        i = 0,
        arrayOfParams = [],
        result = [];

    for (let param of params) {
      ++i;
      arrayOfParams.push(
        <div className={styles.params} key={i}>
          <div className={styles.param_name}>{param.$.name}:</div>
          <div className={styles.param_value}>{param._}</div>
        </div>
      );
    };

    for (let count=0; count < lim; count++) {
      result[count] = arrayOfParams[count];
    }

    return result;
  }

  renderSlides() {
    let slides = this.props.slides;
    let transform = {
      transform: `translate(-${this.state.current * 100}%)`
    }

    return slides.map((slide, i) => {

      return(
        <div className={styles.slide} style={transform} key={i}>
          <div className={styles.image}><img src={slide.picture[0]} alt="" /></div>
          <div className={styles.about}>
            <div className={styles.name}>{slide.name[0]}</div>
            {this.renderParams(slide, 4)}
          </div>
          <div className={styles.price}>{slide.price[0]}</div>

        </div>
      )
    });

  }

  render() {

    return (
      <div className={styles.item} >
        <button className={cn(styles.arrow, styles.arrow_reverse)} onClick={this.prevSlide}><img src={arrow} alt="" /></button>
        <div className={styles.track}>
          {this.renderSlides()}
        </div>
        <button className={styles.arrow} onClick={this.nextSlide}><img src={arrow} alt="" /></button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { list } = state;

  return {
    list
  };
}

export default connect(mapStateToProps, null)(Item);
