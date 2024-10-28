const ethers = require("ethers")
const fs = require("fs-extra")

async function main() {
    // http://127.0.0.1:7545
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545")
    const wallet = new ethers.Wallet("0x4f61a9b2e36156e687e9b5ca0c0da89bf4e87e93dcc8bd79914aa9be1f570384", provider)
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8")
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8")
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying, please wait...");
    const contract = await contractFactory.deploy({ gasPrice:100000000000 });
    // console.log(contract)
    const transactionReceipt = await contract.deployTransaction.wait(1);
    console.log("Here is the deployment transaction: ")
    console.log(contract.deployTransaction)
    console.log("here is the transaction receipt: ")
    console.log(transactionReceipt)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })