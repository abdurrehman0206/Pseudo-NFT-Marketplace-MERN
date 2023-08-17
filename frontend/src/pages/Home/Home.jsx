import React, { useLayoutEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import Pane from "../../components/Pane/Pane";
import Loader from "../../components/Loader/Loader";
import { useNFTContext } from "../../hooks/useNFTContext";
import { useUsersContext } from "../../hooks/useUsersContext";
function Home() {
  document.title = "Home";
  const [latestNfts, setLatestNfts] = useState(null);
  const [latestUsers, setLatestUsers] = useState(null);
  const { nfts, loading: nftsLoading } = useNFTContext();
  const { users, loading: usersLoading } = useUsersContext();

  useLayoutEffect(() => {
    if (!nfts || !users) {
      return;
    }
    let newNfts = [];
    let newUsers = [];
    //only add three elements
    for (let i = 0; i < 3; i++) {
      newNfts.push(nfts[i]);
    }
    for (let i = 0; i < 5; i++) {
      newUsers.push(users[i]);
    }
    setLatestNfts(newNfts);
    setLatestUsers(newUsers);
  }, [nfts, users]);
  if (nftsLoading && !nfts) {
    return <Loader />;
  }
  if (!nfts || !users) {
    return null;
  }
  return (
    <div className="home-container">
      <Hero />
      <Pane
        title={"Browse Latest Collections"}
        navTo={"collections"}
        nfts={latestNfts}
        users={null}
        hasButton={true}
      />
      <Pane
        title={"The Digital Fleet"}
        navTo={"artists"}
        users={latestUsers}
        nfts={null}
        hasButton={true}
      />
    </div>
  );
}

export default Home;
