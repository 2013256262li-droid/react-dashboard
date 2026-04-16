import React from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import { TIMEFRAMES } from './dashboardData';
import s from './TimeframeSelector.module.scss';

const TimeframeSelector = ({ value, onChange }) => {
  return (
    <div className={s.timeframeSelector}>
      <ButtonGroup className={s.timeframeButtonGroup}>
        {TIMEFRAMES.map((timeframe) => (
          <Button
            key={timeframe.value}
            color={value === timeframe.value ? 'primary' : 'secondary'}
            onClick={() => onChange(timeframe.value)}
            className={`${s.timeframeButton} ${value === timeframe.value ? s.active : ''}`}
          >
            {timeframe.label}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default TimeframeSelector;
