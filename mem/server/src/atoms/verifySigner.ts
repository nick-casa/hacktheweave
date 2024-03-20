const {
	Secp256k1,
	Secp256k1Signature,
	pubkeyToAddress,
} = require("@cosmjs/amino");

const { fromBase64, toAscii } = require("@cosmjs/encoding");

/**
 * Verifies that the signed message came from the Cosmos wallet address.
 *
 * @param {string} address - The Cosmos wallet address.
 * @param {string} signedMessage - The signed message, expected to be in base64 format.
 * @param {string} message - The original message that was signed.
 * @return {Promise<boolean>} - True if the signature is valid, false otherwise.
 */
export async function verifyCosmosSignature(
	address: string,
	signedMessage: string,
	pubKey: string,
	message: string
): Promise<boolean> {
	try {
		// Decode the signature
		const signature = Secp256k1Signature.fromFixedLength(
			fromBase64(signedMessage)
		);
		const messageBytes = toAscii(message);

		// Convert the public key from base64 to a Uint8Array.
		const pubKeyUint8Array = fromBase64(pubKey);

		// Verify the signature
		const valid = await Secp256k1.verifySignature(
			signature,
			messageBytes,
			pubKeyUint8Array
		);

		// Verify the address corresponds to the public key
		const derivedAddress = pubkeyToAddress(pubKeyUint8Array, "cosmos");

		// Check if derived address matches the provided address and signature is valid
		return valid && derivedAddress === address;
	} catch (error) {
		console.error("Error verifying signature:", error);
		return false;
	}
}
