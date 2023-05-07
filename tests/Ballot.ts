import { expect } from "chai"
import {ethers} from "hardhat";
import { Ballot } from "../typechain-types";
const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function convertStringArrayToBytes32(array: string[]) {
    const bytes32Array = [];
    for (let index = 0; index < array.length; index++) {
      bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
    }
    return bytes32Array;
  }

describe("Ballot", function () {
    let ballotContract: Ballot;
    beforeEach(async function () {
        
        const ballotFactory = await ethers.getContractFactory("Ballot");
        const prop0 = ethers.utils.formatBytes32String(PROPOSALS[0]);
        ballotContract = await ballotFactory.deploy(
            convertStringArrayToBytes32(PROPOSALS)
        );
        await ballotContract.deployed();
    });
    describe("when the contract is deployed", function () {
      it("has the provided proposals", async function () {
        for (let index = 0; index < PROPOSALS.length; index++) {
            const proposal = await ballotContract.proposals(index);
            expect(ethers.utils.parseBytes32String(proposal.name)).to.eq(
              PROPOSALS[index]
            );
          }
      });
      
      it("has zero votes for all proposals", async function () {
        for (let index = 0; index < PROPOSALS.length; index++) {
            const proposal = await ballotContract.proposals(index);
            expect(proposal.voteCount).to.eq(0);
          }
    });

    it("sets the deployer address as chairperson", async function () {
        const signers = await ethers.getSigners();
        const deployer = signers[1].address;
        const chairperson = await ballotContract.chairperson();
        expect(chairperson).to.equal(deployer);  
    });

    });

    it("sets the voting weight for the chairperson as 1", async function () {
        const signers = await ethers.getSigners();
        const chairpersonVoter = await ballotContract.voters(signers[7].address);
        //console.log(chairpersonVoter);
        expect(chairpersonVoter.weight).to.equal(1);
      });


  });