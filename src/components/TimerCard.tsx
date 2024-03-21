type Props = {
  value: number;
  text: string;
};
const TimerCard = ({ text, value }: Props) => {
  return (
    <div className=" shadow-md p-3 text-center bg-gradient-to-r from-sky-600 to-blue-900 rounded-md size-24 flex flex-col items-center justify-center">
      <h2>{value}</h2>
      <p>{text}</p>
    </div>
  );
};

export default TimerCard;
