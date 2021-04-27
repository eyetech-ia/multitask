import React from 'react';

import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';

interface ButtonProps extends AntButtonProps {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  ...rest
}: ButtonProps) => (
  <AntButton {...rest}>
    {loading ? 'Carregando...' : children}
  </AntButton>
);

export default Button;
