import React, {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, CardActionArea, CardActions } from '@mui/material';

const NFTCard = ({image_url, id, name, author_wallet, meta_ipfshash, nftAddress, nftID, rarible_url, status, network}) => {
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
  
    return (
      <Card sx={{ width: '100%', display: 'flex', flexDirection: {xs: 'column', md: 'row'}}}>
        <Box sx={{ display: 'flex', maxHeight: {xs: '500px', md: '140px'}, maxWidth: {xs: '500px', md: '140px'} }}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={cardData.imageUrl}
              alt=""
            />
            </CardActionArea>
          </Box>
          <Box sx={{ display: 'flex', flexGrow: 4}}>
            <CardContent sx={{ flex: '1 0 auto' }}>
            {metaData !== null && <Typography gutterBottom variant="h5" component="div">{metaData.name}</Typography>}
              <Typography variant="body2" color="text.secondary">
                Contract Address: {cardData.nftAddress}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                NFT id: {cardData.nftID}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {cardData.status + ' ' + cardData.network}
              </Typography>
            </CardContent>
        </Box>
        <CardActions sx={{ display: 'flex', flexDirection: 'column',  justifyContent: "space-evenly"}}>
        </CardActions>
      </Card>
    );
  }
  
  export default NFTCard;