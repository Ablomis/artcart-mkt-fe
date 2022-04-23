import React, {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, CardActionArea, CardActions } from '@mui/material';

const NFTCard = ({image_url, id, name, author_wallet, meta_ipfshash, nftAddress, nftID, rarible_url, status, network}) => {
    const IPFS_GATEWAY = 'https://artcart.mypinata.cloud/ipfs/'
    const [metaData, setMetadata] = useState({});
    const [cardData, setCardData] = useState({
      imageUrl: image_url,
      id: id,
      name: name,
      author_wallet: author_wallet,
      meta_ipfshash: meta_ipfshash,
      nftAddress: nftAddress,
      nftID: nftID,
      status: status,
      network: network,
      rarible_url: rarible_url
    });

    useEffect(() => {
        fetch(IPFS_GATEWAY+cardData.meta_ipfshash).then( resp => resp.json())
        .then((data)=> {
            setMetadata(data);
            console.log(data)
        })
    },[cardData]);
  
    return (
      <Card>
        <Box sx={{ display: 'flex', maxHeight: {xs: '512px', md: '512x'}, maxWidth: {xs: '512px', md: '512px'} }}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={cardData.imageUrl}
              alt=""
            />
            </CardActionArea>
          </Box>
            <CardContent>
            {metaData !== null && <Typography gutterBottom variant="h5" align="left">{metaData.name}</Typography>}
              <Typography variant="body2" color="text.secondary" align="left">{cardData.status + ' ' + cardData.network}</Typography>
            </CardContent>
        <CardActions sx={{ display: 'flex', flexDirection: 'column',  justifyContent: "space-evenly"}}>
            <Button size="small">BUY</Button>
        </CardActions>
      </Card>
    );
  }
  
  export default NFTCard;