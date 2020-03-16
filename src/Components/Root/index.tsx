import React from 'react';

type RootProps = {
  children?: React.ReactElement;
};

const Root: React.FC<RootProps> = ({ children }: RootProps) => {
  return <div>{children}</div>;
};

export default Root;
