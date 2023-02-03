import React, { useEffect, useState } from "react";
import { Text } from "styles/font.styles";

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
      if (seconds === 60) {
        setMinutes((minutes) => minutes + 1);
        setSeconds(0);
      }
      if (minutes === 60) {
        setMinutes(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div>
      <Text weight={"400"}>
        {hours > 0 ? ` ${hours} hours` : null}
        {minutes > 0 ? `${minutes} min ` : null}
        {seconds} sec
      </Text>
    </div>
  );
};

export default Timer;
