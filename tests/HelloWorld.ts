import { expect } from "chai"
import {ethers} from "hardhat";
import { HelloWorld } from "../typechain-types";

describe("HelloWorld", () =>{
    let helloWorldContract: HelloWorld;
    beforeEach(async ()=>{
      const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
      helloWorldContract = await helloWorldFactory.deploy() as HelloWorld;
      await helloWorldContract.deployed();
    });
    it("Should give a Hello World", async function () {        
        const hellowWorldText = await helloWorldContract.helloWorld();
        expect(hellowWorldText).equal("Hello World");
      });
    
      it("Should set owner to deployer account", async function () {
        // https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html#helpers
        const accounts = await ethers.getSigners();
        // https://docs.ethers.io/v5/api/contract/contract/#Contract-functionsCall
        const contractOwner = await helloWorldContract.owner();
        // https://www.chaijs.com/api/bdd/#method_equal
        expect(contractOwner).to.equal(accounts[0].address);
      });

      it("Should execute transferOwnership correctly", async function () {
        const accounts = await ethers.getSigners();
        const newOwner = accounts[1].address;
        await helloWorldContract.transferOwnership(newOwner);
        const contractOwner = await helloWorldContract.owner();
        expect(contractOwner).to.equal(newOwner);                
      });

      it("Should not allow anyone other than owner to change text", async function () {
        const accounts = await ethers.getSigners();
        await expect(
          helloWorldContract
            .connect(accounts[1])
            .setText("Hello there")
        ).to.be.revertedWith("Caller is not the owner");
      });

      it("Should change text correctly", async function () {
        await helloWorldContract.setText("Hello There");
        const contractText = await helloWorldContract.helloWorld();
        expect(contractText).to.equal("Hello There");  
      });

      it("Should change text correctly: connected", async function () {
        const accounts = await ethers.getSigners();
        await helloWorldContract.connect(accounts[0]).setText("GoodMorningWorld")
        const helloWorldText = await helloWorldContract.helloWorld();
        expect(helloWorldText).to.equal("GoodMorningWorld");
        //helloWorldContract.connect(accounts[0]).setText("Good Day");
        //const contractText = await helloWorldContract.helloWorld();
        //expect(contractText).to.equal("Good Day");  
      });

      it("Should change text correctly: connected 2", async function () {
        const accounts = await ethers.getSigners();
         helloWorldContract.connect(accounts[0]).setText("Good Day");
        const contractText = await helloWorldContract.connect(accounts[0]).helloWorld();
        expect(contractText).to.equal("Good Day");  
      });

});