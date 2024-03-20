/*

Developed By: Nickolas Casalinuovo

Design Specifications:
A molecule which takes a Cosmos wallet address + signature and
verifies that the signed message came from the wallet address
passed to MEM (see EVM auth example)

*/

export async function handle(state, action) {
	const input = action.input;

	const signatures = state.results.map((el) => el.signature);
	const cosmos_molecule_endpoint = state.cosmos_molecule_endpoint;

	if (input.function === "register") {
		const caller = input.caller;
		const signature = input.signature;

		ContractAssert(caller && signature, "missing required arguments");
		ContractAssert(
			!signatures.includes(signature),
			"error signed message used"
		);

		const message = btoa("hello world");
		await _moleculeSignatureVerification(caller, message, signature);
		state.results.push({ caller, signature });
		return { state };
	}

	async function _moleculeSignatureVerification(caller, message, signature) {
		try {
			const isValid = await EXM.deterministicFetch(
				`${cosmos_molecule_endpoint}/signer/${caller}/${message}/${signature}`
			);
			ContractAssert(isValid.asJSON()?.result, "unauthorized caller");
		} catch (error) {
			throw new ContractError("molecule res error");
		}
	}
}
