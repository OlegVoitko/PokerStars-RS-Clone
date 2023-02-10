import React, { FC } from 'react';
// import React, {ChangeEvent, FC} from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { BLIND_SIZE } from '../../utils/constants';

const PrettoSlider = styled(Slider)({
  color: '#F02F17',
  height: 40,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 35,
    width: 35,
    backgroundColor: 'white',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 16,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

interface CustomizedSlider {
  currentValue: number;
  minValue: number;
  maxValue: number;
  setCurrentValue: React.Dispatch<React.SetStateAction<number>>;
}

const CustomizedSlider: FC<CustomizedSlider> = ({
  currentValue,
  setCurrentValue,
  minValue,
  maxValue,
}) => {
  return (
    <Box sx={{ width: 320 }}>
      <PrettoSlider
        valueLabelDisplay='auto'
        aria-label='pretto slider'
        defaultValue={BLIND_SIZE}
        step={10}
        value={currentValue}
        min={minValue}
        max={maxValue}
        onChange={(_, x) => setCurrentValue(x as number)}
      />
    </Box>
  );
};

export default CustomizedSlider;
