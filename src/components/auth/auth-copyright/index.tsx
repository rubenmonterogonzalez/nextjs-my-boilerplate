'use client';

import { Text } from '@mantine/core';
import classes from '../auth.module.css';

export function AuthCopyright() {
  const currentYear = new Date().getFullYear();
  const copyright = "©2024 Company.Ltd All rights reserved."
  const copyrightText = copyright.replace(/\d{4}/, currentYear.toString()).split('\n').map((line, index) => (
    <Text key={index} className={classes.copyright} mt={0}>
      {line}
    </Text>
  ));

  return (
    <>
      {copyrightText}
    </>
  );
}
