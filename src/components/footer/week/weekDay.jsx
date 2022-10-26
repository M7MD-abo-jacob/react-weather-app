import "./weekDay.css";

function WeekDay(props) {
  const data = props.data;
  const date = new Date(data.date);

  let options = { weekday: "short", day: "numeric", month: "numeric" };
  let day = Intl.DateTimeFormat("en", options).format(date);

  return (
    <div className="day">
      <div className="day-name">
        <p>{`${day}`} </p>
      </div>
      <div className="day-temp">
        <p className="bold">
          {data.temp_max}°/{data.temp_min}°
        </p>
      </div>
      <div className="day-status">
        <img src={data.icon1} alt={"day weather status icon"} />{" "}
        <img src={data.icon2} alt={"night weather status icon"} />
      </div>
    </div>
  );
}

export default WeekDay;
