# Hack The Weave Hackathon

Title: Cosmos Molecule API

Description: A REST API designed for interacting with the Cosmos blockchain. It provides functionalities for retrieving token balances, NFT balances, transaction details, and verifying Cosmos signatures.

## Endpoint

https://hacktheweave.onrender.com

Root Endpoint (/):
Method: GET
Description: Returns a welcome message.
Response: "⚛️ cosmos-molecule ⚛️"

# Token Balance (/balance/token/:address/:contract):

Method: GET
URL Params:
address: The Cosmos address to check the token balance for.
contract: The contract address of the token.
Description: Retrieves the token balance for the specified address and contract.
Response: JSON object containing the balance information.

# NFT Balance (/balance/nft/:address/:contract):

Method: GET
URL Params:
address: The Cosmos address to check the NFT balance for.
contract: The contract address of the NFT collection.
Description: Retrieves the NFT balance for the specified address and contract.
Response: JSON object containing the NFT balance information.

# Transaction Details (/tx/:txid):

Method: GET
URL Params:
txid: The transaction ID to fetch details for.
Description: Retrieves details for the specified transaction.
Response: JSON object containing transaction details.

# Signature Verification (/signer/:caller/:pubkey/:message/:signature):

Method: GET
URL Params:
caller: The Cosmos address of the signer.
pubkey: The public key of the signer in base64 format.
message: The original message that was signed, encoded in base64.
signature: The signature of the message, in base64 format.
Description: Verifies that the signed message came from the specified Cosmos wallet address.
Response: true if the signature is valid, false otherwise.
