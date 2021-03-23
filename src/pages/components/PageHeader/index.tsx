/* eslint-disable react/prop-types */
import React from 'react';
import Input from '../Input';
import './styles.css';

interface PageHeaderProps {
    title: string;
    description?: string;
}

const PageHeader: React.FC <PageHeaderProps> = ({title, description, children}) => {

    return (

        <header className = "page-header">
                <div className = "top-bar-container">
                <Input type="datetime-local" name ="datetime-local" label ="DATA/HORA"/>

                </div>
                <div className = "header-content">
                    <strong>{title}</strong>
                    {description && <p>{description}</p>}
                    {children}

                </div>
            </header>

    )
}

export default PageHeader;
