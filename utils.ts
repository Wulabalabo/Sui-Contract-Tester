import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { fromHEX, fromB64 } from "@mysten/sui/utils";
import dotenv from "dotenv";
import * as fs from "fs";

export interface IObjectInfo {
    type: string | undefined
    id: string | undefined
}

export interface IConfigInfo {
    network: string | undefined
    packages: IObjectInfo[]
}

type Network = "testnet" | "mainnet" | "devnet";

dotenv.config();

export const keypair = Ed25519Keypair.fromSecretKey(fromHEX(process.env.PRIVATE_KEY!));

export const getId = (type: string): string | undefined => {
    try {
        const rawData = fs.readFileSync(process.env.COFIG_FILE_PATH!, 'utf8');
        const parsedData: IObjectInfo[] = JSON.parse(rawData);
        const typeToId = new Map(parsedData.map(item => [item.type, item.id]));
        return typeToId.get(type);
    } catch (error) {
        console.error('Error reading the created file:', error);
    }
}

export const useSuiClient = (network:Network = "testnet"):SuiClient => {
    console.log("setting suiClient ....")
    const client = new SuiClient({ url: getFullnodeUrl(network) })
    return client
}
