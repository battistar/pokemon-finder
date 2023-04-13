import { ChangeEvent } from 'react';

interface DualRangeSliderProps {
  title: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (range: [number, number]) => void;
}

const DualRangeSlider = ({ title, min, max, value, onChange }: DualRangeSliderProps): JSX.Element => {
  const handleChangeLeftThumb = (event: ChangeEvent<HTMLInputElement>): void => {
    const changeValue = parseInt(event.target.value);

    if (changeValue <= value[1] - 20) {
      onChange([changeValue, value[1]]);
    }
  };

  const handleChangeRightThumb = (event: ChangeEvent<HTMLInputElement>): void => {
    const changeValue = parseInt(event.target.value);

    if (changeValue >= value[0] + 20) {
      onChange([value[0], changeValue]);
    }
  };

  return (
    <div className="range">
      <div className="range--title">{title}</div>
      <div className="range--sliders-control">
        <input
          className="range--sliders-control--input"
          type="range"
          value={value[0]}
          min={min}
          max={max}
          onChange={handleChangeLeftThumb}
        />
        <input
          className="range--sliders-control--input"
          type="range"
          value={value[1]}
          min={min}
          max={max}
          onChange={handleChangeRightThumb}
        />
      </div>
      <div className="range--number-control">
        <div className="range--number-control--container">
          <div className="range--number-control--label">Min</div>
          <input className="range--number-control--input" type="number" value={value[0]} min={min} max={max} readOnly />
        </div>
        <div className="range--number-control--container">
          <div className="range--number-control--label max">Max</div>
          <input
            className="range--number-control--input max"
            type="number"
            value={value[1]}
            min={min}
            max={max}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default DualRangeSlider;
