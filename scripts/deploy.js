import hre from "hardhat";

import fs from "fs";

async function main() {

    console.log(
        "Deploying contract..."
    );

    const Voting =
        await hre.ethers.getContractFactory(
            "Voting"
        );

    // Current time
    const currentTime =
        Math.floor(Date.now() / 1000);

    // Start now
    const startTime =
        currentTime;

    // End after 1 hour
    const endTime =
        currentTime + 3600;

    // Candidates
    const candidates = [

        "X",

        "Y",

        "Z"

    ];

    // Read voters from JSON
    const voters =
        JSON.parse(
            fs.readFileSync(
                "./scripts/voters.json",
                "utf8"
            )
        );

    console.log(
        "\nEligible Voters:"
    );

    console.log(voters);

    // Deploy contract
    const contract =
        await Voting.deploy(

            candidates,

            voters,

            startTime,

            endTime
        );

    await contract.waitForDeployment();

    console.log(
        "\n=================================="
    );

    console.log(
        "Voting Contract Deployed"
    );

    console.log(
        "=================================="
    );

    console.log(
        "Contract Address:",
        await contract.getAddress()
    );

    console.log(
        "=================================="
    );

    console.log(
        "\nCandidates:"
    );

    console.log(candidates);

    console.log(
        "\nVoting Starts:",
        new Date(startTime * 1000)
    );

    console.log(
        "Voting Ends:",
        new Date(endTime * 1000)
    );

    console.log(
        "\n🎉 Deployment Complete!"
    );
}

main().catch((error) => {

    console.error(error);

    process.exitCode = 1;
});