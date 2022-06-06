import React from 'react';

const Btn = ({children, onClick, btnType, type}) => {
    const btnClass = btnType === 'go' ? 'btn' + ' ' + 'go' : btnType === 'back' ? 'btn' + ' ' + 'back' : btnType === 'gray' ? 'btn' + ' ' + 'gray' : 'btn';

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