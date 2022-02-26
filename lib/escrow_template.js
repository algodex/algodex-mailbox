
//////////////////////////////////
// Alexander Trefonas           //
// 2/26/2022                    //
// Copyright Algonaut Capital   //
// All Rights Reserved.         //
//////////////////////////////////

const escrowTemplate = {

    getTealTemplate : function () {

    let escrowTemplate = `
#pragma version 5

/////////////////////////////////
// CHECKS THAT APPLY TO ALL TXNS
////////////////////////////////
global GroupSize
int 3
<=
assert
txn Fee
global MinTxnFee
==
assert
int 0
store 9

checkAllTxns: // This is basically a for loop that checks all transactions
load 9
gtxns RekeyTo
global ZeroAddress
==
assert
load 9
gtxns AssetSender
global ZeroAddress
==
assert
load 9
int 1
+
store 9
load 9
global GroupSize
<
bnz checkAllTxns


global GroupSize
int 2
==
bnz withdrawFunds

// FUND
// TXN 0 - FUNDER TO ESCROW: pay algo minimum balance into escrow
// TXN 1 - ESCROW TO ESCROW: asset opt-in
// TXN 2 - FUNDER TO ESCROW: asset transfer


global GroupSize
int 3
==
gtxn 0 Sender
txn Sender // not from escrow
!=
&&
gtxn 1 Sender
txn Sender
== // from escrow
&&
gtxn 2 Sender
txn Sender
!= // not from escrow
&&
gtxn 0 Amount
int 250000
>=
&&
gtxn 1 AssetAmount
int 0
==
&&
gtxn 2 AssetAmount
int 1
>=
&&
gtxn 0 CloseRemainderTo
global ZeroAddress
==
&&
gtxn 1 AssetCloseTo
global ZeroAddress
==
&&
gtxn 2 AssetCloseTo
global ZeroAddress
==
&&
gtxn 0 Receiver
txn Sender //Escrow
==
&&
gtxn 1 AssetReceiver
txn Sender //Escrow
==
&&
gtxn 2 AssetReceiver
txn Sender //Escrow
==
&&
gtxn 0 TypeEnum
int pay
==
&&
gtxn 1 TypeEnum
int axfer
==
&&
gtxn 2 TypeEnum
int axfer
==
&&
assert

int 1
return

withdrawFunds:

// WITHDRAW
// TXN 0 - ESCROW TO RECIPIENT: close out asset
// TXN 1 - ESCROW TO RECIPIENT: close out algos

global GroupSize
int 2
==
gtxn 0 Sender
txn Sender
==
&&
gtxn 1 Sender
txn Sender
==
&&
assert

int 1
return
`
    return escrowTemplate;
    }

}

module.exports = escrowTemplate;
