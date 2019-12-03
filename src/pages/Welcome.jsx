import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './Welcome.less';
import TableBasic from './TableBasic/index.js';

export default () => (
  <PageHeaderWrapper>
    <TableBasic />
  </PageHeaderWrapper>
);
