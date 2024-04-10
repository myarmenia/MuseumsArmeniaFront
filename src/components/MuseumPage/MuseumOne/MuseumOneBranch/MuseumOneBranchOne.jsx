import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { postMuseumOnePages } from '../../../../store/slices/MuseumPagesSlice/MuseumPagesApi';
import { CustomSectionTitle, MuseumOneDescription, MuseumOnecontact } from '../../index';
import LoadSpinner from '../../../LoadSpinner/LoadSpinner';
const MuseumOneBranchOne = () => {
   const { id, branchId } = useParams();
   const { dataMuseumOne, loadingdataMuseumOne } = useSelector((state) => state.museumPages);
   const dispatch = useDispatch();
   const [branch, setBranch] = useState(null);

   useEffect(() => {
      dispatch(postMuseumOnePages({ id }));
   }, [id]);

   useEffect(() => {
      if (dataMuseumOne?.branches?.length) {
         setBranch(dataMuseumOne.branches.find((el) => el.id === +branchId));
      }
   }, [dataMuseumOne]);

   console.log(branch, 'dataMuseumOneeeeee');
   return (
      <div className="container">
         {loadingdataMuseumOne === 'loading' && !branch ? (
            <LoadSpinner />
         ) : loadingdataMuseumOne === 'fulfilled' && branch ? (
            <div>
               <CustomSectionTitle text={'The name of the museum branch'} />
               <div className="MuseumOneBranchOne-section">
                  <div className="BranchOne-img">
                     <img src={branch.photo} alt="" />
                  </div>
                  <div className="museumOne_parent-section1">
                     <div className="museumOne-blockLeft">
                        <MuseumOneDescription description={branch.description} openBtn={false} />
                     </div>
                     <div className="museumOne-blockRigth ">
                        <MuseumOnecontact
                           {...branch}
                           links={{ web_site: branch.web_site }}
                           phones={branch.phone_number}
                        />
                     </div>
                  </div>
               </div>
            </div>
         ) : (
            <div>ինչվոր մի բան այն չի</div>
         )}
      </div>
   );
};

export default MuseumOneBranchOne;
