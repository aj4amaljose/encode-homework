import { ethers } from "hardhat";
import { MyERC20Vote__factory } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const MINT_VALUE = ethers.utils.parseUnits("10");

async function main() {
    const [deployer, acc1, acc2] = await ethers.getSigners();
      const contractFactory = new MyERC20Vote__factory(deployer);
      const contract  = await contractFactory.deploy();
      const deployTxReceipt = await contract.deployTransaction.wait();
      console.log(
        `The contract was deployed at address ${contract.address} at block number
          ${deployTxReceipt.blockNumber} \n`
      );

      const mintTx = await contract.mint(acc1.address, MINT_VALUE);
      const mintTxReceipt = await mintTx.wait();
      console.log(`Minted ${ethers.utils.formatUnits(MINT_VALUE)} tokens to the address ${acc1.address} at block ${mintTxReceipt.blockHash} \n`);

      const balanceBN = await contract.balanceOf(acc1.address);
      console.log(`Accpunt ${acc1.address} has ${ethers.utils.formatUnits(balanceBN)} MyTokens\n`);

      const voteBefore = await contract.getVotes(acc1.address);
      console.log(`Accpunt ${acc1.address} has ${ethers.utils.formatUnits(voteBefore)} before self delegateting\n`);

      const delegate = await contract.connect(acc1).delegate(acc1.address);
      await delegate.wait();

      const voteAfter = await contract.getVotes(acc1.address);
      console.log(`Accpunt ${acc1.address} has ${ethers.utils.formatUnits(voteAfter)} after self delegateting\n`);

      const transferTx = await contract.connect(acc1).transfer(acc2.address, MINT_VALUE.div(2));
      await transferTx.wait();

      console.log(); ///vote after transfer


      const lastBlock = await ethers.provider.getBlock("latest");
      // console.log(`current block numbr is ${}`);
      // let 







    
}

main().catch((err) => {
	console.error(err);
	process.exitCode = 1;
}	)
