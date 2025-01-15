import styles from './ResponsiveTable.module.css';
import { Fragment } from 'react';
import { ResponsiveTableProps } from './types';

export const ResponsiveTable = ({ data }: ResponsiveTableProps) => {
  return (
    <table id="table" className={styles.table}>
      <tbody>
        {data.map((item1, index) => {
          return (
            <Fragment key={index}>
              <tr className={[styles.tr, styles.trTitle].join(' ')}>
                <td
                  colSpan={2}
                  className={[styles.td, styles.header].join(' ')}
                >
                  <h4 className={styles.title}>{item1.title}</h4>
                </td>
              </tr>
              {Object.keys(item1)
                .filter((item2) => item2 !== 'title')
                .map((item3) => (
                  <tr className={styles.tr} key={item3}>
                    <td className={styles.td}>
                      {item3
                        .split(' ')
                        .map((text, index) =>
                          index === 0
                            ? text.charAt(0).toUpperCase() + text.substring(1)
                            : text
                        )
                        .join(' ')}
                    </td>
                    <td className={styles.td}>
                      {item1[item3 as keyof typeof item1]}
                    </td>
                  </tr>
                ))}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};
