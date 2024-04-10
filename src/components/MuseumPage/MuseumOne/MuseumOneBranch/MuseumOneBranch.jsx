import React from 'react';

import { MuseumOneBranchList } from '../../index';

const MuseumOneBranch = ({ branches }) => {
   console.log(branches, 'branches');
   return (
      <div className="museumOne_pageStyle">
         <div className="museumOneBranch-par">
            <h4 className="museumOne_title">The name of the museum branch</h4>
            <div className="MuseumOneBranch-parList">
               {branches.map((item) => (
                  <MuseumOneBranchList key={item.id} {...item} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default MuseumOneBranch;
