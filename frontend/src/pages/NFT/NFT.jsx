import React, { useLayoutEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNFTContext } from "../../hooks/useNFTContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-toastify";
import InfoCard from "../../components/InfoCard/InfoCard";
import { FaEthereum } from "react-icons/fa";
import { AiFillEye, AiFillLike, AiFillHeart } from "react-icons/ai";
function NFT() {
  const nav = useNavigate();
  const { user, dispatch } = useAuthContext();
  const { nfts } = useNFTContext();
  const [nft, setNft] = useState("");
  const { nftId } = useParams();
  const [adding, setAdding] = useState(false);
  const addToCart = async () => {
    try {
      setAdding(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/nfts/${nft._id}/addToCart`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (response.ok && json.success) {
        dispatch({
          type: "ADD_TO_CART",
          payload: json.data,
        });
        toast.success(json.message);
      } else {
        toast.error(json.error);
        console.log(json.error);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setAdding(false);
    }
  };
  useLayoutEffect(() => {
    if (!nfts || !user) return;
    const getSingleNft = async () => {
      try {
        const nftRes = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/nfts/${nftId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const nftJson = await nftRes.json();
        if (nftJson.success) {
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/api/users/artist/${nftJson.data.user_id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}}`,
              },
            }
          );
          const json = await response.json();
          if (json.success && response.ok) {
            setNft({
              ...nftJson.data,
              userName: json.data.username,
              userImage: json.data.image,
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSingleNft();
  }, [nftId, nfts, user]);
  if (!nfts || !nft || !user) {
    return null;
  }

  return (
    <div className="nft-container">
      <button className="back-button c-ac1" onClick={() => nav("/collections")}>
        ←
      </button>
      <div className="nft">
        <div className="nft-left">
          <div className="nft-left-img-wrapper">
            <img src={nft.image} alt={nft.name} />
            <div className="infolay">
              <span className="c-ac2">
                <AiFillEye />
                <p>{nft.views.length}</p>
              </span>
              <span className="c-ac1">
                <AiFillLike />
                <p>1</p>
              </span>
            </div>
            <div className="overlay">
              <div className="nft-footer">
                <div className="nft-footer-actions">
                  {user?.shoppingCart.find((nftId) => nftId === nft._id) ? (
                    <button
                      className="btn-box-outline in-cart cart-btn"
                      onClick={() => nav("/cart")}
                    ></button>
                  ) : (
                    <button
                      className="btn-box-primary cart-btn"
                      onClick={addToCart}
                      disabled={adding}
                    >
                      {adding ? "Adding..." : "Add to Cart"}
                    </button>
                  )}
                  <button className="btn-box-outline like-btn">
                    <AiFillHeart />
                  </button>
                </div>
                <div className="nft-footer-info">
                  <span className="c-ac3">
                    <FaEthereum className="c-ac2" />
                    {nft.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="nft-right-body">
            <InfoCard title={"Price"} content={nft.price} accent={"1"} />
            <InfoCard title={"Category"} content={nft.category} accent={"3"} />
            <InfoCard title={"Views"} content={nft.views.length} accent={"2"} />
          </div> */}
        </div>
        <div className="nft-right">
          <div className="nft-right-header">
            <h1>
              {nft.name}
              <span className="c-ac3">{nft.category}</span>
            </h1>
            {/* <p>{nft.desc}</p> */}
            <div className="nft-right-header-info">
              <img src={nft.userImage} alt="nft user" />
              <p className="c-ac2">{nft.userName}</p>
            </div>
          </div>
          <div className="nft-body">
            <p>{nft.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NFT;
