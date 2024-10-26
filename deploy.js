const ethers = require("ethers")
const fs = require("fs-extra")

async function main() {
    // http://127.0.0.1:7545
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545")
    const wallet = new ethers.Wallet("0x971ced33f59a925b5ff928f4841b2efcade57ee084c9df81080b681c01a2ddb8", provider)
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8")
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8")
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying, please wait...");
    const contract = await contractFactory.deploy();
    console.log(contract)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })