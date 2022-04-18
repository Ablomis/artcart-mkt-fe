import React, {useState, useEffect} from 'react';
import NftCard from "./NftCard";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import axios from 'axios';

const NFTPage = () => {
    const [loadingData, setLoadingData] = useState(true);
    const [nftData, setNFTData] = useState(null);
  
    useEffect(() => {
        const url = "https://artcart-mkt.netlify.app/.netlify/functions/get-nfts";
        fetch(url).then(res => res.json()).then(json => {
            setNFTData(json);
            setLoadingData(false);
        })
      },[]);

    const mapStructure = (node) => {
      if (node) {
          return node.map(node => (
            <ListItem key={node._id}>
              <NftCard image_url={process.env.GATSBY_IPFS_GATEWAY+node.image_ipfshash}
                id={node._id}
                name={node.name}
                author_wallet={node.author_wallet}
                meta_ipfshash={node.meta_ipfshash}
                nftAddress={node.nft_address}
                nftID={node.nft_id}
                rarible_url={node.rarible_url}
                status={node.status}
                network={node.network}
              />
            </ListItem>
          ));
      }
    };
  
    if (loadingData) {
      return (
        <h1>Loading...</h1>
      );
    }
  
    return (
      <div>
          {nftData};
      </div>
    );
  
  }
  
  export default NFTPage;
