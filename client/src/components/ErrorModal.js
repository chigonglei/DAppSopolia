function ErrorModal({

  isOpen,

  message,

  onClose

}) {

  if (!isOpen) return null;

  return (

    <div className="modal-overlay">

      <div className="wallet-modal">

        <div
          className="verified-badge"
          style={{
            background: "#ef4444"
          }}
        >
          Transaction Failed
        </div>

        <h2>
          Voting Error
        </h2>

        <p className="wallet-address">
          {message}
        </p>

        <button
          className="continue-btn"
          onClick={onClose}
        >
          Close
        </button>

      </div>

    </div>
  );
}

export default ErrorModal;