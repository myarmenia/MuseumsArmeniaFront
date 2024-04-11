import React, { useEffect, useState } from 'react';
import SliderInHome from '../SliderInHome/SliderInHome';
import './HomePage.css';
import SingleTicketSection from '../SingleTicketSection/SingleTicketSection';
import NewsSectionInHome from '../NewsSectionInHome/NewsSectionInHome';
import MuseumSectionSliderInHome from '../MuseumSectionSliderInHome/MuseumSectionSliderInHome';
import SectionAboteUs from '../SectionAboteUs/SectionAboteUs';
import SouvenirsSection from '../SouvenirsSection/SouvenirsSection';
import ContactUsSection from '../ContactUsSection/ContactUsSection';
import PrivateTicket from '../PrivateTicket/PrivateTicket';
import CardModal from '../Shop/CardModal';
import EventsInHome from '../EvensInHome/EventsInHome';


function HomePage({ changeFonSize, changeFont }) {

  return (
    <div className="home_page">
      <SliderInHome />
      <PrivateTicket />
      <SingleTicketSection />
      <NewsSectionInHome />
      <MuseumSectionSliderInHome />
      <EventsInHome/>
      <SectionAboteUs />
      <SouvenirsSection />
      <ContactUsSection />
      <CardModal />
    </div>
  );
}

export default HomePage;
