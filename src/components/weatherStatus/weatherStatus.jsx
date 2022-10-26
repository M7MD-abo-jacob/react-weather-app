import Clear from "./clear/clear";
import Rain from "./rain/rain";
import Snow from "./snow/snow";
import "./weatherStatus.css";

function WeatherStatus(props) {
  const data = props.data.slice(0, -1).toString();
  const dayTime = props.data.slice(-1) === "d";

  document.body.style.backgroundImage = dayTime
    ? "linear-gradient(rgb(112, 210, 255) 10%, #007 100%)"
    : "linear-gradient(#003 10%, #339 100%)";
  // const clear = [01, 02, 03, 04, 50];
  const rain = ["09", "10", "11"];
  const snow = ["13"];

  const status = (data) => {
    if (rain.includes(data)) {
      return <Rain />;
    } else if (snow.includes(data)) {
      return <Snow />;
    } else {
      return <Clear data={dayTime} />;
    }
  };

  return (
    <div className="weather-status">
      {status(data)}
      {/* <Rain />
      <Snow /> */}
      {/* back static clouds */}
      <div className="cloud-l">
        <div className="cl1 cl-gray"></div>
        <div className="cl2 cl-gray"></div>
        <div className="cl3 cl-gray"></div>
      </div>
      <div className="cloud-l2">
        <div className="cl1 cl-gray"></div>
        <div className="cl2 cl-gray"></div>
        <div className="cl3 cl-gray"></div>
      </div>
      <div className="cloud-l3">
        <div className="cl1 cl-gray"></div>
        <div className="cl2 cl-gray"></div>
        <div className="cl3 cl-gray"></div>
      </div>

      {/* middle long moving clouds */}
      <div className="cloud-l cls3" style={{ "--left": "100px" }}>
        <div className="cl1 cl31 cl-whitish"></div>
        <div className="cl2 cl32 cl-whitish"></div>
      </div>
      <div className="cloud-l cls31" style={{ "--left": "400px" }}>
        <div className="cl1 cl31 cl-whitish"></div>
        <div className="cl2 cl32 cl-whitish"></div>
      </div>

      {/* small moving clouds */}
      <div className="cloud-s cl-white"></div>
      <div className="cloud-s cs2 cl-white"></div>
      <div className="cloud-s cs3 cl-white"></div>
    </div>
  );
}

export default WeatherStatus;
