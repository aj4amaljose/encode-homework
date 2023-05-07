# Hardhat Ballot Project

Try running some of the following tasks:

```shell
yarn hardhat compile
yarn run ts-node --files .\scripts\Ballot.ts Chocolate Strawberry Vanilla 
```

The deployed smart contract address: 
https://sepolia.etherscan.io/address/0x4aa1a87d5b37db3b808d7f07175f1f1fb2d8e545

# Result
```
Here is the output of the script:

Signer 1 address: 0x24E12d5Db42EefeC360e02aCc6F82C682e3C264d
Signer 2 address: 0xDf6AE824c6121Ab2022199f9b746eC2324Ad7cf2
Signer 3 address: 0x92B05D2a6CBaF7ADE0c19e516f38Eb1D81254EE7
Deploying Ballot contract
Proposals:
Proposal N. 1: Chocolate
Proposal N. 2: Strawberry
Proposal N. 3: Vanilla
Ballot contract was deployed at address 0x4aa1A87D5B37db3b808D7f07175f1f1fB2d8E545 at block number 3439510
Chairperson for this ballot  0x24E12d5Db42EefeC360e02aCc6F82C682e3C264d
Transaction giveRightToVote to 0xDf6AE824c6121Ab2022199f9b746eC2324Ad7cf2 completed at block 3439511 with hash 0x6f00c1fecbf7ba3df29ff729ef7e786417ca6490bbe77d81cc1e169c0b96af15
Transaction giveRightToVote to 0x92B05D2a6CBaF7ADE0c19e516f38Eb1D81254EE7 completed at block 3439514 with hash 0x25f61a260cf2491dbc0a1f25d76d1e50bdf2755151228e46599e289e3da9493a
Transaction delegate from 0x92B05D2a6CBaF7ADE0c19e516f38Eb1D81254EE7 to 0xDf6AE824c6121Ab2022199f9b746eC2324Ad7cf2 completed at block 3439515 with hash 0xb149b5b9d60a7fa5117ad7097792772bae7398f22acc3cc03ed290f27bf2ad08
0x24E12d5Db42EefeC360e02aCc6F82C682e3C264d has voted Chocolate
0xDf6AE824c6121Ab2022199f9b746eC2324Ad7cf2 has voted Chocolate
Winning proposal index:  0
The winner is Chocolate
```
