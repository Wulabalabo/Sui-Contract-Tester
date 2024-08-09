import { getPTB } from "./execute";
import { useSuiClient,keypair } from "./utils";

const client = useSuiClient();
const tx = getPTB(keypair.getPublicKey().toSuiAddress())
const result = await client.signAndExecuteTransaction({
    signer: keypair,
    transaction:tx,
    options: {
        showEffects: true,
    },
    requestType: "WaitForLocalExecution"
});

console.log("result: ", JSON.stringify(result, null, 2));