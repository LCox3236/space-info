import React, { useEffect, useState } from "react";
import "./displayInfoBlock.css";

const useCountDown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();
  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  if (countDown < 0) return;
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return (
    <>
      <p className="days">{("0" + days).slice(-2)}:</p>
      <p className="hours">{("0" + hours).slice(-2)}:</p>
      <p className="minutes">{("0" + minutes).slice(-2)}:</p>
      <p className="seconds">{("0" + seconds).slice(-2)}</p>
    </>
  );
};

export function DisplayInfoBlock(data) {
  return (
    <div className="display-info-block">
      <img className="launch-icon" src={data.info.image} />
      <div className="launch-info">
        <p className="launch-name">{data.info.name}</p>
        <p className="launch-provider">
          {data.info.launch_service_provider.name}
        </p>
        <p className="launch-status">{data.info.status.name}</p>
        <p className="launch-eta">{data.info.net}</p>
        <div className="launch-countdown">{useCountDown(data.info.net)}</div>

        {/* <p className="launch-name">{data.info.name}</p> */}
      </div>
    </div>
  );
}
