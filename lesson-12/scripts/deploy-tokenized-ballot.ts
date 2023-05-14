import { ethers } from "hardhat";
// import { Wallet, Signer } from "ethers";
import { TokenizedBallot, TokenizedBallot__factory, MyERC20Vote, MyERC20Vote__factory } from "../typechain-types";
import * as dotenv from 'dotenv'
import { Contract } from "hardhat/internal/hardhat-network/stack-traces/model";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
dotenv.config();

const getMySigners = async (privateKeys: string[]) => {
  const signers = []
  for(let index=0; index < privateKeys.length; index ++){
    const provider = new ethers.providers.EtherscanProvider("sepolia", process.env.ETHERSCAN_API_KEY);
    const wallet = new ethers.Wallet(privateKeys[index]);
    const signer = wallet.connect(provider);
    signers.push(signer);
    console.log(`Signer ${index+1} address: ${signer.address}`);
  }
  return signers;
} 
const MINT_VALUE = ethers.utils.parseUnits("10");

async function main() {
  const provider = new ethers.providers.EtherscanProvider("sepolia", process.env.ETHERSCAN_API_KEY);
  const privateKeys = [process.env.PRIVATE_KEY?? "", process.env.ALICE_PRIVATE_KEY?? "", process.env.ANDY_PRIVATE_KEY?? ""];
  const [deployer, account1, account2] = await getMySigners(privateKeys); 
  const proposals =  process.argv.slice(2);
  console.log("Proposals: ");
  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });

  const myErc20VoteFactory = new MyERC20Vote__factory(deployer);
  const myErc20VoteContract = await myErc20VoteFactory.deploy();
  const myErc20VoteContractReceipt = await myErc20VoteContract.deployTransaction.wait();
  console.log(
    `myErc20Vote contract was deployed at address ${myErc20VoteContract.address} at blockNumber: ${myErc20VoteContractReceipt.blockNumber} at transactionHash: ${myErc20VoteContractReceipt.transactionHash}`
  );
  const mintTx = await myErc20VoteContract.mint(account1.address, MINT_VALUE);
  const mintTxReceipt = await mintTx.wait();
  console.log(`Minted ${ethers.utils.formatUnits(MINT_VALUE)} tokens to the address ${account1.address} at blockNumber: ${mintTxReceipt.blockNumber} at transactionHash:${mintTxReceipt.transactionHash} \n`);

  const account1Delegate = await myErc20VoteContract.connect(account1).delegate(account1.address);
  const account1DelegateReceipt = await account1Delegate.wait();
  console.log(`${account1.address} delegated at blockNumber: ${account1DelegateReceipt.blockNumber} at transactionHash: ${account1DelegateReceipt.transactionHash}`)

  const acc1TransferTx = await myErc20VoteContract.connect(account1).transfer(account2.address, ethers.utils.parseUnits("3"));
  const acc1TransferTxRecipt = await acc1TransferTx.wait();
  console.log(`${account1.address} transfer 3 tokens to ${account2.address} at ${acc1TransferTxRecipt.transactionHash}`);

  const account2Delegate = await myErc20VoteContract.connect(account2).delegate(account2.address);
  const account2DelegateReceipt =await account2Delegate.wait();
  console.log(`${account2.address} delegated at blockNumber: ${account2DelegateReceipt.blockNumber} at transactionHash: ${account2DelegateReceipt.transactionHash}`);
  
 //Ballot contract 
  const latestBlock = await provider.getBlockNumber()
  console.log("sepolia current block: ", latestBlock)
  const ballotFactory = new TokenizedBallot__factory(deployer);
  const ballotContract = await ballotFactory.deploy(
    proposals.map(ethers.utils.formatBytes32String), myErc20VoteContract.address, latestBlock
  );
  const deployTxReceipt = await ballotContract.deployTransaction.wait();
  
  console.log(
    `Ballot contract was deployed at address ${ballotContract.address} at block number
      ${deployTxReceipt.blockNumber} at transactionHash: ${deployTxReceipt.transactionHash}`
  );

  // account 1 
  const account1BeforegetVotes = await myErc20VoteContract.getVotes(account1.address)
  const account1BeforeVotePower = await ballotContract.votingPower(account1.address)
  console.log("Account 1 voting power before voting:", ethers.utils.formatUnits(account1BeforeVotePower));
  
  //account 1 voted 5 votes for proposal 0
  const account1Vote = await ballotContract.connect(account1).vote(0, ethers.utils.parseUnits("5"));
  const account1VoteReceipt = await account1Vote.wait();
  
  
  const acccount1VoteSpent = await ballotContract.votingPowerSpent(account1.address);
  console.log(`${account1.address} has voted ${ethers.utils.formatUnits(acccount1VoteSpent)} for ${proposals[0]} at ${account1VoteReceipt.transactionHash}`);
  const acc1RemainedVotePower = await ballotContract.votingPower(account1.address)
  console.log("Account1 voting Power after voting", ethers.utils.formatUnits(acc1RemainedVotePower));

  //account 2 voting power
  const account2BeforeVotePower = await myErc20VoteContract.getVotes(account2.address)
  console.log("Account 2 voting power before voting: ", ethers.utils.formatUnits(account2BeforeVotePower));
  
  //acount 2 voted 2 votes for proposal 1
  const account2Vote = await ballotContract.connect(account2).vote(1, ethers.utils.parseUnits("2")); 
  const account2VoteReceipt = await account2Vote.wait();

  const acccount2VoteSpent = await ballotContract.votingPowerSpent(account2.address)
  console.log(`${account2.address} has voted ${ethers.utils.formatUnits(acccount2VoteSpent)} for ${proposals[1]} at ${account2VoteReceipt.transactionHash}`);
  const acc2RemainedVotePower = await ballotContract.votingPower(account2.address)
  console.log("Account 2 voting power after voting", ethers.utils.formatUnits(acc2RemainedVotePower));
  
  console.log("---------------------------------------------")
  // Account 2 trying to cast more votes than its voting power
  try {
  console.log("Account 2 trying to cast more votes than its voting power")
  const account2Vote2 = await ballotContract.connect(account2).vote(1, ethers.utils.parseUnits("2"),{
    gasLimit: 100000,
    gasPrice: ethers.utils.parseUnits("1.6", "gwei") //
  }); 
  const account2VoteReceipt2 = await account2Vote2.wait();
  console.log("account2VoteReceipt2 FAILED at transactionHash: ", account2VoteReceipt2.transactionHash)
  } catch(error: any){console.log(`Voting error is: ${error.message}`)};
  

  // Checking the Winning proposal
  console.log("---------------------------------------------")
  console.log("Checking winning Proposal")
  await ballotContract.winningProposal();
  const winner = await ballotContract.winnerName();
  console.log(`The winner is ${ethers.utils.parseBytes32String(winner)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});