import { ReactNode, useEffect, useState, useRef, useCallback } from 'react';
import next from './next.svg';

interface ISliderProps {
  children: ReactNode[];
}

// Todo: Сделать автоплей

const Slider = ({ children }: ISliderProps) => {
  const slidesCountRef = useRef(children.length);
  const slidesCount = slidesCountRef.current;
  const transformMax = (slidesCount - 1) * 100;

  const [transform, setTransform] = useState(0);

  useEffect(() => {
    if (transform > transformMax) {
      setTransform(0);
    }
  }, [transform, transformMax]);

  const onNextClick = useCallback(() => {
    setTransform((transform) => transform + 100);
  }, []);

  const onPrevClick = () => {
    if (transform !== 0) {
      setTransform((prev) => prev - 100);
    } else {
      setTransform(transformMax);
    }
  };

  return (
    <div className="slider">
      <div className="slider__btns">
        <img src={next} alt="next" className="next" onClick={onNextClick} />
        <img src={next} alt="next" className="prev" onClick={onPrevClick} />
      </div>

      <div className="slider__wrapper">
        <div className="slider__track" style={{ transform: `translateX(-${transform}%)` }}>
          {children.map((image, i) => (
            <div className="slider__track-item" key={i}>
              {image}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
