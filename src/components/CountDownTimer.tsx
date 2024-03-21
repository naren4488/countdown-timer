import { useEffect, useState } from "react";
import Button from "./Button";
import DateTimePicker from "./DateTimePicker";
import TimerCard from "./TimerCard";
import mySound from "./../assets/cullingham.mp3";

const CountDownTimer = () => {
  const [dateAndTime, setDateAndTime] = useState("");
  const [isValidate, setIsValidate] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [timer, setTimer] = useState({
    day: 0,
    hour: 0,
    min: 0,
    sec: 0,
  });
  const [timerStarted, setTimerStarted] = useState(false);
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);
  const sound = new Audio(mySound);

  const handleCountDownRunnig = () => {
    const currentTime = new Date();
    const selectedTime = new Date(dateAndTime);
    const diff = selectedTime.getTime() - currentTime.getTime();
    console.log(diff);
    if (diff > 1000) {
      const diffSec = Math.floor(diff / 1000);
      const displaySec = diffSec % 60;
      const diffMin = Math.floor(diffSec / 60);
      const displayMin = diffMin % 60;
      const diffHour = Math.floor(diffMin / 60);
      const displayHour = diffHour % 24;
      const diffDay = Math.floor(diffHour / 24);
      setTimer({
        day: diffDay,
        hour: displayHour,
        min: displayMin,
        sec: displaySec,
      });
    } else {
      sound.play();
      setIsCountdownFinished(true);
      setTimerStarted(false);
      setDateAndTime("");
      localStorage.setItem("countdownTimerValue", "");
      localStorage.setItem("timerStarted", "");
    }
  };

  useEffect(() => {
    const timerValueFromLocalStorage = localStorage.getItem(
      "countdownTimerValue"
    );
    const timerStartedFromLocalStorage = localStorage.getItem("timerStarted");
    if (timerValueFromLocalStorage) {
      setDateAndTime(timerValueFromLocalStorage);
    }
    if (timerValueFromLocalStorage && timerStartedFromLocalStorage) {
      setTimerStarted(true);
    }
  }, []);

  useEffect(() => {
    if (timerStarted) {
      const intervalId = setInterval(handleCountDownRunnig, 1000);
      return () => {
        clearInterval(intervalId);
      };
    } else {
      setTimer({
        day: 0,
        hour: 0,
        min: 0,
        sec: 0,
      });
    }
  }, [dateAndTime, timerStarted]);

  const handleDateAndTimeChange = (selectedDateAndTime: string) => {
    setIsCountdownFinished(false);
    const selectedTime = new Date(selectedDateAndTime).getTime();
    const currentTime = new Date().getTime();
    const daysFromNow = (selectedTime - currentTime) / (1000 * 3600 * 24);
    if (daysFromNow > 99) {
      setIsValidate(false);
      setErrorMessage("Selected time is more than 100 days");
      setDateAndTime("");
    } else if (selectedTime - currentTime < 0) {
      setIsValidate(false);
      setErrorMessage(
        "Selected time has passed already, Please select future time"
      );
      setDateAndTime("");
    } else {
      localStorage.setItem("countdownTimerValue", selectedDateAndTime);
      setDateAndTime(selectedDateAndTime);
      setIsValidate(true);
    }
  };

  const handleStartAndCancelTimer = () => {
    if (timerStarted) {
      setDateAndTime("");
      localStorage.setItem("countdownTimerValue", "");
      localStorage.setItem("timerStarted", "");
      setTimerStarted(false);
    } else {
      if (!dateAndTime) {
        setIsValidate(false);
        setErrorMessage("Please select a time to start the countdown timer");
      } else {
        localStorage.setItem("timerStarted", "true");
        setTimerStarted(true);
      }
    }
  };

  return (
    <div className=" flex justify-center flex-col items-center text-white">
      <h1 className="  text-4xl font-bold">
        Countdown <span className=" text-primary-color">Timer</span>
      </h1>
      <DateTimePicker
        handleChange={handleDateAndTimeChange}
        value={dateAndTime}
      />
      <Button
        timerStarted={timerStarted}
        handleClick={handleStartAndCancelTimer}
      />
      {isValidate ? (
        isCountdownFinished ? (
          <p className="mt-4 text-3xl">{`The countdown is over! What's next on your adventure?`}</p>
        ) : (
          <div className="flex gap-4 mt-4 max-sm:flex-col">
            <TimerCard text="Days" value={timer.day} />
            <TimerCard text="Hours" value={timer.hour} />
            <TimerCard text="Minutes" value={timer.min} />
            <TimerCard text="Seconds" value={timer.sec} />
          </div>
        )
      ) : (
        <p className="mt-4 text-xl">{errorMessage}</p>
      )}
    </div>
  );
};

export default CountDownTimer;
