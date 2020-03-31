import React from 'react';

import { SvgIcon } from '@material-ui/core';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const CrossIcon = (props: any) => {
  return (
    <SvgIcon {...props}>
      <path d="M10.5,2H13.5V8H19V11H13.5V22H10.5V11H5V8H10.5V2Z" />
    </SvgIcon>
  );
};
export default CrossIcon;
