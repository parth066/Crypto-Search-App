import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import SelectButton from '../components/SelectButton';
import { HistoricalChart } from '../config/api';
import chartDays from '../config/data';
import { CryptoState } from '../CryptoContext';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import axios from 'axios';
import './InfoCoin.css'

const InfoCoin = ({coin}) => {

    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);
    const { currency } = CryptoState();


    const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

        setHistoricData(data.prices);
    };

    console.log(coin);

    useEffect(() => {
        fetchHistoricData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days]);

    return (
        <div className='container-info'>
            {!historicData ? (
                <CircularProgress
                    style={{ color: "gold" }}
                    size={250}
                    thickness={1}
                />
            ) : (
                <>
                    <Line
                        data={{
                            labels: historicData.map((coin) => {
                                let date = new Date(coin[0]);
                                let time =
                                    date.getHours() > 12
                                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                        : `${date.getHours()}:${date.getMinutes()} AM`;
                                return days === 1 ? time : date.toLocaleDateString();
                            }),

                            datasets: [
                                {
                                    data: historicData.map((coin) => coin[1]),
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
                </>
            )}
        </div>
    )
}

export default InfoCoin
