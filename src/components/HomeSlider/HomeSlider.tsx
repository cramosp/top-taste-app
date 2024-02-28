import Image from 'next/image';
import { FC } from 'react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const images = [
  {
    label: 'Your ultimate New York guide to temptations!',
    imgPath: '/carousel1.png',
  },
  {
    label: 'Check out details and reviews and do not miss a thing!',
    imgPath: '/carousel2.png',
  },
  {
    label: 'Create your own favorites list today!',
    imgPath: '/carousel3.png',
  },
];

export const HomeSlider: FC = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className="mySwiper"
    >
      {images.map((step) => (
        <SwiperSlide
          key={step.label}
          style={{ position: 'relative', aspectRatio: '16 / 9' }}
        >
          <Image src={step.imgPath} alt={step.label} fill />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
