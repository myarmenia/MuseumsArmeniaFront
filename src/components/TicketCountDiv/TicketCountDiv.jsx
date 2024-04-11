import Item from 'antd/es/list/Item';
import React, { useEffect, useState } from 'react'
import { minusIcon, plusIcon } from '../../iconFolder/icon';
import { useLocation } from 'react-router-dom';

function TicketCountDiv({max, min, price, setFullValueTicket, setQuantityEvent, quantityEvent, item}) {
  const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
    const [ticketCountSub, setTicketCountSub] = useState(0)
    const {pathname} = useLocation()

    const handleClick = (op) =>{
        let newTicketCountSub = ticketCountSub;
        
        if(op === '-'){
          newTicketCountSub = Math.max(min, ticketCountSub - 1);
        }
        else{
            newTicketCountSub = Math.min(max, ticketCountSub + 1);
        }
        
        setTicketCountSub(newTicketCountSub);
      }


      useEffect(()=> {
        let packet_result = 0;
        document.querySelectorAll('.packet_result').forEach(el =>{
          packet_result += (+el.textContent);
        });
        setFullValueTicket(packet_result * price);
        sessionStorage.setItem(`quantity${item.id}`,  ticketCountSub)
      },[ticketCountSub])

  return (
       <div className='Events_ticket_price'>

            {pathname === `/${leng}/` && <p>{price} AMD</p>}

            <div className='packet_div_count'>
                <span id='minus' onClick={()=> handleClick('-')}>{minusIcon}</span>
                <span style={{color: ticketCountSub > 0 ? 'black' : 'gray'}} className='packet_result' id='result'>{ticketCountSub}</span>
                <span id='plus' onClick={() => handleClick('+')}>{plusIcon}</span>
            </div>

       </div>
  )
}

export default TicketCountDiv