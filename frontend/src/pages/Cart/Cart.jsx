import React, { useLayoutEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNFTContext } from "../../hooks/useNFTContext";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
function Cart() {
  document.title = "My Cart";
  const { user, dispatch } = useAuthContext();
  const { nfts, loading: nftsLoading } = useNFTContext();
  const [nftsCart, setNfts] = useState(null);
  const [total, setTotal] = useState(0);
  useLayoutEffect(() => {
    if (!nfts) {
      return;
    }
    // getting all the nfts whose id is in the shoppingCart array and storing them in newArray
    let newArray = [];
    let totalPrice = 0;
    for (let i = 0; i < nfts.length; i++) {
      for (let j = 0; j < user.shoppingCart.length; j++) {
        if (nfts[i]._id === user.shoppingCart[j]) {
          newArray.push(nfts[i]);
          totalPrice += nfts[i].price;
        }
      }
    }
    // setting the newArray to the nfts array
    setNfts(newArray);
    setTotal(totalPrice);
  }, [user.shoppingCart, nfts]);
  const removeFromCart = async (e, nftId, nftUserId) => {
    try {
      e.target.disabled = true;
      e.target.innerHTML = "Removing...";
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/nfts/${nftId}/removeFromCart`,
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
        dispatch({
          type: "REMOVE_FROM_CART",
          payload: json.data,
        });
        toast.success(json.message);
      } else {
        toast.error(json.error);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      e.target.disabled = true;
    }
  };
  if (total === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <h3>
            Your cart is missing the{" "}
            <span className="c-ac1">digital awesomeness</span>
          </h3>
          <NavLink to="/" className="btn-primary">
            Explore
          </NavLink>
        </div>
      </div>
    );
  }
  if (nftsLoading && !nfts) {
    return <Loader />;
  }
  return (
    <div className="cart-container">
      <div className="cart">
        <div className="cart-content">
          <div className="cart-header">
            <h1>Your's To Be</h1>
          </div>
          <div className="cart-items">
            {nftsCart ? (
              nftsCart.map((nft) => (
                <div className="cart-item" key={nft._id}>
                  <img src={nft.image} alt={nft.name} />
                  <div className="cart-item-details">
                    <h3>{nft.name}</h3>
                    <p className="c-ac2">@{nft.artist}</p>
                    <button
                      className="cart-item-remove c-ac1"
                      onClick={(e) => removeFromCart(e, nft._id, nft.user_id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="cart-item-actions">
                    <p> {nft.price} ETH</p>
                  </div>
                </div>
              ))
            ) : (
              <h3>Cart is empty</h3>
            )}
          </div>
        </div>
        <div className="cart-total">
          <div className="cart-total-header">
            <h1>Almost There</h1>
          </div>
          <span className="order-divider">Order Summary</span>
          <div className="cart-total-items ">
            <p>Quantity</p>
            <span>x{user?.shoppingCart.length}</span>
          </div>
          {/* <span className="order-divider"></span> */}
          <div className="cart-total-items total ">
            <p>Total</p>
            <span>{total} ETH</span>
          </div>
          <span className="order-divider">Payment Details</span>
          <div className="cart-total-items">
            <p>Wallet ID</p>
            <input type="text" placeholder="ID" />
          </div>
          <div className="cart-total-items">
            <p>Coupon</p>
            <input type="text" placeholder="Promo" />
          </div>
          <span className="order-divider final"></span>
          <div className="cart-total-items c-ac3 total due">
            <p>Due Today</p>
            <span>{total} ETH</span>
          </div>
          <button className="btn-primary">Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
