import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDroplet, faWind } from "@fortawesome/free-solid-svg-icons";
import "./mainWeather.css";

library.add(faDroplet, faWind);

function MainWeather(props) {
  const data = props.data;

  return (
    <div className="main-w">
      <div className="left">
        <div className="name bold">{`${data.name}, ${data.sys.country}`}</div>
        <div className="temp bold">{Math.round(data.main.temp)}°c</div>
      </div>
      <div className="right">
        <div className="bold">{data.weather[0].description}</div>
        <div className="max-min">
          {`feels like`}
          <span className="bold">{` ${Math.round(
            data.main.feels_like
          )}°`}</span>
        </div>
        <div className="hu-wi bold">
          <p>
            <FontAwesomeIcon icon="fa-solid fa-droplet" /> {data.main.humidity}%
          </p>
          <p>
            <FontAwesomeIcon icon="fa-solid fa-wind" />{" "}
            {Math.round(data.wind.speed)}kmh
          </p>
        </div>
      </div>
    </div>
  );
}
export default MainWeather;
