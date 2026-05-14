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

  const [electionStatus,
    setElectionStatus] =
    useState("Loading");

  const [showErrorModal,
    setShowErrorModal] =
    useState(false);

  const [showVoteModal,
    setShowVoteModal] =
    useState(false);

  const [selectedCandidate,
    setSelectedCandidate] =
    useState(null);

  const [errorMessage,
    setErrorMessage] =
    useState("");

  const navigate = useNavigate();

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

      if (accounts.length > 0) {

        setAccount(accounts[0]);

      } else {

        navigate("/");
      }

    } catch (error) {

      console.log(error);

      navigate("/");
    }
  };

  const disconnectWallet = () => {

    setAccount("");

    navigate("/");
  };

  const openVoteModal = (candidate) => {

    if (electionStatus === "Ended") {

      setErrorMessage(
        "Election has ended"
      );

      setShowErrorModal(true);

      return;
    }

    setSelectedCandidate(candidate);

    setShowVoteModal(true);
  };

  const vote = async () => {

    try {

      const contract =
        await getEthereumContract();

      if (!contract) return;

      const tx =
        await contract.vote(
          selectedCandidate.index
        );

      await tx.wait();

      setShowVoteModal(false);

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
              (candidate, index) => (

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

      <VoteConfirmModal

        isOpen={showVoteModal}

        candidate={selectedCandidate}

        onConfirm={vote}

        onCancel={() =>
          setShowVoteModal(false)
        }

      />

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