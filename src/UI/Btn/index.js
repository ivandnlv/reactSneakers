import React from 'react';

const Btn = ({children, onClick, type}) => {
    const btnClass = type === 'go' ? 'btn' + ' ' + 'go' : type === 'back' ? 'btn' + ' ' + 'back' : type === 'default' ? 'btn' : null;

    return (
        <button
         onClick={onClick}
         type={type}
         className={btnClass}
        >
            {children}
        </button>
    );
};

export default Btn;