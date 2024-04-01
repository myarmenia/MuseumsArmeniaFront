import React, { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonSecond from '../ButtonSecond/ButtonSecond'
import { useDispatch, useSelector } from 'react-redux'
import { selectprivateTicket } from '../../store/slices/PrivateTicketSlice/PrivateTicketSlice'
import DualCalendar from '../DualCalendar/DualCalendar'
import './PrivateEventTicket.css'
import { getEvents } from '../../store/slices/PrivateEventTicketSlice/PrivateEventTicketApi'
import { postTicketCart } from '../../store/slices/Shop/ShopApi'
import { getPrivateTicket } from '../../store/slices/PrivateTicketSlice/PrivateTicketApi'
import { getEventsTicket } from '../../store/slices/PrivateEventTicketSlice/PrivateEventTicketSlice'
import TicketCountDiv from '../TicketCountDiv/TicketCountDiv'
import { getIsAuth } from '../../store/slices/Auth/AuthSlice'
import { setModalIsOpenShop } from '../../store/slices/Shop/ShopSlice'
import { eventIcon, locationIcon, museumIcon, privateTicketIcon } from '../../iconFolder/icon'

function PrivateEventTicket({changeTicketType}) {
    const {t, i18n} = useTranslation()
    const [selectedRegion, setSelectedRegion] = useState({ name: '', id: '0', value: '' })
    const [selectedMuseum, setSelectedMuseum] = useState('')
    const [openModal, setopenModal] = useState(false)
    const [openModalEvent, setopenModalEvent] = useState(false)
    const [openModalMuseum, setopenModalMuseum] = useState(false)
    const [ticketTypesBlock, setTicketTypesBlock] = useState(false)
    const [museumItem, setMuseumItem] = useState(null)
    const [fullValueTicket, setFullValueTicket] = useState(0)
    const [eventInpVal, setEventInpVal] = useState('')
    const [currentEvent, setCurrentEvent] = useState(null)
    const [quantityEvent, setQuantityEvent] = useState([])
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [cartErrorMessage, setCartErrorMessage] = useState(false)
    const [eventLineRegion, setEventLineRegion] = useState(true)
    const [eventLineMuseum, setEventLineMuseum] = useState(true)
    const [eventLineCalendar, setEventLineCalendar] = useState(true)
    const [eventLineEvent, setEventLineEvent] = useState(true)
    const regionRef = useRef(null)
    const museumRef = useRef(null)
    const privateRef = useRef(null)
    const eventeRef = useRef(null)
    const dispatch = useDispatch()
    const respStandartTicket = useSelector(selectprivateTicket)
    const respEvent = useSelector(getEventsTicket)
    const isAuth = useSelector(getIsAuth)


    useEffect(() => {
        // setSelectedRegion({name: '', id: '', value: ''})
        setSelectedMuseum('')
    }, [changeTicketType])

    const handleKeyDown = (event) => {
        const key = event.key;
        if (key === 'Backspace' || key === 'Delete') {
            setSelectedRegion({name: '', id: '', value: ''})
        }
    };

    const handleDelMuseum = (event) => {
        const key = event.key;
        if (key === 'Backspace' || key === 'Delete') {
            setSelectedMuseum('')
            setMuseumItem(null)
        }
    };

    const handleDelEvent = (event) => {
        const key = event.key;
        if (key === 'Backspace' || key === 'Delete') {
            setEventInpVal('')
        }
    };


    useEffect(() => {

        const hendelClick = (e) => {
            let path = e.composedPath ? e.composedPath() : e.path
            let path2 = e.composedPath ? e.composedPath() : e.path
            let path3 = e.composedPath ? e.composedPath() : e.path
            let path4 = e.composedPath ? e.composedPath() : e.path
            

            if (!path.includes(regionRef.current)) {
                setopenModal(false)
                setEventLineRegion(true)
                setEventLineCalendar(true)

            }
            if (!path2.includes(museumRef.current)) {
                setopenModalMuseum(false)
                setEventLineMuseum(true)
                setEventLineRegion(true)
            }
            if (!path3.includes(privateRef.current)) {
                setTicketTypesBlock(false)
            }
            if (!path4.includes(eventeRef.current)) {
                setopenModalEvent(false)
                setEventLineEvent(true)
            }
        }

        window.addEventListener('click', hendelClick)
        return () => window.removeEventListener('click', hendelClick)

    }, [])


    
    const filteredMuseums = selectedRegion.name === 'bolor' || selectedRegion.id === '0'
        ? respStandartTicket.data
        : respStandartTicket.data.filter(museum => museum.region_name === selectedRegion.name);

        const privateTicketRegions = t('privateTicketRegions', {returnObjects: true})

    

        const handleMuseumItemClick = (museum) => {
            setSelectedMuseum(museum.name)
            setMuseumItem(museum)
            setFullValueTicket(0)
            dispatch(getEvents({museumId: museum.id, start_date: startDate, end_date: endDate}))
        }

        

       const handleEventItemClick = (e, el) =>{
            setEventInpVal(el.name)
            setopenModalEvent(false)
            setCurrentEvent(el)
       }
        

       const addCart = async(e) => {
        e.stopPropagation()
         if (isAuth) {
            await  dispatch(postTicketCart({
                type: 'ticket',
                tickets: currentEvent.event_configs.map(el => ({
                    type: 'event',
                    id: el.id,
                    quantity: sessionStorage.getItem(`quantity${el.id}`)
                }))
   
            }))

            currentEvent.event_configs.map(item => {
                sessionStorage.removeItem(`quantity${item.id}`)
            })
            
            dispatch(setModalIsOpenShop(true));
         }
         else{
            setCartErrorMessage(true);
            setTimeout(() => {
                setCartErrorMessage(false);
            }, 4000); 
         }

         setTicketTypesBlock(false)
        

        } 
        


        const handleMuseumInpFocus = (e) => {
            e.stopPropagation()
            setEventLineMuseum(false)
            setEventLineRegion(false)
            setopenModal(false)
            setTicketTypesBlock(false)
            setopenModalEvent(false)
        }
    
        const handleRegionInpFocus = (e) => {
            e.stopPropagation()
            setEventLineRegion(false)
            setTicketTypesBlock(false)
            setopenModalMuseum(false)
            setEventLineCalendar(false)
            setopenModalEvent(false)
    
        }


        const handleEventInpFocus = (e) => {
            e.stopPropagation()
            setTicketTypesBlock(false)
            setopenModalMuseum(false)
            setEventLineMuseum(false)
            setEventLineEvent(false)
        }
    
        const handlePrivateBlockClick = (e) => {
            e.stopPropagation()
            setEventLineEvent(false)
            setTicketTypesBlock(true)
            setopenModal(false)
            setopenModalMuseum(false)
            setopenModalEvent(false)

        }

    return (
        <div className='private_standart_ticket'>
            {cartErrorMessage && <h3 className='cart_error_message'>{t('Ticket_type_placeholder.8')}</h3>}
            <DualCalendar {...{selectedMuseum, setStartDate, setEndDate, startDate, endDate, museumItem, setEventLineCalendar}}/>

            <div className='private_standart_ticket_regions' ref={regionRef} onClick={(e) => handleRegionInpFocus(e)}>
                <input type="text" onKeyDown={handleKeyDown} onClick={() => setopenModal(!openModal)} value={selectedRegion.value } onChange={() => { }} placeholder={t('Ticket_type_placeholder.0')} />

                <div className='placeholder_div'>
                        <span>{locationIcon}</span>
                        <p>{t('Ticket_type_placeholder.1')}</p>
                </div>
                
                {eventLineRegion && <div className='line_ticket'></div>}
                {eventLineCalendar && <div className='line_ticket_left'></div>}
                {
                    openModal && (
                        <ul className='private_standart_ticket_regions_list' onClick={() => setopenModal(false)}>
                            {
                                privateTicketRegions.map((region, index) => {
                                     
                                    return <li key={index} onClick={() => setSelectedRegion({ name: Object.keys(region)[0], id: index+ 1, value: Object.values(region)[0]})}><span>{locationIcon}</span> <p>{Object.values(region)[0]}</p></li>

                            })
                            }
                        </ul>
                    )
                }
            </div>

            <div className='private_standart_ticket_museums  private_event_ticket_museums' ref={museumRef} onClick={handleMuseumInpFocus}>
                <input type="text" onKeyDown={handleDelMuseum} value={selectedMuseum} onClick={() => setopenModalMuseum(true)} onChange={() => { }} placeholder={t('Ticket_type_placeholder.2')}/>

                <div className='placeholder_div'>
                    <span>{museumIcon}</span>
                        <p>{t('Ticket_type_placeholder.3')}</p>
                </div>

                {
                    openModalMuseum && (

                        <ul className='private_standart_ticket_museum_list' onClick={() => setopenModalMuseum(false)}>
                            {filteredMuseums.map(museum => (
                                <li key={museum.id} onClick={() => handleMuseumItemClick(museum)}>
                                    <span>{museumIcon}</span>
                                    <p>{museum.name}</p>
                                </li>
                            ))}
                        </ul>
                    )
                }

                {eventLineMuseum && <div className='line_ticket'></div>}

            </div>

            <div className='private_tickets_events' ref={eventeRef} onClick={handleEventInpFocus}>
                <input type="text" placeholder={t('Ticket_type_placeholder.4')} value={eventInpVal || ''} onKeyDown={handleDelEvent}  onClick={() => setopenModalEvent(!openModalEvent)} onChange={()=> {}}/>

                <div className='placeholder_div'>
                    <span>{eventIcon}</span>
                        <p>{t('Ticket_type_placeholder.5')}</p>
                </div>

               {selectedMuseum && openModalEvent && <ul className='private_tickets_events_list'>
                    {
                        respEvent?.data.map(el =>
                            <li key={el.id} onClick={(e) => handleEventItemClick(e, el)}><span>{eventIcon}</span> <p>{el.name}</p></li>
                        )
                        
                    }
                </ul>}
                {eventLineEvent && <div className='line_ticket'></div>}
            </div>

            <div ref={privateRef} className='private_standart_ticket_museums_private_block' onClick={handlePrivateBlockClick} style={{boxShadow: ticketTypesBlock ?'10px 0 40px rgba(0, 0, 0, 0.168)' : 'none'}}>
                <div className='placeholder_div_ticket'>
                        <span>{privateTicketIcon}</span>
                        <p>{t('Ticket_type_placeholder.6')}</p>
                </div>

                {ticketTypesBlock && eventInpVal && 

                 (<div className='private_event_ticket_private_block_ticket_types'>
                    
                    <div className='events_ticket_block'>
                        {
                            currentEvent?.event_configs.map(item => 
                                <div className='events_ticket_block_event' key={item.id}>
                                    <span>{currentEvent.name}</span>
                                    <div className='events_ticket_block_event_time_div'>
                                        <span>{item. day}</span>
                                        <span>{item.start_time}</span>
                                    </div>

                                    <TicketCountDiv max={item.tickets.max} min={item.tickets.min} price={item.tickets.price} setFullValueTicket={setFullValueTicket} setQuantityEvent={setQuantityEvent} quantityEvent={quantityEvent} item= {item}/>
                                </div>
                            )
                        }
                    </div>
                    <div className='private_standart_ticket_museums_private_block_ticket_types_full_value'>
                        <span>{t('Ticket_type_placeholder.7')}   {fullValueTicket} AMD</span>
                    </div>

                    <div className='private_standart_ticket_museums_private_block_ticket_types_buy_div'>
                        
                            <button className='bay_ticket_btn'>{t('buttons.0')}</button>
                            <button className='add_cart_btn' onClick={addCart}>{t('buttons.3')}</button>
                    </div>
                 </div>
                )}
            </div>
        </div>
    )
}

export default PrivateEventTicket