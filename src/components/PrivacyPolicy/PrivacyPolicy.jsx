import React from 'react';
import './PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <div className='privacy_policy_page'>
       <div className='container'>
          <div className='privacy_policy_page_block'>
                <div className='privacy_policy_page_block_title'>
                    <div className='lines_div'>
                        <img src={require('../../images/Line 106.png')} alt="" />
                        <h2>xxxxxxxxxxxxx</h2>
                        <img src={require('../../images/Line 106.png')} alt="" />
                    </div>
                </div>

                <div className='privacy_policy_page_block_info'>
                    <div className='privacy_policy_page_block_info_left_div'>
                        <p>Անձնական տվյալների ապահովություն Ներածություն Սույն «Գաղտնիության քաղաքականությունը» կարգավորում է մեր կողմից Ձեր անձնական տեղեկությունների օգտագործումը:</p>

                        <p>Տեղեկությունների գաղտնիություն Մեզ տրամադրած Ձեր տեղեկությունները համարվում են միանգամայն գաղտնի և չեն կարող տրամադրվել որևէ երրորդ կողմի:</p>

                        <div className='privacy_policy_page_block_info_left_div_list_div'>
                            <p>Տեղեկությունների հավաքագրում Մենք կարող ենք հավաքագրել և պահել ստորև ներկայացված անձնական տեղեկությունները։</p>
                                <ul className='privacy_policy_page_block_info_left_div_list'>
                                    <li>Էլ.փոստի հասցե, անուն-ազգանուն, հեռախոսահամար։</li>
                                    <li>Էլ.փոստի հասցե, անուն-ազգանուն, հեռախոսահամար։</li>
                                    <li>Էլ.փոստի հասցե, անուն-ազգանուն, հեռախոսահամար։</li>
                                    <li>Էլ.փոստի հասցե, անուն-ազգանուն, հեռախոսահամար։</li>
                                </ul>
                        </div>
                    </div>

                    <div className='privacy_policy_page_block_info_right_div'>
                        <div className='privacy_policy_page_block_info_right_div_img_div'>
                            <img src={require('../../images/privacypolicy.jpg')} alt="" />
                        </div>
                    </div>
                </div>
          </div>
       </div>
    </div>
  );
}

export default PrivacyPolicy;
