import React, { useRef, useEffect } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';
import { Typography } from 'antd';

const { Text } = Typography;
interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  label?: string;
}
const Select = ({ label, name, ...rest }: Props) => {
  const selectRef = useRef(null);
  const {
    fieldName, defaultValue, registerField, error
  } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);
  return (
    <>
      {label && <Text>{label}</Text>}
      <ReactSelect
        placeholder="Selecione uma Opção"
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
      {error && <Text type="danger">{error}</Text>}
    </>
  );
};

export default Select;
