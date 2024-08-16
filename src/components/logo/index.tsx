import React from 'react';
import Image from 'next/image'

import styles from './logo.module.css';

export function Logo({ width, height }: { width: number; height: number }) {
  return (
    <>
      <Image
        className={styles.logo}
        src="/next.svg"
        alt="Next.js Logo"
        width={width}
        height={height}
        priority
      />
    </>
  );
}
