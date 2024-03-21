import React, { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonSecond from '../ButtonSecond/ButtonSecond'
import { useDispatch, useSelector } from 'react-redux'
import { selectprivateTicket } from '../../store/slices/PrivateTicketSlice/PrivateTicketSlice'
import DualCalendar from '../DualCalendar/DualCalendar'
import './PrivateEventTicket.css'
import { getEvents } from '../../store/slices/PrivateEventTicketSlice/PrivateEventTicketApi'

function PrivateEventTicket({changeTicketType}) {
    const {t, i18n} = useTranslation()
    const [selectedRegion, setSelectedRegion] = useState({ name: '', id: '0', value: '' })
    const [selectedMuseum, setSelectedMuseum] = useState('')
    const [openModal, setopenModal] = useState(false)
    const [openModalMuseum, setopenModalMuseum] = useState(false)
    const [ticketTypesBlock, setTicketTypesBlock] = useState(false)
    const [ticketCountStandart, setTicketCountStandart] = useState(1)
    const [ticketCountDicounted, setTicketCountDicounted] = useState(0)
    const [ticketCountFree, setTicketCountFree] = useState(0)
    const [ticketCountSub, setTicketCountSub] = useState(0)
    const [museumItem, setMuseumItem] = useState(null)
    const [fullValueTicket, setFullValueTicket] = useState(0)
    const regionRef = useRef(null)
    const museumRef = useRef(null)
    const privateRef = useRef(null)
    const dispatch = useDispatch()
    const respStandartTicket = useSelector(selectprivateTicket)

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
        }
    };

    useEffect(() => {

        const hendelClick = (e) => {
            let path = e.composedPath ? e.composedPath() : e.path
            let path2 = e.composedPath ? e.composedPath() : e.path
            let path3 = e.composedPath ? e.composedPath() : e.path
            

            if (!path.includes(regionRef.current)) {
                setopenModal(false)
            }
            if (!path2.includes(museumRef.current)) {
                setopenModalMuseum(false)
            }
            if (!path3.includes(privateRef.current)) {
                setTicketTypesBlock(false)
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

            setTicketCountStandart(0)
            setTicketCountDicounted(0)
            setTicketCountFree(0)
            setFullValueTicket(0)
            setTicketCountSub(0)
            dispatch(getEvents(museum.id))
        }

        const packetCount = (op, type, max, price) => {
            if (max === null) {
                max = 500000
            }

            if (type === "standart") {
              if (op === '+') {
                ticketCountStandart >= max ? setTicketCountStandart(max) : setTicketCountStandart(ticketCountStandart + 1)
              }
              else{
                ticketCountStandart < 1 ? setTicketCountFree(0) : setTicketCountStandart(ticketCountStandart - 1)
              }
            }


            else if(type === "discount"){
                if (op === '+') {
                    ticketCountDicounted >= max ? setTicketCountDicounted(max) : setTicketCountDicounted(ticketCountDicounted + 1)
              }
              else{
                ticketCountDicounted < 1 ? setTicketCountDicounted(0) : setTicketCountDicounted(ticketCountDicounted - 1)
              }
            }
            else if (type === "subscription"){
                if (op === '+') {
                    ticketCountSub >= max ? setTicketCountSub(max) : setTicketCountSub(ticketCountSub + 1)
              }
              else{
                ticketCountSub < 1 ? setTicketCountSub(0) : setTicketCountSub(ticketCountSub - 1)
              }
            }

            else{
                if (op === '+') {
                    ticketCountFree >= max ? setTicketCountFree(max) : setTicketCountFree(ticketCountFree + 1)
              }
              else{
                ticketCountFree < 1 ? setTicketCountFree(0) : setTicketCountFree(ticketCountFree - 1)
              }
            }
            
        }

       

    return (
        <div className='private_standart_ticket'>
            <DualCalendar/>
            <div className='private_standart_ticket_regions private_standart_event_regions' ref={regionRef} >
                <input type="text" onKeyDown={handleKeyDown} onClick={() => setopenModal(!openModal)} value={selectedRegion.value} onChange={() => { }} placeholder='regions' />

                {
                    openModal && (
                        <ul className='private_standart_ticket_regions_list' onClick={() => setopenModal(false)}>
                            {
                                privateTicketRegions.map((region, index) => {
                                     
                                    return <li key={index} onClick={() => setSelectedRegion({ name: Object.keys(region)[0], id: index+ 1, value: Object.values(region)[0]})}>{Object.values(region)[0]}</li>

                            })
                            }
                        </ul>
                    )
                }
            </div>

            <div className='private_standart_ticket_museums  private_event_ticket_museums' ref={museumRef} >
                <input type="text" onKeyDown={handleDelMuseum} value={selectedMuseum} onClick={() => setopenModalMuseum(true)} onChange={() => { }} placeholder='museums' />
                {
                    openModalMuseum && (

                        <ul className='private_standart_ticket_museum_list' onClick={() => setopenModalMuseum(false)}>
                            {filteredMuseums.map(museum => (
                                <li key={museum.id} onClick={() => handleMuseumItemClick(museum)}>
                                    {museum.name}
                                </li>
                            ))}
                        </ul>
                    )
                }
            </div>

            <div ref={privateRef} className='private_standart_ticket_museums_private_block' onClick={() => setTicketTypesBlock(true)} style={{boxShadow: ticketTypesBlock ?'10px 0 40px rgba(0, 0, 0, 0.168)' : 'none'}}>
                <span>Ticket types</span>

                {ticketTypesBlock && museumItem && 

                 (<div className='private_standart_ticket_museums_private_block_ticket_types'>
                    {
                        museumItem && museumItem.event_configs.map((el, index) =>
                            <div key={index}>
                                <div className='packet_div'>
                                    <span className='packet_div_type'>{el.type}</span>
                                    <span className='packet_div_price'>{el.price} AMD</span>
                                    
                                    <div className='packet_div_count'>
                                        <span onClick={() => packetCount('-', el.type, el.max, el.price)}>-</span>
                                        <h3>{el.type === 'standart' ? ticketCountStandart : el.type === 'discount' ? ticketCountDicounted  : el.type === 'subscription' ? ticketCountSub : ticketCountFree }</h3>
                                        <span onClick={() => packetCount('+', el.type, el.max, el.price)}>+</span>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    <div className='private_standart_ticket_museums_private_block_ticket_types_full_value'>
                        <span>Ընդամենը -   {fullValueTicket} AMD</span>
                    </div>

                    <div className='private_standart_ticket_museums_private_block_ticket_types_buy_div'>
                        <ButtonSecond txt='0'/>
                        <ButtonSecond txt='5'/>
                    </div>
                 </div>
                )}
            </div>
        </div>
    )
}

export default PrivateEventTicket