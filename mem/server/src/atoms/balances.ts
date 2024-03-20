import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function cosmosTokenBalance(
	address: string,
	token_contract: string,
	chain_id: string
) {
	try {
		const res = await axios.get(
			`https://api.cosmos.network/bank/balances/${address}?denom=${token_contract}&chain_id=${chain_id}`,
			{
				headers: {
					Accept: "application/json",
					// Add any required headers for Cosmos API authentication
				},
			}
		);
		const data = res?.data?.result;
		if (data && data.length > 0) {
			// Assuming the balance is returned as a string in the response
			const balance = parseFloat(data[0].amount);
			console.log("Token Balance:", balance);
			return balance;
		} else {
			console.log("No token balance found for the address.");
			return 0;
		}
	} catch (error) {
		console.log("Error fetching token balance:", error);
		return 0;
	}
}

export async function cosmosNftBalance(
	address: string,
	nft_contract: string,
	chain_id: string
) {
	try {
		// Adjust the API endpoint and request parameters based on the Cosmos NFT API
		// For example, if using the CosmWasm NFT module, the endpoint and parameters will be different
		const res = await axios.get(
			`https://api.cosmos.network/nft/${address}?contract=${nft_contract}&chain_id=${chain_id}`,
			{
				headers: {
					Accept: "application/json",
					// Add any required headers for Cosmos API authentication
				},
			}
		);
		const data = res?.data?.result;
		if (data && data.length > 0) {
			console.log("NFT Balance:", data);
			return { isHolder: true };
		} else {
			console.log("No NFT balance found for the address.");
			return { isHolder: false };
		}
	} catch (error) {
		console.log("Error fetching NFT balance:", error);
		return { isHolder: false };
	}
}

export async function getTransaction(txid: string) {
	try {
		const res = await axios.get(
			`https://docs.cosmos.network/cosmos/tx/v1beta1/txs/${txid}`,
			{
				headers: {
					Accept: "application/json",
					// Add any required headers for Cosmos API authentication
				},
			}
		);
		const data = res?.data?.result;
		console.log("Transaction data:", data);
		return data;
	} catch (error) {
		console.log("Error fetching transaction:", error);
		return null;
	}
}
