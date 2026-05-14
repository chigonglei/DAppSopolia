import {
  useState
} from "react";

function VoteConfirmModal({

  isOpen,

  candidate,

  onConfirm,

  onCancel

}) {

  const [loading, setLoading] =
    useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {

    try {

      setLoading(true);

      await onConfirm();

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="modal-overlay">

      <div className="wallet-modal">

        <div className="verified-badge">

          {
            loading
              ? "Processing..."
              : "Confirm Vote"
          }

        </div>

        <h2>

          {
            loading
              ? "Waiting For Blockchain Confirmation"
              : "Vote Confirmation"
          }

        </h2>

        <p className="wallet-address">

          {
            loading ? (

              <>
                Please confirm the transaction
                in MetaMask.
                <br />
                <br />
                Waiting for blockchain response...
              </>

            ) : (

              <>
                You are voting for:

                <br />
                <br />

                <strong>

                  {
                    candidate?.name ||
                    candidate?.[0]
                  }

                </strong>
              </>
            )
          }

        </p>

        <div className="modal-buttons">

          <button
            className="continue-btn"
            onClick={handleConfirm}
            disabled={loading}
            style={{
              opacity:
                loading ? 0.7 : 1,

              cursor:
                loading
                  ? "not-allowed"
                  : "pointer"
            }}
          >

            {
              loading
                ? "Processing..."
                : "Confirm Vote"
            }

          </button>

          <button
            className="cancel-btn"
            onClick={onCancel}
            disabled={loading}
            style={{
              opacity:
                loading ? 0.5 : 1,

              cursor:
                loading
                  ? "not-allowed"
                  : "pointer"
            }}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}

export default VoteConfirmModal;