import React from 'react';
import { Inbox } from 'react-bootstrap-icons';
import s from './EmptyState.module.scss';

const EmptyState = ({ title, message, icon: Icon }) => {
  const IconComponent = Icon || Inbox;

  return (
    <div className={s.emptyState}>
      <div className={s.emptyStateIcon}>
        <IconComponent />
      </div>
      <h4 className={s.emptyStateTitle}>{title || 'No Data Available'}</h4>
      <p className={s.emptyStateMessage}>
        {message || 'There is no data available for the selected time period.'}
      </p>
    </div>
  );
};

export default EmptyState;
