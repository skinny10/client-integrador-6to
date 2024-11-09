import "./ui.css";

export function Button({ onClick, children }) {
  return (
    <button className="ui-btn" onClick={onClick}>
      {children}
    </button>
  );
}
