import { useMemo } from 'react';
import dynamic from 'next/dynamic';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

var $ = require('jquery');

if (typeof window !== 'undefined') {
  window.$ = window.jQuery = require('jquery');
}

const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });

export const Carousel = props => {
  const owlCarouselSettings = useMemo(() => ({
    autoplay: true,
    autoWidth: true,
    margin: 20,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
    autoplayHoverPause: true,
    loop: true,
    center: true
  }), []);

  return (
    <div>
      <OwlCarousel {...owlCarouselSettings}>
        {props.children}
      </OwlCarousel>
    </div>
  );
};