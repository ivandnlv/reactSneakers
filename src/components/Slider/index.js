import {useState} from 'react';
import next from './next.svg';
import slide1 from './slide1.jpg';

const Slider = () => {
    const [transform, setTransform] = useState(0);

    const onNextClick = () => {
        if (transform !== 200) {
            setTransform(prev => prev + 100);
        } else {
            setTransform(0);
        }
    }

    const onPrevClick = () => {
        if (transform !== 0) {
            setTransform(prev => prev - 100);
        } else {
            setTransform(200);
        }
    }

    return (
        <div className='slider'>
            <div className="slider__btns">
                <img src={next} alt="next" className='next' onClick={onNextClick}/>
                <img src={next} alt="next" className='prev' onClick={onPrevClick}/>
            </div>

            <div className="slider__wrapper" >
                <div className="slider__track" style={{transform: `translateX(-${transform}%)`}}>
                    <div className="slider__track-item">
                        <img src={slide1} alt="slide1" />
                    </div>
                    <div className="slider__track-item">
                        <img src={slide1} alt="slide2" />
                    </div>
                    <div className="slider__track-item">
                        <img src={slide1} alt="slide2" />
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Slider;