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

    mapping(address => bool) public hasVoted;

    Candidate[] public candidates;

    constructor(
        string[] memory candidateNames,
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

        for (uint256 i = 0; i < candidateNames.length; i++) {

            candidates.push(
                Candidate(candidateNames[i], 0)
            );
        }
    }

    function vote(uint256 candidateIndex) public {

        require(
            block.timestamp >= startTime,
            "Voting has not started"
        );

        require(
            block.timestamp <= endTime,
            "Voting has ended"
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

        candidates[candidateIndex].voteCount++;
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

        if (block.timestamp >= endTime) {
            return 0;
        }

        return endTime - block.timestamp;
    }
}