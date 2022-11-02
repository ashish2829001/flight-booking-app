import Styles from './Home.module.css';
import { useState } from 'react';
import { DatePicker, Select, Button, Table } from 'antd';
import axios from 'axios';
import PassDetails from '../PassDetails/PassDetails';
const { Option } = Select;

function Home({ setBookingData, bookingData }) {

    const cityMap = {
        mumbai: "Mumbai",
        kolkata: "Kolkata",
        delhi: "Delhi"
    }

    const getStrDate = (d) => {
        let strDate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
        return strDate;
    }

    const [data, setData] = useState([]);


    const [isFormVisible, setIsFormVisible] = useState(false);

    const [inputData, setInputData] = useState({
        origin: "mumbai",
        destination: "delhi",
        date: getStrDate(new Date())
    })

    const onChange = (date) => {
        // console.log(getStrDate(new Date(date)));
        setInputData({
            origin: inputData.origin,
            destination: inputData.destination,
            date: getStrDate(new Date(date))
        });
    }

    const handleOrigin = (value) => {
        // console.log(value);
        setInputData({
            origin: value,
            destination: inputData.destination,
            date: inputData.date
        });
    }
    const handleDestination = (value) => {
        // console.log(value);
        setInputData({
            origin: inputData.origin,
            destination: value,
            date: inputData.date
        });
    }

    const bookTicket = (ele) => {
        setIsFormVisible(true);
        setBookingData(ele);
        // console.log(ele);
    }

    const getData = () => {
        // console.log(inputData);
        axios.post("/api/flight/getFlightData", inputData).then((response) => {
            // console.log(response.data.flightInfo);
            setData(response.data.flightInfo);
        });
    }

    const columns = [
        {
            title: 'Flight',
            key: 'flight_no',
            render: (ele) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <div>{ele.flight_no}</div>
                        <div>{ele.flight_name}</div>
                    </div>
                )
            }
        },
        {
            title: 'Departure',
            key: 'start_time',
            render: (ele) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <div>{ele.start_time}</div>
                        <div>{cityMap[ele.origin]}</div>
                    </div>
                )
            }
        },
        {
            title: 'Arrival',
            key: 'end_time',
            render: (ele) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <div>{ele.end_time}</div>
                        <div>{cityMap[ele.destination]}</div>
                    </div>
                )
            }
        },
        {
            title: 'Price',
            key: 'price',
            render: (ele) => {
                return (
                    <div>INR  {ele.price}</div>
                )
            }
        },
        {
            title: 'Book Ticket',
            key: 'operation',
            render: (ele) => {
                return (
                    <Button
                        onClick={() => { bookTicket(ele) }}
                        style={{
                            width: 100,
                        }}
                        type="primary" shape="round">
                        Book
                    </Button>
                )
            }
        },
    ];

    return (
        <>
            <div className={Styles.container}>

                <div className={Styles.box}>

                    <h2>
                        Search FLights
                    </h2>
                    <div className={Styles.col}>
                        <div className={Styles.row}>
                            <div className={Styles.element}>
                                <Select
                                    defaultValue="mumbai"
                                    style={{
                                        width: 200,
                                    }}
                                    onChange={handleOrigin}
                                >
                                    <Option value="mumbai">Mumbai</Option>
                                    <Option value="delhi">Delhi</Option>
                                    <Option value="kolkata">Kolkata</Option>
                                </Select>
                            </div>
                            <div className={Styles.element}>
                                <Select
                                    defaultValue="delhi"
                                    style={{
                                        width: 200,
                                    }}
                                    onChange={handleDestination}
                                >
                                    <Option value="mumbai">Mumbai</Option>
                                    <Option value="delhi">Delhi</Option>
                                    <Option value="kolkata">Kolkata</Option>
                                </Select>
                            </div>
                        </div>
                        <div className={Styles.row}>
                            <div className={Styles.element}>
                                <DatePicker
                                    style={{
                                        width: 200,
                                    }}
                                    onChange={onChange}
                                />
                            </div>
                            <div className={Styles.element}>
                                <Button
                                    onClick={getData}
                                    style={{
                                        width: 200,
                                    }}
                                    type="primary" shape="round">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>Search Results</h2>
                </div>
                <div className={Styles.box2}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        scroll={{
                            x: 800,
                        }}
                    />
                </div>
            </div>
            {
                isFormVisible
                    ?
                    <PassDetails setIsFormVisible={setIsFormVisible} bookingData={bookingData} setBookingData={setBookingData} />
                    :
                    ''
            }
        </>
    )
}

export default Home;