import { ethers } from "hardhat";
import { Wallet, Signer } from "ethers";
import { Ballot, Ballot__factory } from "../typechain-types";
import * as dotenv from 'dotenv';
import { Contract } from "hardhat/internal/hardhat-network/stack-traces/model";
dotenv.config();

const getMySigners = async (privateKeys: string[]) => {
  const signers: Signer[] = []
  for(let index=0; index < privateKeys.length; index ++){
    const wallet = new ethers.Wallet(privateKeys[index] );
    const provider = new ethers.providers.EtherscanProvider ("sepolia", process.env.ETHERSCAN_API_KEY);
    const signer = wallet.connect(provider);
    signers.push(signer);
    console.log(`Signer ${index+1} address: ${signer.address}`);
  }
  return signers;
  
} 

async function main() {
    
  const privateKeys = [process.env.PRIVATE_KEY?? "", process.env.ALICE_PRIVATE_KEY?? "", process.env.ANDY_PRIVATE_KEY?? ""];
  const [account0, account1, account2] = await getMySigners(privateKeys); 

  const proposals =  process.argv.slice(2);
  console.log("Deploying Ballot contract");
  console.log("Proposals: ");
  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });

  const ballotFactory = new Ballot__factory(account0);
  const ballotContract = await ballotFactory.deploy(
    proposals.map(ethers.utils.formatBytes32String)
  );
  const deployTxReceipt = await ballotContract.deployTransaction.wait();
  console.log(
    `Ballot contract was deployed at address ${ballotContract.address} at block number
      ${deployTxReceipt.blockNumber}`
  );

  const chairperson = await ballotContract.chairperson();
  console.log(`Chairperson for this ballot  ${chairperson}`);
  

  // 1. Give the right to vote
  await giveRightToVote(ballotContract, await account1.getAddress());
  await giveRightToVote(ballotContract, await account2.getAddress());

  // 2. Delegate the vote
  await delegate(ballotContract, account2, await account1.getAddress());

  // 3. Vote for a proposal
  await vote(ballotContract, account0, 0);
  await vote(ballotContract, account1, 0);
  
  // 4. Query the winning proposal
  const winningProp = await ballotContract.winningProposal();
  console.log("Winning proposal index: ", winningProp.toString());
  
  // 5. Query the winner name

  const winner = await ballotContract.winnerName();
  
  console.log(`The winner is ${ethers.utils.parseBytes32String(winner)}`);
}

async function giveRightToVote(contract: Ballot, address: string){
  const giveRightToAliceTx = await contract.giveRightToVote(address);
  const giveRightVoteTxReceipt = await giveRightToAliceTx.wait(); 
  console.log(
    `Transaction giveRightToVote to ${address} completed at block ${giveRightVoteTxReceipt.blockNumber} with hash ${giveRightVoteTxReceipt.blockHash} `
  );
}

async function delegate(contract:Ballot, from:Signer, to:string) {
  const fromSignerContract = contract.connect(from);
  const delegateVoteTx = await fromSignerContract.delegate(to);
  const delegateVoteTxReceipt = await delegateVoteTx.wait();
  console.log(
    `Transaction delegate from ${await from.getAddress()} to ${to} completed at block ${delegateVoteTxReceipt.blockNumber} with hash ${delegateVoteTxReceipt.blockHash} `
  );
}

async function vote(contract: Ballot, signer: Signer, proposalIdx: number){
  const castVoteTx = await contract.connect(signer).vote(proposalIdx);
  await castVoteTx.wait();
  const proposal = await contract.proposals(proposalIdx);
  const name = ethers.utils.parseBytes32String(proposal.name);
  console.log(`${await signer.getAddress()} has voted ${name}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});