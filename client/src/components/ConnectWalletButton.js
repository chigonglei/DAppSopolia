function ConnectWalletButton({
  account,
  connectWallet
}) {

  return (
    <button
      className="connect-btn"
      onClick={connectWallet}
    >
      {
        account
          ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
          : "Connect MetaMask"
      }
    </button>
  );
}

export default ConnectWalletButton;