import styles from './Loader.module.css';
import { classNames } from '@/helpers';
import { LoaderProps } from './types';

export const Loader = ({
  border,
  className,
  colorSpin,
  colorTrack,
  position,
  size,
  sizeSchema,
}: LoaderProps) => {
  const loaderClassNames = classNames(
    styles.loader,
    styles[sizeSchema as keyof typeof styles],
    styles[position as keyof typeof styles],
    styles[border as keyof typeof styles],
    className!
  );

  return (
    <span
      className={loaderClassNames}
      {...(size || colorSpin || colorTrack
        ? {
            style: {
              width: size,
              height: size,
              ...(colorTrack ? { borderColor: colorTrack } : {}),
              ...(colorSpin ? { borderTopColor: colorSpin } : {}),
            },
          }
        : {})}
    ></span>
  );
};
