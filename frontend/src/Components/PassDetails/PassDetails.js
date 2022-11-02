import { useNavigate  } from "react-router-dom";
import { Input, Button } from 'antd';
import Styles from './PassDetails.module.css';

function PassDetails({setIsFormVisible, setBookingData, bookingData}) {
  
  let navigate = useNavigate();

  const submitForm = (e)=>{
    e.preventDefault();
    setBookingData({
      ...bookingData,
      name: e.target[0].value,
      email: e.target[1].value,
      age: e.target[2].value,
      phone_no: e.target[3].value
    });
    navigate("/confirmation_page");
  }
  return (
    <div className={Styles.cont}>
      <div className={Styles.close} onClick={()=>{setIsFormVisible(false)}}>
        X
      </div>
      <div className={Styles.mainCont}>
        <form className={Styles.formCont} onSubmit={submitForm}>
          <div className={Styles.ele}>
            <div className={Styles.label}>Full Name</div>
            <Input name='name' placeholder="John Cena" required />
          </div>
          <div className={Styles.ele}>
            <div className={Styles.label}>Email Id</div>
            <Input type='email' name='email' placeholder="john@gmail.com" required />
          </div>
          <div className={Styles.ele}>
            <div className={Styles.label}>Enter Age</div>
            <Input type='number' name='age' placeholder="25" required />
          </div>
          <div className={Styles.ele}>
            <div className={Styles.label}>Contact Number</div>
            <Input name='phone' placeholder="Enter your contact number..." required />
          </div>
          <div className={Styles.ele}>
            <Button
              style={{
                width: 200,
                float: "right"
              }}
              type="primary" htmlType='submit' shape="round">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PassDetails;