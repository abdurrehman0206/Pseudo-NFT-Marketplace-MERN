import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNFTContext } from "../../hooks/useNFTContext";
function NFT() {
  const { nfts } = useNFTContext();
  const [nft, setNft] = useState("");
  const { nftId } = useParams();
  useLayoutEffect(() => {
    if (!nfts) return;
    const getSingleNft = async () => {
      let singleNft = nfts.find((item) => item._id === nftId);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/users/artist/${singleNft.user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const json = await response.json();
        if (json.success && response.ok) {
          console.log(json.data);
          singleNft = {
            ...singleNft,
            userName: json.data.username,
            userImage: json.data.image,
          };
        }
      } catch (error) {
        console.log(error);
      } finally {
        setNft(singleNft);
      }
    };
    getSingleNft();
  }, [nftId, nfts]);
  if (!nfts || !nft) {
    return null;
  }

  return (
    <div className="nft-container">
      <div className="nft">
        <div className="nft-left">
          <div className="triangle"></div>
          <div className="nft-image-wrapper">
            <img src={nft.image} alt={nft.name} />
          </div>
        </div>
        <div className="nft-right">
          <div className="nft-right-header">
            <h1>{nft.name}</h1>
            {/* <p>{nft.desc}</p> */}
            <div className="nft-right-header-info">
              <img src={nft.userImage} alt="nft user" />
              <p className="c-ac2">{nft.userName}</p>
            </div>
          </div>
          <div className="nft-right-body">
            <p>{nft.desc}</p>
          </div>
          <div className="nft-right-footer">
            <div className="nft-right-footer-info">
              <p className="c-ac2">Price: {nft.price}</p>
              <p className="c-ac2">Created: {nft.createdAt}</p>
            </div>
            <div className="nft-right-footer-button"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NFT;
