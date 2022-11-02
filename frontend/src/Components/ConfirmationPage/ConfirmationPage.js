import { useState } from 'react';
import Styles from './ConfirmationPage.module.css';
import { Button, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function ConfirmationPage({ bookingData }) {

  const cityMap = {
    mumbai: "Mumbai",
    kolkata: "Kolkata",
    delhi: "Delhi"
  }

  const [isSpinVisible, setIsSpinVisible] = useState(false);

  let navigate = useNavigate();

  if (!bookingData) {
    navigate('/');
  }

  const confirmTicket = () => {
    // console.log(bookingData);
    setIsSpinVisible(true);
    axios.post("/api/bookflight/addBooking", {
      flight_no: bookingData.flight_no,
      passenger_name: bookingData.name,
      passenger_phone: bookingData.phone_no,
      passenger_email: bookingData.email,
      age: bookingData.age
    })
      .then((response) => {
        setIsSpinVisible(false);
        if(response.data.success) {
          swal("Success", "Ticket booked successfully...", "success")
          .then(() => {
            navigate("/");
          })
        } else {
          swal("Failed", "Something went wrong...", "error");
        }
      })
      .catch((err) => {
        setIsSpinVisible(false);
        swal("Failed", "Something went wrong...", "error");

      });

  }

  return (
    <>
      <div className={Styles.mainCont}>
        <div className={Styles.cont}>
          <h2>Confirmation Page</h2>
          <p>Please confirm the details given below to book the ticket.</p>
          <div className={Styles.section}>
            <h3>Flight Details</h3>
            <div className={Styles.info}>
              <div className={Styles.lebel}>Flight No</div>
              <div className={Styles.value}>{bookingData.flight_no}</div>
            </div>
            <div className={Styles.info}>
              <div className={Styles.lebel}>Flight Name</div>
              <div className={Styles.value}>{bookingData.flight_name}</div>
            </div>
            <div className={Styles.info}>
              <div className={Styles.lebel}>Origin</div>
              <div className={Styles.value}>{cityMap[bookingData.origin]} @ {bookingData.start_time}</div>
            </div>
            <div className={Styles.info}>
              <div className={Styles.lebel}>Destination</div>
              <div className={Styles.value}>{cityMap[bookingData.destination]} @ {bookingData.end_time}</div>
            </div>
            <div className={Styles.info}>
              <div className={Styles.lebel}>Price</div>
              <div className={Styles.value}>INR {bookingData.price}</div>
            </div>
          </div>
          <div className={Styles.section}>
            <h3>Personal Details</h3>
            <div className={Styles.info}>
              <div className={Styles.lebel}>Name</div>
              <div className={Styles.value}>{bookingData.name}</div>
            </div>
            <div className={Styles.info}>
              <div className={Styles.lebel}>Contact Number</div>
              <div className={Styles.value}>{bookingData.phone_no}</div>
            </div>
            <div className={Styles.info}>
              <div className={Styles.lebel}>Email</div>
              <div className={Styles.value}>{bookingData.email}</div>
            </div>
            <div className={Styles.info}>
              <div className={Styles.lebel}>Age</div>
              <div className={Styles.value}>{bookingData.age}</div>
            </div>
          </div>
          <Button
            onClick={confirmTicket}
            style={{
              width: 200,
            }}
            type="primary" shape="round">
            Confirm Booking
          </Button>
        </div>
      </div>
      {
        isSpinVisible
          ?
          <div style={{ width: "100vw", height: "100vh", position: "fixed", top: "0", display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Spin />
          </div>
          :
          ''
      }
    </>
  )
}

export default ConfirmationPage;