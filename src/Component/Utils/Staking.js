export const stakingContractAddress = "0xe650FA6aa64E70DEecBbE9e5DBF8e2aae90BA5dE";
export const stakingContractAbi = [{ "inputs": [{ "internalType": "contract IERC20", "name": "_Token", "type": "address" }, { "internalType": "contract IERC20", "name": "_LpToken", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "_add", "type": "address" }], "name": "AddNFTContractAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "addr", "type": "address" }], "name": "BPcalculator", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "addr", "type": "address" }], "name": "BPcalculatorforLP", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "LpToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "NFTcontract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "Stake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "StakeLp", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "Token", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "User", "outputs": [{ "internalType": "uint256", "name": "Tamount", "type": "uint256" }, { "internalType": "uint256", "name": "BRAWLPOINT", "type": "uint256" }, { "internalType": "uint256", "name": "Deposit_time", "type": "uint256" }, { "internalType": "uint256", "name": "withdrawnToken", "type": "uint256" }, { "internalType": "uint256", "name": "withdrawnBP", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "UserLP", "outputs": [{ "internalType": "uint256", "name": "Tamount", "type": "uint256" }, { "internalType": "uint256", "name": "BRAWLPOINT", "type": "uint256" }, { "internalType": "uint256", "name": "Deposit_time", "type": "uint256" }, { "internalType": "uint256", "name": "withdrawnToken", "type": "uint256" }, { "internalType": "uint256", "name": "withdrawnBP", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "currentBPforLptoken", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "currentBPforToken", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "redeem", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "redeemforLP", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdrawLPtoken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdrawtoken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]