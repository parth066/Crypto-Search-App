import { Button, Container, Grid, LinearProgress, Typography } from '@mui/material';

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CoinInfo from '../components/Banner/CoinInfo';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import './Coin.css'



import { numberWithCommas } from '../components/Banner/CoinsTable';
import { makeStyles } from '@mui/styles';
import { styled } from '@material-ui/styles';

function Coin() {



  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();


  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  }



  useEffect(() => {
    fetchCoin();

  }, [id]);







  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (


    // Basic Details Section 

    <Container style={{ marginTop: '20px' }} >

      <Grid container  >




        <Grid item md={8} sm={7} xs={12} className='gridItems'  >
          <Typography variant='h2' gutterBottom   > {coin.name} </Typography>
          <div className='info-para'>

            <Typography variant='body2' mb={2}  >
              <p dangerouslySetInnerHTML={{ __html: coin.description.en.split(". ")[0] }} style={{ width: '50%' }} ></p>
            </Typography>
          </div>
          <div className="info-container" style={{ display: "flex" }}>
            <div style={{ marginRight: '20px' }} >
              <Button variant="contained"  >Market Capital</Button>

              <Typography variant='body1' mt={2}  >  {symbol} {numberWithCommas(coin.market_data.market_cap[currency.toLowerCase()])}</Typography>
            </div>
            <div>
              <Button variant="contained" style={{ backgroundColor: "gold" }}   >Current Price</Button>

              <Typography variant='body1' mt={2}  >  {symbol} {numberWithCommas(coin.market_data.current_price[currency.toLowerCase()])}</Typography>
            </div>
          </div>

        </Grid>


        <Grid item md={4} sm={5} xs={12} className='gridItems' >
          <img src={coin.image.large} />
        </Grid>
      </Grid>
      <CoinInfo coin={coin} />
    </Container>




  )
}

export default Coin
