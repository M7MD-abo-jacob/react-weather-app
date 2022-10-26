import "./clear.css";

function Clear(props) {
  const data = props.data;
  const color = data ? "rgb(246, 181, 27)" : "#d5fbfc";
  const shadow = data
    ? `0 0 3rem 0.9rem ${color}, 0 0 1rem 0.1rem ${color}`
    : `0 0 0.9rem 0.3rem ${color}`;
  return (
    <div
      className={`sun ${data ? "" : "moon"}`}
      style={{
        "--sun-color": color,
        boxShadow: shadow,
      }}
    ></div>
  );
}

export default Clear;
