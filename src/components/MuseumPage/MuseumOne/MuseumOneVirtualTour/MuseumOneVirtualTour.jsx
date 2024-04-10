import React from 'react';

const MuseumOneVirtualTour = ({ virtual_tour }) => {
   return (
      <div className="museumOne_pageStyle">
         <div className="educationalPrograms-par">
            <h4 className="museumOne_title">Virtual Excursion</h4>

            <div className="museumOneVirtualTour-iframePar">
               <iframe
                  src={virtual_tour}
                  style={{ height: '100%', width: '100%' }}
                  title="Iframe Example"></iframe>
            </div>
         </div>
      </div>
   );
};

export default React.memo(MuseumOneVirtualTour);
