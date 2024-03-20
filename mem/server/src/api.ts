import express, { Express, Request, Response } from "express";
import {
	cosmosNftBalance,
	cosmosTokenBalance,
	getTransaction,
} from "./atoms/balances";
import { verifyCosmosSignature } from "./atoms/verifySigner";

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
	res.send("⚛️ cosmos-molecule ⚛️");
});

app.get(
	"/balance/token/:address/:contract",
	async (req: Request, res: Response) => {
		const { chain, address, contract } = req.params;
		const result = await cosmosTokenBalance(address, contract, chain);
		res.send(result);
		return;
	}
);

app.get(
	"/balance/nft/:address/:contract",
	async (req: Request, res: Response) => {
		const { chain, address, contract } = req.params;
		const result = await cosmosNftBalance(address, contract, chain);
		res.send(result);
		return;
	}
);

app.get("/tx/:txid", async (req: Request, res: Response) => {
	const { txid } = req.params;
	const result = await getTransaction(txid);
	res.send(result);
	return;
});

app.get(
	"/signer/:caller/:message/:signature",
	async (req: Request, res: Response) => {
		const { caller, message, signature } = req.params;
		console.log("caller:", caller);
		console.log("message:", message);
		console.log("signature:", signature);
		const result = await verifyCosmosSignature(caller, signature, message);
		res.send(result);
		return;
	}
);

app.listen(port, () => {
	console.log(`[cosmos-molecule] running on port: ${port}`);
});
