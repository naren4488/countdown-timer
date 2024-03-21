type Props = {
  handleChange: (dateAndTime: string) => void;
  value: string;
};
const DateTimePicket = ({ handleChange, value }: Props) => {
  return (
    <div className=" mt-4 ">
      <input
        className="border p-2 rounded-md bg-transparent"
        type="datetime-local"
        onChange={(e) => handleChange(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default DateTimePicket;
