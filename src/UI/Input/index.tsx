import { useState } from 'react';

interface InputProps {
  placeholder: string;
  title: string;
}

const Input: React.FC<InputProps> = ({ placeholder, title }) => {
  const [inputClass, setInputClass] = useState('input__title');

  const onInputFocus = () => {
    if (inputClass.includes('_active')) {
      setInputClass('input__title');
    } else {
      setInputClass('input__title _active');
    }
  };

  return (
    <label className="input">
      <span className={inputClass}>{title}</span>
      <input
        type="text"
        onFocus={onInputFocus}
        onBlur={onInputFocus}
        placeholder={inputClass.includes('_active') ? placeholder : ''}
      />
    </label>
  );
};

export default Input;
