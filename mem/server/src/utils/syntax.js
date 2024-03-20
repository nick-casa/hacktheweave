export function _checkCosmosAddrSyntax(address) {
	try {
		// Regular expression for Cosmos addresses
		const cosmosAddrRegex = /^cosmos1[a-z0-9]{38}$/;

		// Use test method to check if the address matches the regex pattern
		assert.equal(cosmosAddrRegex.test(address), true);
	} catch (error) {
		return error;
	}
}
