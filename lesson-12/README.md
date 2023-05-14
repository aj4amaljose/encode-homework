# Hardhat Tokenized Ballot Project

Try running some of the following tasks:

```shell
yarn hardhat compile
yarn run ts-node --files .\scripts\deploy-tokenized-ballot.ts Chocolate Strawberry Vanilla 
```

The deployed ballot contract address:
0x560f047439075088ad9215C503a227eF4F1D08A0
https://sepolia.etherscan.io/address/0x560f047439075088ad9215C503a227eF4F1D08A0

The deployed token contract address: 
0xE94C30598c8e1f330b4DF2f2EdA51a2A3df2898F
https://sepolia.etherscan.io/address/0xE94C30598c8e1f330b4DF2f2EdA51a2A3df2898F

# Result
```
Here is the output of the script:

Signer 1 address: 0x24E12d5Db42EefeC360e02aCc6F82C682e3C264d
Signer 2 address: 0xDf6AE824c6121Ab2022199f9b746eC2324Ad7cf2
Signer 3 address: 0x92B05D2a6CBaF7ADE0c19e516f38Eb1D81254EE7
Proposals:
Proposal N. 1: chocolate
Proposal N. 2: strawberry
Proposal N. 3: vanilla
Proposal N. 4: coconut
myErc20Vote contract was deployed at address 0xE94C30598c8e1f330b4DF2f2EdA51a2A3df2898F at blockNumber: 3484451 at transactionHash: 0xf0918d095d15c27ce7fb4ac1cee3f39e55f5050ab6ab0a280b5ce1c287b77311
Minted 10.0 tokens to the address 0xDf6AE824c6121Ab2022199f9b746eC2324Ad7cf2 at blockNumber: 3484453 at transactionHash:0x849680169419a1b1fa8ccfb292415a40dfbb2390572b30255ae434a511692a9f

0xDf6AE824c6121Ab2022199f9b746eC2324Ad7cf2 delegated at blockNumber: 3484455 at transactionHash: 0x23144b50bfb6d4f69a9f24f645b8b055b949afb9e0e9b21eeaaac7809bfc967f
0xDf6AE824c6121Ab2022199f9b746eC2324Ad7cf2 transfer 3 tokens to 0x92B05D2a6CBaF7ADE0c19e516f38Eb1D81254EE7 at 0x0d81048269663e2b1c3afa9da7f9169581a30969ac84ee3e66a286259dffbcdf      
0x92B05D2a6CBaF7ADE0c19e516f38Eb1D81254EE7 delegated at blockNumber: 3484457 at transactionHash: 0x0d477f401a09e4adebbd0b07a232ec5e6a340a13942dbad8792f45c08503d0c9
sepolia current block:  3484457
Ballot contract was deployed at address 0x560f047439075088ad9215C503a227eF4F1D08A0 at block number
      3484459 at transactionHash: 0x332d2933ace04298bc204eba79c5ea038f9289f4b1262665f6df0589909b88e8
Account 1 voting power before voting: 7.0
0xDf6AE824c6121Ab2022199f9b746eC2324Ad7cf2 has voted 5.0 for chocolate at 0x582ca24240ef3475350db75b930e7d268a903c1542dd06221cd24d2413b5f855
Account1 voting Power after voting 2.0
Account 2 voting power before voting:  3.0
0x92B05D2a6CBaF7ADE0c19e516f38Eb1D81254EE7 has voted 2.0 for strawberry at 0x0e6d2f08aa84f71daf5d0c023dfd2a783f055faecde1c9cca90be174b0ffc2fc
Account 2 voting power after voting 1.0
---------------------------------------------
Account 2 trying to cast more votes than its voting power
Voting error is: transaction failed [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (transactionHash="0x454d3ff8c3526736901969b0854f38e31e53931b08c57cbac38b5cb2ff9d81b0", 
transaction={"type":2,"chainId":11155111,"nonce":16,"maxPriorityFeePerGas":{"type":"BigNumber","hex":"0x5f5e1000"},"maxFeePerGas":{"type":"BigNumber","hex":"0x5f5e1000"},"gasPrice":null,"gasLimit":{"type":"BigNumber","hex":"0x0186a0"},"to":"0x560f047439075088ad9215C503a227eF4F1D08A0","value":{"type":"BigNumber","hex":"0x00"},"data":"0xb384abef00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000001bc16d674ec80000","accessList":[],"hash":"0x454d3ff8c3526736901969b0854f38e31e53931b08c57cbac38b5cb2ff9d81b0","v":0,"r":"0xb7ae4c3a3d894ed974fd196c5fbcb107775474488bf971ce8fa211d01694ca3c","s":"0x0e1f5e5f6d7c2258f82a18cf6e0358a57a4b8fcd9b5240103f196d3fe34f17ca","from":"038Eb1D81254EE7","contractAddress":null,"transactionIndex":7,"gasUsed":{"type":"BigNumber","hex":"0x9841"},"logsBloom":"0x000000000000000000000000000000000000038Eb1D81254EE7","contrac0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","blockHash":"0xe4fd1f3d83e02312b5ee138975ccc270c936983766bc52699d0e9a944f7ce064","transactionHash":"0x454d3ff8c3526736901969b0854f38e31e53931b08c57cbac38b5Hash":"0x454d3ff8c352673cb2ff9d81b0","logs":[],"blockNumber":3484464,"confirmations":1,"cumulativeGasUsed":{"type":"BigNumber","hex":"0x0e44f9"},"effectiveGasPrice":{"type":"BigNumbe,"effectiveGasPrice":{"tr","hex":"0x5f5e1000"},"status":0,"type":2,"byzantium":true}, code=CALL_EXCEPTION, version=providers/5.7.2)
---------------------------------------------
Checking winning Proposal
The winner is chocolate

```
