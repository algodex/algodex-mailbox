
////////////////////////////////////////////////
// Alexander Trefonas                         //
// Copyright Algodex VASP (BVI) Corp., 2022   //
// All Rights Reserved.                       //
////////////////////////////////////////////////

const escrowTemplate = {

  getTealTemplate : function () {

    return `
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
bnz redeemFunds

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
gtxn 1 XferAsset
int <assetId> // asset id to fund
==
&&
gtxn 2 XferAsset
int <assetId> // asset id to fund
==
&&
bz notSend
int 1
return

notSend:
// RETURN TO SENDER
// TXN 0 - ESCROW TO RECIPIENT: close out asset
// TXN 1 - ESCROW TO RECIPIENT: close out algos
// TXN 2 - SENDER TO SENDER: 0 send for proof of sender 

global GroupSize
int 3
==
gtxn 0 Sender
txn Sender
==
&&
gtxn 1 Sender
txn Sender
==
&&
gtxn 2 Sender
addr <senderAddr> // sender address
==
&&
gtxn 0 AssetAmount
int 0
==
&&
gtxn 1 Amount
int 0
==
&&
gtxn 2 Amount
int 0
==
&&
gtxn 0 AssetCloseTo
addr <senderAddr> // sender address
==
&&
gtxn 1 CloseRemainderTo
addr <senderAddr> // sender address
==
&&
gtxn 2 CloseRemainderTo
global ZeroAddress
==
&&
gtxn 0 AssetReceiver
addr <senderAddr> // sender address
==
&&
gtxn 1 Receiver
addr <senderAddr> // sender address
==
&&
gtxn 2 Receiver
addr <senderAddr> 
==
&&
gtxn 0 TypeEnum
int axfer
==
&&
gtxn 1 TypeEnum
int pay
==
&&
gtxn 2 TypeEnum
int pay
==
&&
gtxn 0 XferAsset
int <assetId> // asset id to fund
==
&&
assert

int 1
return


redeemFunds:

// REDEEM
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
gtxn 0 AssetAmount
int 0
==
&&
gtxn 1 Amount
int 50000 // .05 algos
==
&&
gtxn 0 AssetCloseTo
addr <receiverAddr> // receiver address for this escrow
==
&&
gtxn 1 CloseRemainderTo
addr <senderAddr> // fee receiver address for this escrow
==
&&
gtxn 0 AssetReceiver
addr <receiverAddr> // receiver address for this escrow
==
&&
gtxn 1 Receiver
addr <feeReceiverAddr> // fee receiver address for this escrow
==
&&
gtxn 0 TypeEnum
int axfer
==
&&
gtxn 1 TypeEnum
int pay
==
&&
gtxn 0 XferAsset
int <assetId> // asset id to fund
==
&&
assert

int 1
return
`
  }

}

module.exports = escrowTemplate
