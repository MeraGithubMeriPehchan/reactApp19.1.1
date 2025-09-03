import ReactDOM from "react-dom";

// Modal component using React Portal
function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        background: "rgba(0,0,0,0.6)",
        display: "flex", justifyContent: "center", alignItems: "center",
      }}
    >
      <div style={{ background: "white", padding: "20px", borderRadius: "8px" }}>
        {children}
        <br />
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.getElementById("modal-root") // target outside root
  );
}

export default Modal;
