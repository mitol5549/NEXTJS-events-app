import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import dynamic from 'next/dynamic';

var $ = require('jquery');
if (typeof window !== 'undefined') {
  window.$ = window.jQuery = require('jquery');
}

const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });

export const Carousel = props => {
  return (
    <div>
      <OwlCarousel
        autoplay={true}
        autoWidth={true}
        margin={20}
        autoplayTimeout={3000}
        autoplaySpeed={1000}
        autoplayHoverPause={true}
        loop={true}
        center={true}
      >
        {props.children}
      </OwlCarousel>
    </div>
  );
};
