import { useCallback } from 'react'

interface IAsset {
    address: string;
    balance: number;
  }



const getTRX = useCallback(
    async (address: string, tronWeb: any) => {
      console.log(address);
      const trx = tronWeb.trx
      if (address !== "") {
        const assets = await trx
          .getAccount(address)
        //   .then((result: IAsset) => setBalance(result.balance * 0.000001));
        return assets;
      }
    },
    []
  );

  export default getTRX