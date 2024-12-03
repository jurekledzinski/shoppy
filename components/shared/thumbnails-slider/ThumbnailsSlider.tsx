'use client';
import Image from 'next/image';
import styles from './ThumbnailsSlider.module.css';
import { mainOptions, thumbsOptions } from './optionsSlider';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { ThumbnailsSliderProps } from './types';
import { useEffect, useRef } from 'react';
import '@splidejs/splide/dist/css/splide.min.css';

export const ThumbnailsSlider = ({ images }: ThumbnailsSliderProps) => {
  const mainRef = useRef<Splide>(null);
  const thumbsRef = useRef<Splide>(null);

  useEffect(() => {
    if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
      mainRef.current.sync(thumbsRef.current.splide);
    }
  }, []);

  return (
    <>
      <Splide options={mainOptions} ref={mainRef}>
        {images.map((item, index) => {
          return (
            <SplideSlide key={index}>
              <div className={styles.wrapper}>
                <Image
                  src={`${item}?tr=w-305,h-250,cm-pad_resize`}
                  width={305}
                  height={250}
                  alt={'image'}
                  priority={true}
                  className={styles.mainImage}
                />
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
      <Splide options={thumbsOptions} ref={thumbsRef}>
        {images.map((item, index) => {
          return (
            <SplideSlide key={index}>
              <div className={styles.wrapperThumbNails}>
                <Image
                  src={`${item}?tr=h-80, 80h`}
                  width={80}
                  height={100}
                  alt={'image'}
                  priority={true}
                  sizes="80px"
                  className={styles.thumbnailImage}
                />
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </>
  );
};
