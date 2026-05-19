import {
  useState,
  useEffect
} from "react";

import backgroundImage from "../assets/background.png";

import {
  useNavigate
} from "react-router-dom";

import WalletModal from "../components/WalletModal";

import Navbar from "../components/Navbar";

import {
  getEthereumContract
} from "../services/contract";

function Home() {

  // =========================
  // States
  // =========================

  const [account, setAccount] =
    useState("");

  const [
    tempAccount,
    setTempAccount
  ] = useState("");

  const [
    showModal,
    setShowModal
  ] = useState(false);

  const [
    startTime,
    setStartTime
  ] = useState(0);

  const [
    endTime,
    setEndTime
  ] = useState(0);

  const [
    remainingTime,
    setRemainingTime
  ] = useState(0);

  const [
    electionStatus,
    setElectionStatus
  ] = useState("Loading");

  const [
    candidates,
    setCandidates
  ] = useState([]);

  const [
    totalVotes,
    setTotalVotes
  ] = useState(0);

  const navigate = useNavigate();

  // =========================
  // Load Election Data
  // =========================

  useEffect(() => {

    const loadElectionData =
      async () => {

        try {

          const contract =
            await getEthereumContract();

          if (!contract) return;

          const start =
            Number(
              await contract.startTime()
            );

          const end =
            Number(
              await contract.endTime()
            );

          setStartTime(start);

          setEndTime(end);

          const candidateData =
            await contract.getCandidates();

          setCandidates(candidateData);

          let votes = 0;

          candidateData.forEach(
            (candidate) => {

              votes += Number(
                candidate.voteCount
              );
            }
          );

          setTotalVotes(votes);

        } catch (error) {

          console.log(error);
        }
      };

    loadElectionData();

  }, []);

  // =========================
  // Countdown Timer
  // =========================

  useEffect(() => {

    const timer =
      setInterval(() => {

        const current =
          Math.floor(
            Date.now() / 1000
          );

        if (current < startTime) {

          setElectionStatus(
            "Not Started"
          );

          setRemainingTime(
            startTime - current
          );

        } else if (
          current <= endTime
        ) {

          setElectionStatus(
            "Active"
          );

          setRemainingTime(
            endTime - current
          );

        } else {

          setElectionStatus(
            "Ended"
          );

          setRemainingTime(0);
        }

      }, 1000);

    return () =>
      clearInterval(timer);

  }, [startTime, endTime]);

  // =========================
  // Refresh Votes
  // =========================

  useEffect(() => {

    const refreshVotes =
      setInterval(async () => {

        try {

          const contract =
            await getEthereumContract();

          if (!contract) return;

          const candidateData =
            await contract.getCandidates();

          setCandidates(candidateData);

          let votes = 0;

          candidateData.forEach(
            (candidate) => {

              votes += Number(
                candidate.voteCount
              );
            }
          );

          setTotalVotes(votes);

        } catch (error) {

          console.log(error);
        }

      }, 5000);

    return () =>
      clearInterval(refreshVotes);

  }, []);

  // =========================
  // Format Time
  // =========================

  const formatTime = (
    seconds
  ) => {

    const hours =
      Math.floor(seconds / 3600);

    const minutes =
      Math.floor(
        (seconds % 3600) / 60
      );

    const secs =
      seconds % 60;

    return `
      ${hours}h
      ${minutes}m
      ${secs}s
    `;
  };

  // =========================
  // Connect Wallet
  // =========================

  const connectWallet =
    async () => {

      try {

        if (!window.ethereum) {

          alert(
            "Please install MetaMask"
          );

          return;
        }

        if (
          electionStatus === "Ended"
        ) {

          alert(
            "Voting has ended"
          );

          return;
        }

        const chainId =
          await window.ethereum.request({
            method: "eth_chainId"
          });

        const decimalChainId =
          parseInt(chainId, 16);

        if (
          decimalChainId !== 11155111
        ) {

          alert(
            "Please switch to Sepolia Network"
          );

          return;
        }

        // Request wallet
        const accounts =
          await window.ethereum.request({
            method:
              "eth_requestAccounts"
          });

        // TEMP ONLY
        setTempAccount(
          accounts[0]
        );

        // Show modal
        setShowModal(true);

      } catch (error) {

        console.log(error);

        alert(
          "Wallet connection failed"
        );
      }
    };

  // =========================
  // Disconnect
  // =========================

  const disconnectWallet =
    () => {

      setAccount("");
    };

  // =========================
  // Continue
  // =========================

  const handleContinue =
    () => {

      setAccount(
        tempAccount
      );

      setShowModal(false);

      navigate("/voting");
    };

  // =========================
  // Cancel
  // =========================

  const handleCancel =
    () => {

      setTempAccount("");

      setShowModal(false);
    };

  // =========================
  // UI
  // =========================

  return (

    <div
      className="app"
      style={{
        minHeight: "100vh",

        backgroundImage:
          `linear-gradient(
            rgba(2,6,23,0.72),
            rgba(15,23,42,0.82)
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

      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 20px"
        }}
      >

        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            textAlign: "center"
          }}
        >

          {/* Header */}

          <div
            style={{
              marginBottom: "50px"
            }}
          >

            <div
              style={{
                display: "inline-block",
                padding: "8px 18px",
                borderRadius: "999px",
                background:
                  "rgba(59,130,246,0.15)",

                border:
                  "1px solid rgba(59,130,246,0.3)",

                marginBottom: "20px",

                fontSize: "14px",

                color: "#93c5fd"
              }}
            >
              Ethereum Sepolia Network
            </div>

            <h1
              style={{
                fontSize: "72px",
                fontWeight: "800",
                lineHeight: "1.1",
                marginBottom: "20px"
              }}
            >
              Blockchain
              <br />
              Voting DApp
            </h1>

            <p
              style={{
                fontSize: "22px",
                color: "#cbd5e1",
                maxWidth: "750px",
                margin: "0 auto",
                lineHeight: "1.6"
              }}
            >
              Secure, transparent and decentralized
              digital voting powered by Ethereum
              smart contracts.
            </p>

          </div>

          {/* Dashboard */}

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(auto-fit,minmax(240px,1fr))",

              gap: "25px",

              marginBottom: "50px"
            }}
          >

            <div className="dashboard-card">

              <div className="card-label">
                Election Status
              </div>

              <div
                style={{
                  fontSize: "28px",

                  fontWeight: "700",

                  marginTop: "10px",

                  color:
                    electionStatus === "Active"
                      ? "#22c55e"
                      : electionStatus === "Ended"
                      ? "#ef4444"
                      : "#facc15"
                }}
              >
                {electionStatus}
              </div>

            </div>

            <div className="dashboard-card">

              <div className="card-label">
                Start Time
              </div>

              <div className="card-value">

                {
                  startTime
                    ? new Date(
                        startTime * 1000
                      ).toLocaleString()
                    : "Loading..."
                }

              </div>

            </div>

            <div className="dashboard-card">

              <div className="card-label">
                End Time
              </div>

              <div className="card-value">

                {
                  endTime
                    ? new Date(
                        endTime * 1000
                      ).toLocaleString()
                    : "Loading..."
                }

              </div>

            </div>

            <div className="dashboard-card">

              <div className="card-label">
                Live Countdown
              </div>

              <div
                style={{
                  fontSize: "30px",
                  fontWeight: "700",
                  marginTop: "10px"
                }}
              >
                {
                  formatTime(
                    remainingTime
                  )
                }
              </div>

            </div>

          </div>

          {/* Vote Count */}

          <div
            style={{
              marginBottom: "60px"
            }}
          >

            <h2
              style={{
                fontSize: "42px",
                marginBottom: "30px"
              }}
            >
              Live Vote Count
            </h2>

            <div
              style={{
                display: "grid",

                gridTemplateColumns:
                  "repeat(auto-fit,minmax(240px,1fr))",

                gap: "25px"
              }}
            >

              {
                candidates.map(
                  (
                    candidate,
                    index
                  ) => (

                    <div
                      key={index}
                      className="dashboard-card"
                    >

                      <h3
                        style={{
                          fontSize: "28px",
                          marginBottom: "15px"
                        }}
                      >
                        {candidate.name}
                      </h3>

                      <div
                        style={{
                          fontSize: "52px",
                          fontWeight: "700",
                          color: "#3b82f6"
                        }}
                      >
                        {
                          Number(
                            candidate.voteCount
                          )
                        }
                      </div>

                      <div
                        style={{
                          color: "#94a3b8",
                          marginTop: "10px"
                        }}
                      >
                        Votes
                      </div>

                    </div>
                  )
                )
              }

            </div>

            <div
              style={{
                marginTop: "35px"
              }}
            >

              <h3
                style={{
                  fontSize: "30px"
                }}
              >
                Total Votes:

                <span
                  style={{
                    color: "#22c55e",
                    marginLeft: "12px"
                  }}
                >
                  {totalVotes}
                </span>

              </h3>

            </div>

          </div>

          {/* Buttons */}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap"
            }}
          >

            {
              electionStatus === "Ended" ? (

                <button
                  className="hero-btn"
                  disabled
                  style={{
                    opacity: 0.6,
                    cursor: "not-allowed"
                  }}
                >
                  Voting Ended
                </button>

              ) : !account ? (

                <button
                  className="hero-btn"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>

              ) : (

                <>

                  <button className="wallet-btn">

                    {
                      `${account.slice(0, 6)}...${account.slice(-4)}`
                    }

                  </button>

                  <button
                    className="disconnect-btn"
                    onClick={disconnectWallet}
                  >
                    Disconnect
                  </button>

                  <button
                    className="hero-btn"
                    onClick={handleContinue}
                    disabled={
                      electionStatus !==
                      "Active"
                    }
                  >
                    Vote Now
                  </button>

                </>

              )
            }

          </div>

        </div>

      </div>

      {/* Wallet Modal */}

      <WalletModal

        isOpen={showModal}

        account={tempAccount}

        onClose={handleCancel}

        onContinue={handleContinue}

      />

    </div>
  );
}

export default Home;