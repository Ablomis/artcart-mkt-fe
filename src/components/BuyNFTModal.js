import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const BuyNFTModal = ({modalOpen, setOpen, cardData, setCardData, setCardState, activeStep, setActiveStep}) => {
    const [price, setPrice] = useState(0);
    const [processing, setProcessing] = useState(false)
    const {user, accessToken} = useAuth0();
    const {currentAcc, raribleSdkRopsten, raribleSdkRinkeby, raribleSdkMainnet} = useEthereumContext();
    const {loadNFTData, loadTransactionData } = useDataContext();
    const [mintingType, setMintingType] = useState(true);
    let raribleSdk
  
    const steps = [
      'Confirm',
      'Pay',
    ];
  
    const handleClose = () => setOpen(false);
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
      handleClose();
    };
  
    const step1Click = () => {
      lazyMint().then(result => {
        handleNext();
      })
    };
  
    const step2Click = () => {
        handleNext();
    };
  
    const step3Click = () => {
      sellOnRarible().then(result => {
        handleClose();
      })
    };
  
    return (
      <div>
      <Dialog open={modalOpen} onClose={handleClose} fullWidth={ true } maxWidth={"sm"}>
        <DialogTitle>Send your NFT to Rarible</DialogTitle>
        <Box sx={{ width: '100%'}}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {processing === true ? (
            <React.Fragment>
            <DialogContent sx={{ minWidth: '600'}}>
              <DialogContentText>
                Sit tight, we are processing your transaction. You will have to sign the transaction in your crypto wallet.
              </DialogContentText>
              <LinearProgress sx={{ marginTop: 2 }}/>
            </DialogContent>
            </React.Fragment>
          ) : activeStep === 0 ? (
          <React.Fragment>
            <DialogContent>
              <DialogContentText>
                First step is to mint your NFT on Rarible.
                If you "lazy mint" your NFT - it won't be minted untill it is sold. This allows you to avoid incurring any upfront costs.
                You will have to sign transaction in your crypto wallet.
              </DialogContentText>
              <FormGroup>
                  <FormControlLabel control={
                      <Checkbox
                          checked={mintingType}
                          onChange={handleCheckboxChange}
                      />} label="Lazy minting" />
              </FormGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleReset}>Cancel</Button>
              <Button onClick={step1Click}>Mint</Button>
            </DialogActions>
          </React.Fragment>
        ) : activeStep === 1 ? (
          <React.Fragment>
            <DialogContent>
              <DialogContentText>
                Now, please enter the "Buy now price" for your NFT. Anyone will be able to buy you NFT for this price.
              </DialogContentText>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={price}
                  onChange={e => setPrice(e.currentTarget.value)}
                  startAdornment={<InputAdornment position="start">ETH</InputAdornment>}
                  label="Amount"
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleReset}>Cancel</Button>
              <Button onClick={step2Click}>Next</Button>
            </DialogActions>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <DialogContent>
              <DialogContentText>
                You are about to sell your NFT on Rarible.
                Your NFT won't be minted untill it is sold. This allows you to avoid incurring any upfront costs.
                You will have to sign transaction in your crypto wallet.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleBack}>Back</Button>
              <Button onClick={() => step3Click(price)}>Sell on Rarible</Button>
            </DialogActions>
        </React.Fragment>
        )}
        </Box>
      </Dialog>
    </div>
    );
  }
  
  export default BuyNFTModal;