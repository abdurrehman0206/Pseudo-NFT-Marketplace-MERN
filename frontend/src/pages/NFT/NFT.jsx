import React, { useLayoutEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNFTContext } from "../../hooks/useNFTContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-toastify";
import { FaEthereum } from "react-icons/fa";
import { AiFillEye, AiTwotoneHeart } from "react-icons/ai";
import { BsHeartbreakFill, BsHeartFill } from "react-icons/bs";
import Loader from "../../components/Loader/Loader";
function NFT() {
  const nav = useNavigate();
  const { user, dispatch } = useAuthContext();
  const { nfts } = useNFTContext();
  const [nft, setNft] = useState("");
  const { nftId } = useParams();
  const [adding, setAdding] = useState(false);
  const [liking, setLiking] = useState(false);
  const [loading, setLoading] = useState(false);
  const addToCart = async () => {
    try {
      setAdding(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/nfts/${nft._id}/addToCart`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ nftUserId: nft.user_id }),
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
  const likeNft = async () => {
    try {
      setLiking(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/nfts/${nft._id}/like`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (response.ok && json.success) {
        setNft({
          ...nft,
          likes: json.data.likes,
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
      setLiking(false);
    }
  };
  useLayoutEffect(() => {
    if (!nfts || !user) return;
    const getSingleNft = async () => {
      try {
        setLoading(true);
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
          } else {
            toast.error(json.error);
            console.log(json.error);
          }
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getSingleNft();
  }, [nftId, nfts, user]);
  if (loading && !nft) {
    return <Loader />;
  }
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
              <div className="c-ac2">
                <span>
                  <AiFillEye />
                </span>
                <p>{nft.views.length}</p>
              </div>
              <div className="c-ac1">
                <span>
                  <AiTwotoneHeart />
                </span>
                <p>{nft.likes.length}</p>
              </div>
            </div>
            <div className="overlay">
              <div className="nft-footer">
                <div className="nft-footer-actions">
                  {nft.likes.find((like) => like === user.id) ? (
                    <button
                      className="btn-outline like-btn"
                      onClick={likeNft}
                      disabled={liking}
                    >
                      <BsHeartbreakFill />
                    </button>
                  ) : (
                    <button
                      className="btn-primary like-btn"
                      onClick={likeNft}
                      disabled={liking}
                    >
                      <BsHeartFill />
                    </button>
                  )}
                  {user?.shoppingCart.find((nftId) => nftId === nft._id) ? (
                    <button
                      className="btn-outline in-cart cart-btn"
                      onClick={() => nav("/cart")}
                    ></button>
                  ) : (
                    <button
                      className="btn-primary cart-btn"
                      onClick={addToCart}
                      disabled={adding}
                    >
                      {adding ? "Adding..." : "Add to Cart"}
                    </button>
                  )}

                  <button className="nft-footer-info">
                    {/* <span className="c-ac2"> */}
                    <span>
                      <FaEthereum className="c-ac2" />
                    </span>
                    <span className="c-ac2">{nft.price}</span>
                    {/* </span> */}
                  </button>
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
