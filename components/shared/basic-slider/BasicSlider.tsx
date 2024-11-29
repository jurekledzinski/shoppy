'use client';
import { useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { optionsSlider } from './optionsSlider';
import { sliderData } from '@/data';
import Link from 'next/link';
import Image from 'next/image';
import styles from './BasicSlider.module.css';
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
                        ? [styles.leftBoxContext, styles.showText]
                            .filter(Boolean)
                            .join(' ')
                        : [styles.leftBoxContext, styles.hideText]
                            .filter(Boolean)
                            .join(' ')
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
                        ? [styles.image, styles.showImage]
                            .filter(Boolean)
                            .join(' ')
                        : [styles.image, styles.hideImage]
                            .filter(Boolean)
                            .join(' ')
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
