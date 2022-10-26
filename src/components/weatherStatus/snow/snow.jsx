import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import "./snow.css";
import { random } from "../../../reusables/functions";

library.add(faSnowflake);

function Snow() {
  return (
    <div className="snow">
      {(() => {
        const width = document.getElementById("top").offsetWidth;
        const height =
          document.getElementsByClassName("container")[0].offsetHeight / 4;

        const snows = [];
        for (let i = 0; i < width; i += 35) {
          snows.push(
            <span
              style={{
                "--snow-sp": `${random(10, 20)}`,
                "--snow-left": `${random(0, width - 20)}px`,
                "--snow-top": `${random(-10, 30)}px`,
                "--snow-size": `${random(15, 30)}px`,
                "--h": `${height}px`,
              }}
              key={i}
            >
              <FontAwesomeIcon icon="fa-solid fa-snowflake" />
            </span>
          );
        }
        return snows;
      })()}
    </div>
  );
}

export default Snow;
