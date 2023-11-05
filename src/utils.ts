// import { Buffer } from 'buffer';
// eslint-disable-next-line
import { 
  CashAddressType,
  decodeCashAddress, 
  decodeCashAddressFormatWithoutPrefix, 
  encodeCashAddress,
  isHex,
  hexToBin,
  // binToHex,
  CashAddressNetworkPrefix,
  // cashAddressTypeBitsToType,
  decodeCashAddressVersionByte,
  // swapEndianness,
vmNumberToBigInt
} from '@bitauth/libauth'
import type { UtxoI } from 'mainnet-js/dist/module/interface';
import type { IdentitySnapshot } from 'mainnet-js/dist/module/wallet/bcmr-v2.schema';

export interface Token {
    id: string,
    amount: number,
    utxos: UtxoI[],
    bcmr: IdentitySnapshot | undefined
  }

export function isValidAddress(addr: string): boolean | string {
    if (addr.includes(":")) {
      const decodedCashAddress = decodeCashAddress(addr);
      if (typeof decodedCashAddress === "string") {
        return decodedCashAddress;
      }
    } else {
      const decodedCashAddress = decodeCashAddressFormatWithoutPrefix(addr);
      if (typeof decodedCashAddress === "string") {
        return decodedCashAddress;
      }
    }
    
    return true;
  }

export function formatCashAddress(addr: string): string {
    let encodedCashAddress;
    if (addr.includes(":")) {
        const decodedCashAddress = decodeCashAddress(addr);
        if (typeof decodedCashAddress  === "string" ) {
            throw new Error(decodedCashAddress);
        } else {
            encodedCashAddress = encodeCashAddress(
                decodedCashAddress.prefix as CashAddressNetworkPrefix, 
                CashAddressType.p2pkh, 
                decodedCashAddress.payload
                );
        }
        
    } else {
        const decodedCashAddress = decodeCashAddressFormatWithoutPrefix(addr);
        if (typeof decodedCashAddress === "string") {
            throw new Error(decodedCashAddress);
        } else {
            const info = decodeCashAddressVersionByte(decodedCashAddress.version);
            if (typeof info === "string") throw new Error(info);
            // const type = cashAddressTypeBitsToType[
            //     info.typeBits as keyof typeof cashAddressTypeBitsToType
            //   ] as CashAddressType | undefined;
            // if (type === undefined) {
            //   throw Error("Wrong cashaddress type");
            // }
            encodedCashAddress = encodeCashAddress(
                decodedCashAddress.prefix as CashAddressNetworkPrefix, 
                // type, 
                CashAddressType.p2pkh,
                decodedCashAddress.payload
                );
        }
    }

    return encodedCashAddress;
}

export function isTokenID(input: string): boolean {
    if(isHex(input)){
        const uint8arr = hexToBin(input)
        console.log(`uint8arr.length: ${uint8arr.length}`)
        if(uint8arr.length === 32) {
            return true
        }
    }

    return false    
}

export function calcNftId(commitmentHex: string): number | string {
  const commitmentNumber = Number(vmNumberToBigInt(hexToBin(commitmentHex)));

  let result: string | number = commitmentNumber + 1

  if (commitmentNumber < 0) {
    result = `X${commitmentHex}`.toUpperCase()
  }

  return result
}


// export function validateAddress(address: string, callback: Function) {
//     // console.log("validateAddress input:", address);
//     let error;
//     let encodedCashAddress;
//     if (address.slice(0, 12) === 'bitcoincash:' || address.slice(0, 13) === 'simpleledger:' || address.slice(0, 8) === 'testnet:') {
//         let decodedCashAddress = decodeCashAddress(address);
//         if (typeof (decodedCashAddress) === 'string') {
//             error = decodedCashAddress;
//         } else {
//             encodedCashAddress = encodeCashAddress(decodedCashAddress.prefix, decodedCashAddress.version, decodedCashAddress.hash);
//         }
//     } else {
//         let decodedCashAddress = decodeCashAddressFormatWithoutPrefix(address);
//         if (typeof (decodedCashAddress) === 'string') {
//             error = decodedCashAddress;
//         } else {
//             encodedCashAddress = encodeCashAddress(decodedCashAddress.prefix, decodedCashAddress.version, decodedCashAddress.hash);
//         }
//     }

//     callback(error, encodedCashAddress);
// }

// export function slpToBchAddress(address) {
//     let decodedCashAddress = decodeCashAddress(address);
//     let encodedCashAddress = encodeCashAddress("bitcoincash", decodedCashAddress.version, decodedCashAddress.hash);

//     return encodedCashAddress;
// }

// export function bchToSlpAddress(address) {
//     let decodedCashAddress = decodeCashAddress(address);
//     let encodedCashAddress = encodeCashAddress("simpleledger", decodedCashAddress.version, decodedCashAddress.hash);

//     return encodedCashAddress;
// }



// export function sleep(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }

// export const changeEndianness = (string) => {
//     if(isHex(string)){
//         return swapEndianness(string);
//     } else {
//         return "error"
//     }
    
// }


// /* Convert Uint8 Array to hex and reverse endianness */
// export const reverseUint8arrIntoHex = (uint8Array) => {
//     let hex = binToHex(uint8Array)
//     let reversed = swapEndianness(hex);

//     return reversed;
// }


// /* Reverse endianness of hex string and convert into Uint8 array */
// export const reverseHexIntoUint8arr = (string) => {
//     let reversed = swapEndianness(string);
//     let uint8arr = hexToBin(reversed);
//     return uint8arr;
// }

// /**
//  * 
//  * @param {*} tx a bchrpc_pb.Transaction()
//  * @returns sum of outputs value in sats
//  */
// export function calcTxValue(tx) {
//     let value = 0;
//     tx.getOutputsList().forEach(output => {
//         value += output.getValue();
//     });

//     return value;
// }


// /** Convert sats denomination to BCH
//  * 
//  * @param {*} sats value as number denominated in satoshis
//  * @returns value as string denominated in BCH
//  */
// export function asBCH(sats) {
//     let bch = (sats / 100000000).toFixed(8);

//     return bch;
// }