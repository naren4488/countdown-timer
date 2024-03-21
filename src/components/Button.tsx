type Props = {
  timerStarted: boolean;
  handleClick: () => void;
};

const Button = ({ timerStarted, handleClick }: Props) => {
  return (
    <div className="mt-4 ">
      <button onClick={handleClick} className="border rounded-md p-2">
        {timerStarted ? "Clear Timer" : "Start Timer"}
      </button>
    </div>
  );
};

export default Button;
