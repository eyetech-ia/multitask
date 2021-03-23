/* eslint-disable react/prop-types */
import React, {SelectHTMLAttributes} from 'react';
import './styles.css';

interface SelectProps extends SelectHTMLAttributes <HTMLSelectElement> {
    label:string;
    name: string;
    options: Array<{
        id: string;
        label: string;
    }>;

}

const Select: React.FC<SelectProps> =  ({label, name, options, ...rest}) => {

    return (

        <div className = "select-block">
        <label htmlFor = {name}>{label}</label>
        <select id= {name} {...rest}>
            <option value= "" disabled selected hidden> Selecione alguma opção</option>
            {options.map( Option => {
                return <option key = {Option.id} value= {Option.id}>{Option.label}</option>
            })}
            </select>
    </div>

    );

}

export default Select;
