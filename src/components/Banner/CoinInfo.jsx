import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import SelectButton from '../SelectButton';
import chartDays from '../../config/data'


const CoinInfo = ({ coin }) => {

    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);
    const { currency } = CryptoState();

    const fetchHistoricalData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
        setHistoricalData(data.prices);
    };


    console.log(historicalData)

    useEffect(() => {
        fetchHistoricalData();
    }, [days])


    return (
        <div className='container' >
            {
                !historicalData ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px" }} >

                        <CircularProgress style={{ color: "gold" }} size={70}
                            thickness={1} />
                    </div>
                ) : (
                    <div style={{ marginTop: '50px', paddingBottom: "20px" }} >

                        <Line
                            data={{
                                labels: historicalData.map((coin) => {
                                    let date = new Date(coin[0]);
                                    let time =
                                        date.getHours() > 12
                                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                            : `${date.getHours()}:${date.getMinutes()} AM`;
                                    return days === 1 ? time : date.toLocaleDateString();
                                }),

                                datasets: [
                                    {
                                        data: historicalData.map((coin) => coin[1]),
                                        label: `Price ( Past ${days} Days ) in ${currency}`,
                                        borderColor: "#EEBC1D",
                                    },
                                ],


                            }}

                            options={{
                                elements: {
                                    point: {
                                        radius: 1,
                                    },
                                },
                            }}

                        />

                        <div
                            style={{
                                display: "flex",
                                marginTop: 20,
                                justifyContent: "space-around",
                                gap:4,
                                width: "100%",
                            }}
                        >
                            {chartDays.map((day) => (
                                <SelectButton
                                    key={day.value}
                                    onClick={() => setDays(day.value)}
                                    selected={day.value === days}
                                >
                                    {day.label}
                                </SelectButton>
                            ))}
                        </div>


                    </div>
                )
            }

        </div>
    )
}

export default CoinInfo
