'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './BasicSlider.module.css';
import { classNames } from '@/helpers';
import { optionsSlider } from './optionsSlider';
import { sliderData } from '@/data';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useState } from 'react';
import '@splidejs/splide/dist/css/splide.min.css';

export const BasicSlider = () => {
  const [indexSlide, setIndexSlide] = useState(0);

  return (
    <div className={styles.wrapper}>
      <Splide options={optionsSlider} onMoved={(e) => setIndexSlide(e.index)}>
        {sliderData.map((item, index) => {
          return (
            <SplideSlide key={item.id}>
              <div className={styles.wrapperContent}>
                <div className={styles.leftBoxSlide}>
                  <div
                    className={
                      indexSlide === index
                        ? classNames(styles.leftBoxContext, styles.showText)
                        : classNames(styles.leftBoxContext, styles.hideText)
                    }
                  >
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.subTitle}>{item.description}</p>
                    <Link className={styles.link} href={item.redirect}>
                      Buy now
                    </Link>
                  </div>
                </div>
                <div className={styles.rightBoxSlide}>
                  <Image
                    className={
                      indexSlide === index
                        ? classNames(styles.image, styles.showImage)
                        : classNames(styles.image, styles.hideImage)
                    }
                    src={item.image}
                    width={220}
                    height={280}
                    alt={item.alt}
                    priority={true}
                    sizes="(max-width: 575px) 70vw, 100vw"
                  />
                </div>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};
