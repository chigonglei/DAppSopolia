/* eslint-disable react-hooks/exhaustive-deps */

import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import Navbar from "../components/Navbar";

import CandidateCard from "../components/CandidateCard";

import ErrorModal from "../components/ErrorModal";

import VoteConfirmModal from "../components/VoteConfirmModal";

import {
  getEthereumContract
} from "../services/contract";

import backgroundImage from "../assets/background.png";

function Voting() {

  const [candidates, setCandidates] =
    useState([]);

  const [account, setAccount] =
    useState("");

  const [
    electionStatus,
    setElectionStatus
  ] = useState("Loading");

  const [
    showErrorModal,
    setShowErrorModal
  ] = useState(false);

  const [
    showVoteModal,
    setShowVoteModal
  ] = useState(false);

  const [
    selectedCandidate,
    setSelectedCandidate
  ] = useState(null);

  const [
    errorMessage,
    setErrorMessage
  ] = useState("");

  const [
    successMessage,
    setSuccessMessage
  ] = useState("");

  const [successCountdown, setSuccessCountdown] = useState(10);

  const navigate = useNavigate();

  // Load Candidates
  const loadCandidates = async () => {

    try {

      console.log(
        "Fetching latest blockchain votes..."
      );

      const contract =
        await getEthereumContract();

      if (!contract) return;

      const data =
        await contract.getCandidates();

      console.log(
        "Updated Candidates:",
        data
      );

      setCandidates(data);

      const end =
        Number(
          await contract.endTime()
        );

      const current =
        Math.floor(
          Date.now() / 1000
        );

      if (current > end) {

        setElectionStatus(
          "Ended"
        );

      } else {

        setElectionStatus(
          "Active"
        );
      }

    } catch (error) {

      console.log(error);
    }
  };

  // Load Wallet
  const loadWallet = async () => {

  try {

    if (!window.ethereum) {

      navigate("/");

      return;
    }

    const accounts =
      await window.ethereum.request({
        method: "eth_accounts"
      });

    if (accounts.length === 0) {

      navigate("/");

      return;
    }

    const wallet =
      accounts[0];

    setAccount(wallet);

    // =================================
    // CHECK WHITELIST
    // =================================

    const contract =
      await getEthereumContract();

    if (!contract) return;

    const eligible =
      await contract.isEligibleVoter(
        wallet
      );

    // NOT ELIGIBLE
    if (!eligible) {

      setErrorMessage(
        "❌ This wallet is not authorized to vote."
      );

      setShowErrorModal(true);

      // Redirect after 3 sec
      setTimeout(() => {

        navigate("/");

      }, 3000);

      return;
    }

  } catch (error) {

    console.log(error);

    navigate("/");
  }
};


  // Disconnect Wallet
  const disconnectWallet = () => {

    setAccount("");

    navigate("/");
  };

  // Open Vote Modal
  const openVoteModal = (
    candidate
  ) => {

    if (
      electionStatus === "Ended"
    ) {

      setErrorMessage(
        "Election has ended"
      );

      setShowErrorModal(true);

      return;
    }

    setSelectedCandidate(candidate);

    setShowVoteModal(true);
  };

  // Vote Function
  const vote = async () => {

    try {

      const contract =
        await getEthereumContract();

      if (!contract) return;

      const tx =
        await contract.vote(
          selectedCandidate.index
        );

      // Wait for blockchain confirmation
      await tx.wait();

      // Close modal
      setShowVoteModal(false);

      // Show success popup
      setSuccessMessage(
        `✅ Vote Successful!\nYou voted for ${
          selectedCandidate.name ||
          selectedCandidate[0]
        }`
      );

      // Auto hide after 5 sec
      // Start countdown
setSuccessCountdown(10);

const interval = setInterval(() => {

  setSuccessCountdown((prev) => {

    if (prev <= 1) {

      clearInterval(interval);

      setSuccessMessage("");

      return 0;
    }

    return prev - 1;
  });

}, 1000);

      // Reload latest votes
      loadCandidates();

    } catch (error) {

      console.log(error);

      setShowVoteModal(false);

      setErrorMessage(
        error?.reason ||
        "Transaction failed"
      );

      setShowErrorModal(true);
    }
  };

  // Initial Load
  useEffect(() => {

    loadWallet();

    loadCandidates();

    const interval =
      setInterval(() => {

        loadCandidates();

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <div
      className="app"
      style={{
        minHeight: "100vh",

        backgroundImage:
          `linear-gradient(
            rgba(2,6,23,0.82),
            rgba(15,23,42,0.88)
          ),
          url(${backgroundImage})`,

        backgroundSize: "cover",

        backgroundPosition: "center",

        backgroundRepeat: "no-repeat",

        backgroundAttachment: "fixed",

        color: "white"
      }}
    >

      <Navbar />

      <div className="container">

        <div
          className="hero"
          style={{
            textAlign: "center",
            paddingTop: "80px"
          }}
        >

          <h1
            style={{
              fontSize: "72px",
              fontWeight: "800",
              marginBottom: "20px"
            }}
          >
            Vote Your Candidate
          </h1>

          <p
            style={{
              fontSize: "22px",
              color: "#cbd5e1"
            }}
          >
            Every vote is recorded permanently
            on blockchain
          </p>

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap"
            }}
          >

            {
              account && (

                <button className="wallet-btn">

                  {
                    `${account.slice(0, 6)}...${account.slice(-4)}`
                  }

                </button>
              )
            }

            <button
              className="disconnect-btn"
              onClick={disconnectWallet}
            >
              Disconnect
            </button>

          </div>

          {
            electionStatus === "Ended" && (

              <p
                style={{
                  marginTop: "25px",
                  color: "#ef4444",
                  fontSize: "20px",
                  fontWeight: "700"
                }}
              >
                Election has officially ended.
              </p>
            )
          }

        </div>

        <div
          className="candidate-grid"
          style={{
            marginTop: "60px"
          }}
        >

          {
            candidates.map(
              (
                candidate,
                index
              ) => (

                <CandidateCard
                  key={index}
                  candidate={candidate}
                  index={index}
                  vote={() =>
                    openVoteModal({
                      ...candidate,
                      index
                    })
                  }
                />
              )
            )
          }

        </div>

      </div>

      {/* Success Popup */}

      
  {
  successMessage && (

    <div className="success-overlay">

      <div className="success-modal">

        <div className="success-badge">

          Vote Successful

        </div>

        {
          successMessage
            .split("\n")
            .map((line, index) => (

              <div
                key={index}
                className="success-line"
              >

                {line}

              </div>
            ))
        }

        <div className="success-close">

          Closing in {successCountdown}s...

        </div>

      </div>

    </div>
  )
  }
 

      {/* Vote Modal */}

      <VoteConfirmModal

        isOpen={showVoteModal}

        candidate={selectedCandidate}

        onConfirm={vote}

        onCancel={() =>
          setShowVoteModal(false)
        }

      />

      {/* Error Modal */}

      <ErrorModal

        isOpen={showErrorModal}

        message={errorMessage}

        onClose={() =>
          setShowErrorModal(false)
        }

      />

    </div>
  );
}

export default Voting;