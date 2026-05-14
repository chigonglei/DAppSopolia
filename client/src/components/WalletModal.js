function WalletModal({

  isOpen,

  account,

  onClose,

  onContinue

}) {

  if (!isOpen) return null;

  return (

    <div className="modal-overlay">

      <div className="wallet-modal">

        <div className="verified-badge">

          ✓ Verified Wallet
        </div>

        <h2>
          Wallet Connected
        </h2>

        <p className="wallet-address">
          {account}
        </p>

        <div className="modal-buttons">

          <button
            className="continue-btn"
            onClick={onContinue}
          >
            Continue
          </button>

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}

export default WalletModal;