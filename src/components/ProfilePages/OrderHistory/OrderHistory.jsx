import React, { useEffect, useRef, useState } from 'react';
import './OrderHistory.css';
import point_3 from '../../../images/3_point.png';
import download from '../../../images/download.svg';
import sendEmail from '../../../images/sendEmail.png';
import printer from '../../../images/Printer.png';

function OrderHistory() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalOpen && modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalOpen]);

  const openModal = (event) => {
    event.preventDefault();
    const imgRect = event.target.getBoundingClientRect();
    const modalLeft = imgRect.right + 50; // Adjust the offset as needed
    const modalTop = imgRect.top - 15;
    setModalPosition({ top: modalTop, left: modalLeft });
    setModalOpen(true);
  };

  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };
  return (
    <>
      <div className="OrderHistory_all">
        <p style={{ fontWeight: '700' }}>Order History</p>
        <div className="OrderHistory_table">
          <table>
            <thead>
              <tr>
                <th>Name of museum</th>
                <th>Product name</th>
                <th>Count</th>
                <th>Purchase date</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Row , Cell 1</td>
                <td>Row , Cell 2</td>
                <td>Row, Cell 3</td>
                <td>Row, Cell 4</td>
                <td>Row, Cell 5</td>
                <td>Passive</td>
                <td style={{ textAlign: 'center' }}>
                  <img src={point_3} alt="point_3" onClick={openModal} />
                </td>
              </tr>
                            <tr>
                <td>Row , Cell 1</td>
                <td>Row , Cell 2</td>
                <td>Row, Cell 3</td>
                <td>Row, Cell 4</td>
                <td>Row, Cell 5</td>
                <td>Row , Cell 6</td>
                <td style={{ textAlign: 'center' }}>
                  <img src={point_3} alt="point_3" onClick={openModal} />
                </td>
              </tr>
              <tr>
                <td>Row , Cell 1</td>
                <td>Row , Cell 2</td>
                <td>Row, Cell 3</td>
                <td>Row, Cell 4</td>
                <td>Row, Cell 5</td>
                <td>Row , Cell 6</td>
                <td style={{ textAlign: 'center' }}>
                  <img src={point_3} alt="point_3" onClick={openModal} />
                </td>
              </tr>
              <tr>
                <td>Row , Cell 1</td>
                <td>Row , Cell 2</td>
                <td>Row, Cell 3</td>
                <td>Row, Cell 4</td>
                <td>Row, Cell 5</td>
                <td>Row , Cell 6</td>
                <td style={{ textAlign: 'center' }}>
                  <img src={point_3} alt="point_3" onClick={openModal} />
                </td>
              </tr>
              <tr>
                <td>Row , Cell 1</td>
                <td>Row , Cell 2</td>
                <td>Row, Cell 3</td>
                <td>Row, Cell 4</td>
                <td>Row, Cell 5</td>
                <td>Row , Cell 6</td>
                <td style={{ textAlign: 'center' }}>
                  <img src={point_3} alt="point_3" onClick={openModal} />
                </td>
              </tr>
            </tbody>
          </table>
          {modalOpen && (
            <div
              className="modal"
              ref={modalRef}
              style={{ top: modalPosition.top, left: modalPosition.left }}>
              <div className="modal-content" onClick={handleModalClick}>
                {/* <span className="close" onClick={closeModal}>
                  &times;
                </span> */}
                <div className="modal-content_div">
                  <div className="modal-content_div_line">
                    <img src={download} alt="download" /> <span>download</span>
                  </div>
                  <div className="modal-content_div_line">
                    <img src={sendEmail} alt="sendEmail" /> <span>Send email</span>
                  </div>
                  <div className="modal-content_div_line">
                    <img src={printer} alt="printer" /> <span>Print</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OrderHistory;
