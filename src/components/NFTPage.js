import React, {useState, useEffect} from 'react';
import NFTCard from "./NFTCard";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const NFTPage = () => {
    const [loadingData, setLoadingData] = useState(true);
    const [nftData, setNFTData] = useState(null);

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
  
    useEffect(() => {
        const url = "https://artcart-mkt.netlify.app/.netlify/functions/get-nfts";
        axios.get(url).then(result => {
            setNFTData(result.data);
            setLoadingData(false);
            console.log(result.data);
        })
    },[]);

    const mapStructure = (node) => {
      if (node) {
          return node.map(node => (
            <Item key={node._id}>
              <NFTCard image_url={process.env.GATSBY_IPFS_GATEWAY+node.image_ipfshash}
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
            </Item>
          ));
      }
    };
  
    if (loadingData) {
      return (
        <h1>Loading...</h1>
      );
    }
  
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} item xs={4}>
                {mapStructure(JSON.parse(JSON.stringify(nftData, null, 2)))}
        </Grid>
      </Box>
    );
  
  }
  
  export default NFTPage;
