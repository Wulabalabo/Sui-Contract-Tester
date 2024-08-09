import { bcs } from "@mysten/sui/bcs";
import { Transaction } from "@mysten/sui/transactions"
import { isValidSuiAddress } from "@mysten/sui/utils";


export const getPTB = (sender: string, gasBudget: number = 1000_000_000): Transaction => {
    if (!isValidSuiAddress(sender)) {
        throw new Error("sender must be a valid sui address")
    }
    const tx = new Transaction()
    tx.setGasBudget(gasBudget)
    tx.setSender(sender);
    // {Add Transaction}
    const Todolist = tx.moveCall({
        target: "0xb1b1dfb35c431f0f617fd0089db65726905d584d359785a38b4b7f1a89eadaa4::todolist::newtodlist",
        arguments:[
            
        ]
    })
    tx.transferObjects([Todolist[0]], sender)

    return tx;
}