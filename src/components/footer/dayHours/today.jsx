import DayHour from "./dayHour";
import "./today.css";

function Today(props) {
  const data = props.data.slice(1);

  return (
    <div className="forcast-h">
      {data.map((hour) => {
        return <DayHour data={hour} key={hour.time} />;
      })}
    </div>
  );
}

export default Today;
