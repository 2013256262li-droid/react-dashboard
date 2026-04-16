import React from 'react';
import { Col } from 'reactstrap';
import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';
import Widget from '../../components/Widget';
import s from './StatCard.module.scss';

const StatCard = ({ title, value, growth, icon: Icon, trend, className }) => {
  const isPositive = growth >= 0;
  const trendColor = isPositive ? 'success' : 'danger';
  const TrendIcon = isPositive ? ArrowUp : ArrowDown;

  return (
    <Col sm={6} lg={3} className={className}>
      <Widget className={s.statCard}>
        <div className={s.statCardContent}>
          <div className={s.statCardIcon}>
            {Icon && <Icon />}
          </div>
          <div className={s.statCardInfo}>
            <p className={s.statCardTitle}>{title}</p>
            <h3 className={s.statCardValue}>{value}</h3>
            <div className={`${s.statCardTrend} ${s[`trend-${trendColor}`]}`}>
              <TrendIcon className={s.statCardTrendIcon} />
              <span className={s.statCardTrendValue}>
                {Math.abs(growth)}%
              </span>
              <span className={s.statCardTrendText}>
                vs previous period
              </span>
            </div>
          </div>
        </div>
      </Widget>
    </Col>
  );
};

export default StatCard;
