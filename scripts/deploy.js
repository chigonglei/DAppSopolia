import hre from "hardhat";

async function main() {

    console.log("Deploying contract...");

    const Voting = await hre.ethers.getContractFactory("Voting");

    // Current time
    const currentTime =
        Math.floor(Date.now() / 1000);

    // Start now
    const startTime = currentTime;

    // End after 1 hour
    const endTime =
        currentTime + 3600;

    const contract = await Voting.deploy(
        ["DEEPOO", "NITISH", "HITLER"],
        startTime,
        endTime
    );

    await contract.waitForDeployment();

    console.log("==================================");
    console.log("Voting Contract Deployed");
    console.log("==================================");

    console.log(
        "Contract Address:",
        await contract.getAddress()
    );

    console.log(
        "Voting Starts:",
        new Date(startTime * 1000)
    );

    console.log(
        "Voting Ends:",
        new Date(endTime * 1000)
    );

    console.log("==================================");
}

main().catch((error) => {

    console.error(error);

    process.exitCode = 1;
});