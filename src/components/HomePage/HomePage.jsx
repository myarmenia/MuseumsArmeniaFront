import React, { useEffect, useState } from 'react'
import SliderInHome from '../SliderInHome/SliderInHome'
import './HomePage.css'
import NavBarForHome from '../NavBar_for_home/NavBarForHome'
import SingleTicketSection from '../SingleTicketSection/SingleTicketSection'
import NewsSectionInHome from '../NewsSectionInHome/NewsSectionInHome'
import MuseumSectionSliderInHome from '../MuseumSectionSliderInHome/MuseumSectionSliderInHome'
import AnimScroll from '../AnimScroll/AnimScroll'
import SectionAboteUs from '../SectionAboteUs/SectionAboteUs'
import SouvenirsSection from '../SouvenirsSection/SouvenirsSection'
import ContactUsSection from '../ContactUsSection/ContactUsSection'
import PrivateTicket from '../PrivateTicket/PrivateTicket'
import CardModal from '../Shop/CardModal'

function HomePage({changeFonSize, changeFont}) {    
    const [homeNavColor, setHomeNavColor] = useState(false)

    useEffect(()=>{
        window.addEventListener('scroll',(e)=>{
            if (window.scrollY > 0) {
                setHomeNavColor(true)
            }
            else{
                setHomeNavColor(false)
            }
        })
        window.scrollTo(0,0);
    },[homeNavColor])

    
  return (
    <div className='home_page'>
            <NavBarForHome homeNavColor={homeNavColor} {...{changeFonSize, changeFont}}/>
            <SliderInHome/>
            <PrivateTicket/>
            <SingleTicketSection/>
            <NewsSectionInHome/>
            <MuseumSectionSliderInHome/>
            <AnimScroll/>
            <SectionAboteUs/>
            <SouvenirsSection/>
            <ContactUsSection/>
            <CardModal/>
    </div>
  )
}

export default HomePage