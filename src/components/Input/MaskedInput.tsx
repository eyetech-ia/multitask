/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import React, { useEffect, useRef, } from 'react';
import { Input as AntInput, InputProps as AntInputProps, Typography } from 'antd';
import { useField } from '@unform/core';
import MaskedInput from 'antd-mask-input';
import { IconBaseProps } from 'react-icons';

interface InputProps {
  name: string;
  label?: string;
  icon?: React.ComponentType<IconBaseProps>;
  searchable?: boolean
  loading?: boolean
  enterButton?: string;
  mask: string;
  placeholder?: string;
}

const { Search } = AntInput;
const { Text } = Typography;

const InputMask = ({
  name, label, icon: Icon, searchable, loading, enterButton, placeholder, mask, ...rest
}: InputProps) => {
  const inputRef = useRef<MaskedInput>(null);

  const {
    fieldName, defaultValue, error, registerField
  } = useField(name);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputRef.current,
      getValue: (ref: AntInput) => ref.input.value,
      setValue: (ref: AntInput, value: string) => {
        ref.input.value = value;
      },
      clearValue: (ref: AntInput) => {
        ref.input.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label && <Text>{label}</Text>}

      <MaskedInput
        style={{ color: '#000' }}
        prefix={Icon && <Icon size={20} />}
        ref={inputRef}
        defaultValue={defaultValue}
        type="text"
        mask={mask}
        placeholder={placeholder}
        {...rest}
      />

      {error && <Text type="danger">{error}</Text>}
    </>
  );
};

export default InputMask;
