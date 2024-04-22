import React from 'react';
import './MyAccount.css';
import EditIcon from '../../../images/editIcon.png';
import logOutGray from '../../../images/logOutGray.svg';

function MyAccount() {
  return (
    <div className="MyAccount_all">
      <div className="MyAccount_big_div">
        <p className="MyAccount_title">My Account</p>
        <div className="edit-save-block">
          <img src={EditIcon} alt="EditIcon" />
          <span>save</span>
        </div>
        <div className="top_inputes">
          <input
            type="text"
            className="MyAccount_input-name"
            // disabled={true}
          />
          <input type="text" className="MyAccount_input-surname" />
          <input type="text" className="MyAccount_input-phone" />
          <select className="MyAccount_select-country">
            <option value="vvvv" key="aa"></option>
            <option value="aaaa" key="bb"></option>
          </select>
          <input
            type="date"
            style={{ fontSize: '13px', color: '#B26705' }}
            className="MyAccount_input-date"
          />
        </div>
        <div className="gender_div">
          <p>Enter your Gender</p>
          <div className="gender_div_inputes">
            <div className="gender_div_input_div">
              <input type="radio" className="gender_div_input" name="gender" />
              <span>Female</span>
            </div>
            <div className="gender_div_input_div">
              <input type="radio" className="gender_div_input" name="gender" />
              <span>Male</span>
            </div>
            <div className="gender_div_input_div">
              <input type="radio" className="gender_div_input" name="gender" />
              <span>Other</span>
            </div>
          </div>
        </div>
        <div className="bottom_inputes">
          <div className="bottom_inputes_divs">
            <p>Enter the current password</p>
            <input type="text" className="MyAccount_input-name" />
          </div>
          <div className="bottom_inputes_divs">
            <p>Enter the new password</p>
            <input type="text" className="MyAccount_input-name" />
          </div>
          <div className="bottom_inputes_divs">
            <p>Repeat the new password</p>
            <input type="text" className="MyAccount_input-name" />
          </div>
        </div>
        <div className="log_out_myAccount">
          <img src={logOutGray} alt="logOutGray" />
          <span>Log out</span>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
