
import React ,{Fragment,useState} from 'react'
import "./shpping.css"
import {useSelector,useDispatch} from "react-redux"
import {shipinginfodata} from "../../action/cartAction"
import MetaData from '../layout/MetaData'
import { PinDrop ,Home,LocationCity,Public,Phone,TransferWithinAStation } from '@material-ui/icons'
import {Country,State} from "country-state-city"
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router'
import CheckoutSteps from "./Ckeckout.js"
const Shping = () => {
    const dispatch=useDispatch()
    const history=useNavigate()
    const alert=useAlert()
    const {shippingInfo}=useSelector(state=>state.cart)


    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [country, setCountry] = useState();
    const [pinCode, setPinCode] = useState();
    const [phoneNo, setPhoneNo] = useState();




    const shippingSubmit = (e) => {
        e.preventDefault();
    
        if (phoneNo.length < 10 || phoneNo.length > 10) {
          alert.error("Phone Number should be 10 digits Long");
          return;
        }
        dispatch(
            shipinginfodata({ address, city, state, country, pinCode, phoneNo })
        );
        history("/order/confirm");
      };
  return <Fragment>
       <MetaData title="Shipping Details" />


       <CheckoutSteps activeStep={0} />
<div className="shippingContainer">
  <div className="shippingBox">
    <h2 className="shippingHeading">Shipping Details</h2>

    <form
      className="shippingForm"
      encType="multipart/form-data"
      onSubmit={shippingSubmit}
    >
      <div>
        <Home />
        <input
          type="text"
          placeholder="Address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div>
        <LocationCity />
        <input
          type="text"
          placeholder="City"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div>
        <PinDrop />
        <input
          type="number"
          placeholder="Pin Code"
          required
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
        />
      </div>

      <div>
        <Phone />
        <input
          type="number"
          placeholder="Phone Number"
          required
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          size="10"
        />
      </div>

      <div>
        <Public />

        <select
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Country</option>
          {Country &&
            Country.getAllCountries().map((item) => (
              <option key={item.isoCode} value={item.isoCode}>
                {item.name}
              </option>
            ))}
        </select>
      </div>

      {country && (
        <div>
          <TransferWithinAStation />

          <select
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">State</option>
            {State &&
              State.getStatesOfCountry(country).map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
      )}

      <input
        type="submit"
        value="Continue"
        className="shippingBtn"
        disabled={state ? false : true}
      />
    </form>
  </div>
</div>
  </Fragment>
}

export default Shping