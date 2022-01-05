import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import InfoCoin from './InfoCoin'
import './SingleCoin.css'
import { SingleCoin } from '../config/api';
import { numberWithCommas } from '../components/Banner/CoinsTable';
import { LinearProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Single = () => {

    const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

    return (
        <div className='container'>
        <div className='sidebar'>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3" className='heading'>
            {coin?.name}
          </Typography>
          <Typography variant='subtitle1' className='description'  >
              <div dangerouslySetInnerHTML={{ __html: coin.description.en.split(". ")[0] }}  ></div>
            </Typography>
          <div className='marketData'>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className='heading'>
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {numberWithCommas(coin?.market_cap_rank)}
              </Typography>
            </span>
  
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className='heading'>
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className='heading'>
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
                M
              </Typography>
            </span>
          </div>
        </div>
        <InfoCoin coin={coin} />
      </div>
    )
}

export default Single
