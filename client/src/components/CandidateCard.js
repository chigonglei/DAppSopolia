function CandidateCard({
  candidate,
  index,
  vote
}) {

  return (
    <div className="candidate-card">

      <h2>
        {candidate.name}
      </h2>

      <p className="vote-count">
        Votes: {candidate.voteCount.toString()}
      </p>

      <button
        className="vote-btn"
        onClick={() => vote(index)}
      >
        Vote Now
      </button>

    </div>
  );
}

export default CandidateCard;