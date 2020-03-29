import React from 'react';
import { ChildrenProps } from '../global';
import '../styles/gridContainer.scss';
export default (props: ChildrenProps) => {
    return (
        <div className="grid-container">
            {props.children}
        </div>
    )
}