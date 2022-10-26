import WeekDay from "./weekDay";
import "./week.css";

function Week(props) {
  const data = props.data.slice(1);
  // console.log(data);

  return (
    <div>
      {data.map((day) => {
        return <WeekDay data={day} key={day.date} />;
      })}
    </div>
  );
}

export default Week;
