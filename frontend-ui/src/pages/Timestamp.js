// Timestamp.js
import React, { useEffect, useState } from 'react';

const Timestamp = ({ createdAt }) => {
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    // Calculate the time difference between now and the creation date
    const timeDiff = Date.now() - new Date(createdAt).getTime();

    // Define time units in milliseconds
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    // Determine the appropriate timestamp format
    if (timeDiff < minute) {
      setTimestamp('just now');
    } else if (timeDiff < hour) {
      const minutesAgo = Math.floor(timeDiff / minute);
      setTimestamp(`${minutesAgo} min ago`);
    } else if (timeDiff < day) {
      const hoursAgo = Math.floor(timeDiff / hour);
      setTimestamp(`${hoursAgo} hours ago`);
    } else {
      const daysAgo = Math.floor(timeDiff / day);
      setTimestamp(`${daysAgo} days ago`);
    }
  }, [createdAt]);

  return <span>{timestamp}</span>;
};

export default Timestamp;
