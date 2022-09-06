import * as React from "react";
import { useBlockchainContext } from "./BlockchainContext";
import { ethers } from "ethers";
import { ContractWriteModal } from "./ContractWriteModal";

export const MintModal = () => {
  const { contractConnection } = useBlockchainContext();

  const [mintFeeEth, setMintFeeEth] = React.useState<string>("");

  React.useEffect(() => {
    contractConnection &&
      contractConnection._mintFee().then((result: number) => {
        const fee = result / 10 ** 17;
        setMintFeeEth(fee.toString());
      });
  }, [contractConnection]);

  const getBody = () => {
    return (
      <span>
        Pathfinder costs {mintFeeEth} ETH to mint. You may only mint one token
        per person. Ready to mint? Note that this action requires Metamask.
      </span>
    );
  };

  const mintToken = (writeConn: ethers.Contract) => {
    return writeConn.mint(false, {
      value: ethers.utils.parseEther(mintFeeEth),
    });
  };

  return (
    <ContractWriteModal
      triggerButtonText="Mint"
      triggerButtonColorScheme="yellow"
      header="Mint a token"
      confirmButtonText="Mint"
      inProgressMessage="minting..."
      successMessage="Minted!"
      modalBody={getBody()}
      callContract={mintToken}
    />
  );
};
