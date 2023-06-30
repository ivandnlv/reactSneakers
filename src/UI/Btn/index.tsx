import React from 'react';

type BtnProps = {
  children?: string;
  onClick: () => void;
  btnType?: 'go' | 'back' | 'gray';
  type?: 'button' | 'submit' | 'reset';
};

const Btn = ({ children, onClick, btnType, type }: BtnProps) => {
  const btnClass = (): string => {
    switch (btnType) {
      case 'back':
        return 'btn back';
      case 'go':
        return 'btn go';
      case 'gray':
        return 'btn gray';
      default:
        return 'btn';
    }
  };

  return (
    <button onClick={onClick} type={type} className={btnClass()}>
      {children}
    </button>
  );
};

export default Btn;
