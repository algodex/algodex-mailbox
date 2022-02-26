
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
int 1

int 9123129
pop

return
`
    return escrowTemplate;
    }

}

module.exports = escrowTemplate;
