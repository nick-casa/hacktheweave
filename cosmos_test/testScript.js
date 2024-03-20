const { Secp256k1HdWallet } = require("@cosmjs/amino");
require("dotenv").config();

const signMessage = async (wallet, message) => {
	const accounts = await wallet.getAccounts();
	const signer = accounts[0].address; // Use the first account

	// Prepare the message as a Uint8Array
	const messageBytes = new TextEncoder().encode(message);

	// Sign the message using the wallet
	const signature = await wallet.signAmino(signer, {
		account_number: "0", // These values depend on actual use and may not be needed for offline signing
		chain_id: "cosmos", // Adjust if you are targeting a different chain
		fee: { amount: [], gas: "200000" }, // Dummy values for offline signing
		memo: "", // No memo for this example
		msgs: [{ type: "sign/MsgSignData", value: { message: messageBytes } }], // Custom type for illustration
		sequence: "0", // This should be the actual sequence number if you are broadcasting
	});

	return signature;
};

const simulateCosmosWallet = async () => {
	const mnemonic = process.env.MNEMONIC;

	if (!mnemonic) {
		throw new Error("Mnemonic is not provided in the environment variables.");
	}

	const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, {
		prefix: "cosmos", // Adjust this prefix if necessary
	});
	let accounts = await wallet.getAccounts();
	const pubkeyHex = Buffer.from(accounts[0].pubkey).toString("base64");

	console.log(pubkeyHex);

	const message = "This is a test message";
	const signature = await signMessage(wallet, message);

	console.log(`Message: ${message}`);
	console.log(signature);
};

simulateCosmosWallet().catch(console.error);
