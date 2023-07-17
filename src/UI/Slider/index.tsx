import { ReactNode, useEffect, useState, useRef, useCallback } from 'react';
import next from './next.svg';
import { getSlides } from '../../service/GetSneakers';
import { ISlide } from '../../models/interfaces/slide';

interface ISliderProps {
  children: ReactNode[];
}

// Todo: Сделать автоплей

const Slider = ({ children }: ISliderProps) => {
  const slidesCountRef = useRef(children.length);
  const slidesCount = slidesCountRef.current;
  const transformStep = 50;
  const transformMax = (slidesCount - 1) * transformStep;

  const [transform, setTransform] = useState(0);
  const [slides, setSlides] = useState<ISlide[] | null>(null);

  useEffect(() => {
    if (transform > transformMax) {
      setTransform(0);
    }
  }, [transform, transformMax]);

  const getSlidesImages = async () => {
    const slides = await getSlides();
    setSlides(slides);
  };

  useEffect(() => {
    getSlidesImages();
  }, []);

  const onNextClick = useCallback(() => {
    setTransform((transform) => transform + transformStep);
  }, []);

  const onPrevClick = () => {
    if (transform !== 0) {
      setTransform((prev) => prev - transformStep);
    } else {
      setTransform(transformMax);
    }
  };

  if (!slides) return null;

  return (
    <div className="slider">
      <div className="slider__wrapper">
        <div className="slider__btns">
          <img src={next} alt="next" className="next" onClick={onNextClick} />
          <img src={next} alt="next" className="prev" onClick={onPrevClick} />
        </div>
        <div className="slider__track" style={{ transform: `translateX(-${transform}%)` }}>
          {slides.map((slide, i) => (
            <div className="slider__track-item" key={i}>
              <img src={slide.imgUrl} alt={slide.imgUrl} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
