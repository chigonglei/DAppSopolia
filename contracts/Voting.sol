// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }
    address public admin;
    uint256 public startTime;
    uint256 public endTime;

    mapping(address => bool)
        public hasVoted;

    // Allowed voters
    mapping(address => bool)
        public isRegisteredVoter;

    Candidate[] public candidates;

    constructor(
        // Candidates
        string[] memory candidateNames,
        // Allowed wallets
        address[] memory voters,
        uint256 _startTime,
        uint256 _endTime
    ) {
        require(
            _endTime > _startTime,
            "End time must be greater"
        );

        admin = msg.sender;
        startTime = _startTime;
        endTime = _endTime;

        // Add candidates
        for (
            uint256 i = 0;
            i < candidateNames.length;
            i++
        ) {

            candidates.push(
                Candidate(
                    candidateNames[i],
                    0
                )
            );
        }

        // Register voters
        for (
            uint256 i = 0;
            i < voters.length;
            i++
        ) {
            isRegisteredVoter[
                voters[i]
            ] = true;
        }
    }

    function vote(
        uint256 candidateIndex

    ) public {
        require(
            block.timestamp >= startTime,
            "Voting has not started"
        );

        require(
            block.timestamp <= endTime,
            "Voting has ended"
        );

        // Only allowed wallets
        require(
            isRegisteredVoter[msg.sender],
            "Not authorized to vote"
        );

        require(
            !hasVoted[msg.sender],
            "Already voted"
        );

        require(
            candidateIndex < candidates.length,
            "Invalid candidate"
        );

        hasVoted[msg.sender] = true;
        candidates[candidateIndex]
            .voteCount++;
    }

    function getCandidates()
        public
        view
        returns (Candidate[] memory)
    {
        return candidates;
    }

    function getRemainingTime()
        public
        view
        returns (uint256)

    {
        if (
            block.timestamp >= endTime
        ) {
            return 0;
        }
        
        return endTime - block.timestamp;
    }
    function isEligibleVoter(
    address voter
)
    public
    view
    returns (bool)
{
    return isRegisteredVoter[voter];
}
}