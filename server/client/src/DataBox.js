import React from 'react';
import './index.css'

const DataBox = ({title, data}) => {
    return (
        <div className={"box"}>
            <p className={"boxTitle"}>{title}</p>
            <p className={"boxData"}>{data}</p>
        </div>
    );
}

export default DataBox;