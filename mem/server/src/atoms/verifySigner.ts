import { Buffer } from "buffer";
import { verifyADR36Amino } from "@keplr-wallet/cosmos";

// Function to verify signer
export async function verifySigner(
	address: string,
	message: string,
	signature: string
) {
	try {
		const msg: string = Buffer.from(message, "hex").toString();
		const prefix: string = "cosmos";
		const signatureBuffer: Buffer = Buffer.from(signature, "base64");
		const uint8Signature: Uint8Array = new Uint8Array(signatureBuffer);
		const pubKeyValueBuffer: Buffer = Buffer.from(address, "base64");
		const pubKeyUint8Array: Uint8Array = new Uint8Array(pubKeyValueBuffer);
		const isRecovered: boolean = verifyADR36Amino(
			prefix,
			address,
			msg,
			pubKeyUint8Array,
			uint8Signature
		);
		return isRecovered;
	} catch (error) {
		console.error("Error verifying signer:", error);
		return false;
	}
}
