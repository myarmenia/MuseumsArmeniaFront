import React from 'react';
import './contactWithUs.css';
import { useTranslation } from 'react-i18next';
import ContactWithUsmap from '../../images/ContactWithUsmap.png';
import addressLIne from '../../images/addressLIne.png';
import phoneLIne from '../../images/phoneLIne.png';
import mailLIne from '../../images/mailLIne.png';

function ContactWithUs() {
  const { t, i18n } = useTranslation();
  return (
    <div className="contactWithUs_pagee">
      <div className="container">
        <div className="privacy_policy_page_block">
          <div className="privacy_policy_page_block_title">
            <div className="lines_div">
              <img className="border_1" src={require('../../images/Line 106.png')} alt="" />
              <h2 style={{ textTransform: 'uppercase' }}>կապ մեզ հետ</h2>
              <img className="border_2" src={require('../../images/Line 106.png')} alt="" />
            </div>
          </div>

          <div className="contactWithUs_page_block_infoo">
            <p className="contactWithUs_title">
              Կրթության, գիտության, մշակույթի ևՎ սպորտի նախարարություն
            </p>
            <div className="ContactWithUs_map">
              <img src={ContactWithUsmap} alt="ContactWithUsmap" />
            </div>
            <div className="ContactWithUs_info_All_divs" style={{ width: '100%' }}>
              <div className="ContactWithUs_info_div">
                <div className="ContactWithUs_info_div_divs">
                  <img src={addressLIne} alt="addressLIne" />
                  <div className="ContactWithUs_info_div_divs_texts">
                    <span>ՀԱՍՑԵ</span>
                    <span style={{ color: '#615F5F' }}>ՀՀ, Երևան 0010, Վազգեն Սարգսյան 3 Կառավարական տուն 2</span>
                  </div>
                </div>
                <div className="ContactWithUs_info_div_divs">
                  <img src={phoneLIne} alt="phoneLIne" />
                  <div className="ContactWithUs_info_div_divs_texts">
                    <span>ՀԵՌԱԽՈՍԻ ՀԱՄԱՐ</span>
                    <span style={{ color: '#615F5F' }}>(374 10) 52-73-43</span>
                    <span style={{ color: '#615F5F' }}>(374 10) 52-73-43</span>
                  </div>
                </div>
                <div className="ContactWithUs_info_div_divs">
                  <img src={mailLIne} alt="mailLIne" />
                  <div className="ContactWithUs_info_div_divs_texts">
                    <span>ԷԼ․ՓՈՍՏ</span>
                    <span style={{ color: '#615F5F' }}>info@escs.am</span>
                    <span style={{ color: '#615F5F' }}>secretariat@escs.am</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="ContactWithUs_contact_all">
              <div>
                <p style={{ color: '#000000' }}>ԿԱՊՎԵՔ ՄԵԶ ՀԵՏ</p>
                <div>
                  <input type="text" className="ContactWithUs_contact_name" placeholder="Անուն*" />
                  <div className="ContactWithUs_contact_phone_email_all">
                    <input
                      type="text"
                      className="ContactWithUs_contact_phone_email"
                      placeholder="Հեռախոսահամար*"
                    />
                    <input
                      type="text"
                      className="ContactWithUs_contact_phone_email"
                      placeholder="Էլ․ փոտ*"
                    />
                  </div>
                  <textarea
                    className="ContactWithUs_contact_textarea"
                    name="message"
                    rows="6"
                    cols="80"
                    placeholder="ՀԱՂՈՐԴԱԳՐՈՒԹՅՈՒՆ"></textarea>
                </div>
              </div>
              <button className="ContactWithUs_contact_button">{t('buttons.2')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactWithUs;
