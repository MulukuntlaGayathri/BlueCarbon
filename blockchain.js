// ---------------- Blockchain Setup ----------------
let provider, signer, carbonToken, carbonRegistry;

// Replace these with your deployed addresses
const CARBON_TOKEN_ADDRESS = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"; 
const CARBON_REGISTRY_ADDRESS = "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2"; 

// 👇 Replace with your full ABIs (single array, not [[]])
const CARBON_TOKEN_ABI =  [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Mint",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "oldMinter",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newMinter",
				"type": "address"
			}
		],
		"name": "MinterChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "minter",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_minter",
				"type": "address"
			}
		],
		"name": "setMinter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
const CARBON_REGISTRY_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_imageHash",
				"type": "string"
			}
		],
		"name": "addProject",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "ngo",
				"type": "address"
			}
		],
		"name": "ProjectAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "credits",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "ngo",
				"type": "address"
			}
		],
		"name": "ProjectVerified",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_credits",
				"type": "uint256"
			}
		],
		"name": "verifyProject",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "projectCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "projects",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "imageHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "carbonCredits",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "ngo",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "verified",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract CarbonToken",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
] ;

async function connectWallet() {
  if (!window.ethereum) {
    alert("❌ MetaMask not found. Install from metamask.io");
    return;
  }
  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();

  carbonToken = new ethers.Contract(CARBON_TOKEN_ADDRESS, CARBON_TOKEN_ABI, signer);
  carbonRegistry = new ethers.Contract(CARBON_REGISTRY_ADDRESS, CARBON_REGISTRY_ABI, signer);

  const addr = await signer.getAddress();
  console.log("✅ Connected:", addr);

  const addrEl = document.getElementById("walletAddress");
  if (addrEl) addrEl.innerText = "Connected: " + addr;
}

// ---------------- NGO Portal ----------------
const ngoForm = document.getElementById('ngoForm');
if (ngoForm) {
  ngoForm.addEventListener('submit', async e => {
    e.preventDefault();
    const ngoName = document.getElementById('ngoName').value;
    const location = document.getElementById('location').value;
    const imageHash = document.getElementById('description').value; // using description field as IPFS/image hash

    try {
      const tx = await carbonRegistry.addProject(ngoName, location, imageHash);
      await tx.wait();
      alert("✅ Project submitted on blockchain!");

      updateInvestorTable();
      updateDashboard();
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting project: " + err.message);
    }

    ngoForm.reset();
  });
}

// ---------------- Investor View ----------------
function updateInvestorTable() {
  const investorTable = document.getElementById('investorTable');
  if (!investorTable) return;

  investorTable.innerHTML = `
    <tr>
      <td>Example NGO</td>
      <td>Goa Coast</td>
      <td>500</td>
      <td>No Image</td>
      <td><button class="btn btn-success btn-sm" onclick="buyCredits('0xYourNGOAddress', 10)">Buy</button></td>
    </tr>`;
}

async function buyCredits(ngo, amount) {
  try {
    const tx = await carbonToken.transfer(ngo, amount);
    await tx.wait();
    alert(`✅ Bought ${amount} credits from ${ngo}`);
    updateInvestorTable();
    updateDashboard();
  } catch (err) {
    console.error(err);
    alert("❌ Purchase failed");
  }
}

// ---------------- Dashboard ----------------
function updateDashboard() {
  const dashboard = document.getElementById('dashboardTable');
  if (!dashboard) return;

  dashboard.innerHTML = `
    <tr>
      <td>Example NGO</td>
      <td>500</td>
      <td>✔ Verified</td>
    </tr>`;
}

// ---------------- Event Listeners ----------------
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("connectWalletBtn");
  if (btn) btn.addEventListener("click", connectWallet);
});
