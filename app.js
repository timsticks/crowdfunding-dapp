const {
    Client, PrivateKey, ContractExecuteTransaction, ContractFunctionParameters, AccountId
} = require('@hashgraph/sdk');
require('dotenv').config();

const client = Client.forTestnet();
client.setOperator(AccountId.fromString(process.env.MY_ACCOUNT_ID), PrivateKey.fromString(process.env.MY_PRIVATE_KEY));

document.getElementById('createPresaleForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const tx = new ContractExecuteTransaction()
        .setContractId("0.0.4436342") // Your deployed contract ID
        .setGas(2000000)
        .setPayableAmount(500) // Assuming the creation fee is 500 HBAR
        .setFunction("createPresale", new ContractFunctionParameters()
            .addString(form.tokenName.value)
            .addString(form.aboutToken.value)
            .addAddress(form.tokenID.value)
            .addString(form.tokenSymbol.value)
            .addUint256(Number(form.totalSupply.value))
            .addUint256(Number(form.presaleAllocation.value))
            .addUint256(Number(form.liquidityAllocation.value))
            .addUint256(Number(form.presaleRate.value))
            .addUint256(Number(form.listingRate.value))
            .addUint256(Number(form.softcap.value))
            .addUint256(Number(form.hardcap.value))
            .addUint256(Number(form.min.value))
            .addUint256(Number(form.max.value))
            .addUint256(Number(form.startTime.value))
            .addUint256(Number(form.deadline.value))
            .addString(form.image.value)
            .addBool(form.feeOption.checked)
            .addUint256(Number(form.liquidityPercentage.value))
            .addBool(form.isWhitelisted.checked)
            .addUint256(Number(form.nftTokenId.value))
            .addBool(form.useSaucerSwap.checked)
            .addUint256(Number(form.whitelistDuration.value))
            .addBool(form.burnUnsoldTokens.checked)
        );

    const txResponse = await tx.execute(client);
    const receipt = await txResponse.getReceipt(client);

    alert("Presale created with status: " + receipt.status.toString());
});

document.getElementById('donatePresaleForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const tx = new ContractExecuteTransaction()
        .setContractId("0.0.4436342") // Your deployed contract ID
        .setGas(2000000)
        .setPayableAmount(Number(form.donationAmount.value))
        .setFunction("donateToPresale", new ContractFunctionParameters()
            .addUint256(Number(form.presaleId.value))
        );

    const txResponse = await tx.execute(client);
    const receipt = await txResponse.getReceipt(client);

    alert("Donation made with status: " + receipt.status.toString());
});

document.getElementById('refundPresaleForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const tx = new ContractExecuteTransaction()
        .setContractId("0.0.4436342") // Your deployed contract ID
        .setGas(2000000)
        .setFunction("requestRefund", new ContractFunctionParameters()
            .addUint256(Number(form.refundPresaleId.value))
        );

    const txResponse = await tx.execute(client);
    const receipt = await txResponse.getReceipt(client);

    alert("Refund requested with status: " + receipt.status.toString());
});
