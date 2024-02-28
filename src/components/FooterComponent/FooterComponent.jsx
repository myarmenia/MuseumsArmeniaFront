// FooterComponent.js
import React, { useEffect, useState } from 'react';
import './FooterComponent.css';
import NavMenuItem from '../NavMenuItem/NavMenuItem';
import { locationIcon, mailIcon, telIcon } from '../../iconFolder/icon';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

function FooterComponent() {
    const [openFooter, setOpenFooter] = useState(false);

    const {t, i18n} = useTranslation()

    const {pathname} = useLocation()
    const leng = localStorage.getItem('lang')

    

    useEffect(() => {

        const handleScroll = () => {
            if (pathname === `/${leng}/`) {
                if (window.scrollY >= 5300) {
                    setOpenFooter(true);
                    console.log('Footer is open');
                } else {
                    setOpenFooter(false);
                    console.log('Footer is closed');
                }
            }
            else{

                if (window.scrollY >= document.body.scrollHeight-1000) {
                    setOpenFooter(true);
                    console.log('Footer is open');
                } else {
                    setOpenFooter(false);
                    console.log('Footer is closed');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [document.body.scrollHeight, pathname]); // No dependencies

    return (
        <footer className='footerComponent' style={{ transform: openFooter ? 'translateY(0)' : 'translateY(100%)' }}>
            <div className='container'>
                <div className="footerComponent_img_div">
                    <img src={require('../../images/hh.png')} alt="Zinanshan" />
                    <p>{t('footer_title')}</p>
                </div>
                <div className='footer_menu'>
                    <ul className='footer_menu_part_1'>
                        <NavMenuItem path='/aboute-us' txt='5'/>
                        <NavMenuItem path='/store' txt='3'/>
                        <NavMenuItem path='/events' txt='2'/>
                    </ul>

                    <ul className='footer_menu_part_2'>
                    <NavMenuItem path='/contact' txt='6'/>
                    <NavMenuItem path='/FAQ' txt='7'/>
                    <NavMenuItem path='/security' txt='8'/>
                    <NavMenuItem path='/privacy-policy' txt='9'/>
                    </ul>

                    <ul className='footer_menu_part_3'>
                        <a href="tel:+374(10)25-08-25">
                            <span>{telIcon}</span>
                            <span htmlFor="phone">+374(10)25-08-25</span>
                        </a>

                        <a href="mailto:Tangaran@gmail.com">
                            <span>{mailIcon}</span>
                            <span htmlFor="mail">Tangaran@gmail.com</span>
                        </a>

                        <a href="https://maps.app.goo.gl/kuVGfv1rwsNptG5C8" target='_blanc'>
                            <span>{locationIcon}</span>
                            <span htmlFor="location">0057 Yerevan</span>
                        </a>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default FooterComponent;
