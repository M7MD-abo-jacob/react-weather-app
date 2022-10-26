import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";
import "./dayHour.css";

library.add(faDroplet);

function DayHour(props) {
  const data = props.data;

  return (
    <div className="hour">
      <div>
        <p className="bold">{data.time}</p>
        <img src={data.icon} alt={"weather status icon"} />
        <p className="bold">{data.temp}°</p>
        <p>
          <FontAwesomeIcon icon="fa-solid fa-droplet" /> {data.humidity}%
        </p>
      </div>
    </div>
  );
}

export default DayHour;
