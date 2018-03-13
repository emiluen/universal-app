import React, { Component } from 'react';
import {
  Carousel as CarouselStrap,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

import Link from '../Link';

const items = [
  {
    src: 'https://images.contentful.com/adbfifosu0wp/6euT0Kz7POi4KiCEc6Yc6e/342924a60635fb8cd8fd05aa3f88291f/pexels-photo-157023.jpeg',
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: 'https://images.contentful.com/adbfifosu0wp/5N5nxrRWF20e4OksK0448c/9b2b0af65c5081ed4f215597cd78e99d/pexels-photo-502724-1040x400.jpeg',
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
];

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          className="carousel__item"
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <div className="carousel__item__content carousel-caption d-none d-md-block">
            <h1>Who Am I?</h1>
            <Link button color="primary" to="/personalities">Learn More</Link>
          </div>
        </CarouselItem>
      );
    });

    return (
      <CarouselStrap
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </CarouselStrap>
    );
  }
}


export default Carousel;
