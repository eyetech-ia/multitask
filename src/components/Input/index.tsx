/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { Input as AntInput, InputProps as AntInputProps, Typography } from 'antd';
import { useField } from '@unform/core';

import { IconBaseProps } from 'react-icons';

interface InputProps extends AntInputProps {
  name: string;
  label?: string;
  icon?: React.ComponentType<IconBaseProps>;
  searchable?: boolean
  onSearch?: () => void;
  loading?: boolean
  enterButton?: string;
}

const { Search } = AntInput;
const { Text } = Typography;

const Input = ({
  name, label, icon: Icon, searchable, loading, enterButton, ...rest
}: InputProps) => {
  const inputRef = useRef<AntInput>(null);

  const {
    fieldName, defaultValue, error, registerField
  } = useField(name);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputRef.current,
      getValue: (ref) => ref.input.value,
      setValue: (ref: AntInput, value) => {
        ref.input.value = value;
      },
      clearValue: (ref: AntInput) => {
        ref.input.value = '';
      }
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label && <Text>{label}</Text>}

      {
        searchable
          ? (
            <AntInput.Search
              style={{ color: '#000' }}
              prefix={Icon && <Icon size={20} />}
              ref={inputRef}
              defaultValue={defaultValue}
              type="text"
              {...rest}
              loading={loading}
              enterButton={enterButton}

            />
          )
          : (
            <AntInput
              style={{ color: '#000' }}
              prefix={Icon && <Icon size={20} />}
              ref={inputRef}
              defaultValue={defaultValue}
              type="text"
              {...rest}
            />
          )
      }

      {error && <Text type="danger">{error}</Text>}
    </>
  );
};

export default Input;
