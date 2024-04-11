import React, { useEffect, useState, useRef, useMemo, memo } from 'react'
import { privateTicketsData } from '../../data/data'
import './PrivateStandartAndAbonementTicket.css'
import { useTranslation } from 'react-i18next'
import ButtonSecond from '../ButtonSecond/ButtonSecond'
import { useDispatch, useSelector } from 'react-redux'
import { selectprivateTicket } from '../../store/slices/PrivateTicketSlice/PrivateTicketSlice'
import { postTicketCart } from '../../store/slices/Shop/ShopApi'
import { setModalIsOpenShop } from '../../store/slices/Shop/ShopSlice'
import { getIsAuth } from '../../store/slices/Auth/AuthSlice'
import { locationIcon, minusIcon, museumIcon, plusIcon, privateTicketIcon } from '../../iconFolder/icon'
import { getPrivateTicket } from '../../store/slices/PrivateTicketSlice/PrivateTicketApi'
import { postBuyTicket } from '../../store/slices/BuyTicketSlice/BuyTicketApi'
import { selectBuyTicket, setObj } from '../../store/slices/BuyTicketSlice/BuyTicketSlice'
import { setModalTicketIsOpen, setTicketType } from '../../store/slices/MuseumTicket/MuseumTicketSlice'
import { MuseumTicketModal, TicketMuseumBlock } from '../MuseumPage/MuseumOne/Ticket'
import OutSideErrorModal from '../OutSideErrorModal/OutSideErrorModal'

function PrivateStandartAndAbonementTicket({ changeTicketType }) {
    const { t, i18n } = useTranslation()
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
    const [cartErrorMessage, setCartErrorMessage] = useState(null)
    const [eventLineRegion, setEventLineRegion] = useState(true)
    const [eventLineMuseum, setEventLineMuseum] = useState(true)
    const [errorMessageTicket, setErrorMessageTicket] = useState(false)
    const regionRef = useRef(null)
    const museumRef = useRef(null)
    const privateRef = useRef(null)
    const dispatch = useDispatch()
    const respStandartTicket = useSelector(selectprivateTicket)
    const isAuth = useSelector(getIsAuth)
    const respBuyTicket = useSelector(selectBuyTicket)


    useEffect(() => {
        setSelectedMuseum('')
        respStandartTicket.data.map(el => {
            setMuseumItem(el)
        })
    }, [respStandartTicket.data])


    useEffect(() => {
        setSelectedMuseum('')

    }, [selectedRegion])

    useEffect(() => {
        setSelectedRegion({ name: 'bolor', id: '0', value: '' })
        
    }, [changeTicketType]);

    const handleKeyDown = (event) => {
        const key = event.key;
        if (key === 'Backspace' || key === 'Delete') {
            setSelectedRegion({ name: '', id: '', value: '' })
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
                setEventLineRegion(true)
            }
            if (!path2.includes(museumRef.current)) {
                setopenModalMuseum(false)
                setEventLineMuseum(true)
                setEventLineRegion(true)
            }
            if (!path3.includes(privateRef.current)) {
                setTicketTypesBlock(false)
                setTicketCountFree(0)
                setTicketCountStandart(0)
                setTicketCountDicounted(0)
                setTicketCountSub(0)
                setFullValueTicket(0)
            }
        }

        window.addEventListener('click', hendelClick)
        return () => window.removeEventListener('click', hendelClick)

    }, [])



    const filteredMuseums = selectedRegion.name === 'bolor' || selectedRegion.id === '0'
        ? respStandartTicket.data
        : respStandartTicket.data.filter(museum => museum.region_name === selectedRegion.name);



    const privateTicketRegions = t('privateTicketRegions', { returnObjects: true })

    const ticketsType_for_private = t('ticketsType_for_private', { returnObjects: true })


    const handleMuseumItemClick = (museum) => {
        setSelectedMuseum(museum.name)
        setMuseumItem(museum)

        setTicketCountStandart(0)
        setTicketCountDicounted(0)
        setTicketCountFree(0)
        setFullValueTicket(0)
        setTicketCountSub(0)
    }

    const packetCount = (op, type, max, price) => {
        if (max === null) {
            max = 500000
        }

        if (type === "standart") {
            if (op === '+') {
                ticketCountStandart >= max ? setTicketCountStandart(max) : setTicketCountStandart(ticketCountStandart + 1)
            }
            else {
                ticketCountStandart < 1 ? setTicketCountFree(0) : setTicketCountStandart(ticketCountStandart - 1)
            }
        }


        else if (type === "discount") {
            if (op === '+') {
                ticketCountDicounted >= max ? setTicketCountDicounted(max) : setTicketCountDicounted(ticketCountDicounted + 1)
            }
            else {
                ticketCountDicounted < 1 ? setTicketCountDicounted(0) : setTicketCountDicounted(ticketCountDicounted - 1)
            }
        }
        else if (type === "subscription") {
            if (op === '+') {
                ticketCountSub >= max ? setTicketCountSub(max) : setTicketCountSub(ticketCountSub + 1)
            }
            else {
                ticketCountSub < 1 ? setTicketCountSub(0) : setTicketCountSub(ticketCountSub - 1)
            }
        }

        else {
            if (op === '+') {
                ticketCountFree >= max ? setTicketCountFree(max) : setTicketCountFree(ticketCountFree + 1)
            }
            else {
                ticketCountFree < 1 ? setTicketCountFree(0) : setTicketCountFree(ticketCountFree - 1)
            }
        }

    }

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        if (museumItem && museumItem.tickets) {
            museumItem.tickets.forEach(ticket => {
                if (ticket.type === 'standart') {
                    totalPrice += ticket.price * ticketCountStandart;
                } else if (ticket.type === 'discount') {
                    totalPrice += ticket.price * ticketCountDicounted;
                } else if (ticket.type === 'free') {
                    totalPrice += ticket.price * ticketCountFree;
                } else if (ticket.type === 'subscription') {
                    totalPrice += ticket.price * ticketCountSub;
                }
            });
        }
        setFullValueTicket(totalPrice);
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [ticketCountStandart, ticketCountDicounted, ticketCountFree, ticketCountSub]);


    const addCart = (e) => {
        e.stopPropagation()
        if (isAuth) {
            dispatch(setModalIsOpenShop(true));
            dispatch(postTicketCart({
                items: museumItem.tickets.map(el => {
                    return el.type === 'standart' && ticketCountStandart !== 0
                        ? {
                            type: el.type,
                            id: el.id,
                            quantity: ticketCountStandart
                        }
                        : el.type === 'discount' && ticketCountDicounted !== 0
                            ? {
                                type: el.type,
                                id: el.id,
                                quantity: ticketCountDicounted
                            }
                            : el.type === 'free' && ticketCountFree !== 0
                                ? {
                                    type: el.type,
                                    id: el.id,
                                    quantity: ticketCountFree
                                }
                                : el.type === 'subscription' && ticketCountSub !== 0
                                    ? {
                                        type: el.type,
                                        id: el.id,
                                        quantity: ticketCountSub
                                    }
                                    : null;
                }).filter(ticket => ticket !== null)
            }));

            setTicketTypesBlock(false)
        }
        else {
            setCartErrorMessage(true);
            setTimeout(() => {
                setCartErrorMessage(false);
            }, 4000);
        }

        setTicketTypesBlock(false)
    }

    const buyTicket = async (e) => {
        e.preventDefault()
        if (isAuth) {
            await dispatch(postBuyTicket({
                request_name: "web",
                items: museumItem.tickets.map(el => {
                    return el.type === 'standart' && ticketCountStandart !== 0
                        ? {
                            type: el.type,
                            id: el.id,
                            quantity: ticketCountStandart
                        }
                        : el.type === 'discount' && ticketCountDicounted !== 0
                            ? {
                                type: el.type,
                                id: el.id,
                                quantity: ticketCountDicounted
                            }
                            : el.type === 'free' && ticketCountFree !== 0
                                ? {
                                    type: el.type,
                                    id: el.id,
                                    quantity: ticketCountFree
                                }
                                : el.type === 'subscription' && ticketCountSub !== 0
                                    ? {
                                        type: el.type,
                                        id: el.id,
                                        quantity: ticketCountSub
                                    }
                                    : null;
                }).filter(ticket => ticket !== null)
            })).then(res => {
                if (res.meta.requestStatus === "fulfilled") {
                    window.location.href = res.payload.data.redirect_url
                }
            })

        }
        else {
            if (ticketCountStandart === 0 && ticketCountDicounted === 0 && ticketCountFree === 0 && ticketCountSub === 0) {
                setErrorMessageTicket(true)
            }

            else {
                setErrorMessageTicket(false)
                dispatch(setTicketType({ kindOf: 'form', type: 'Buy Ticket', ticketType: 'standart' }))
                dispatch(setModalTicketIsOpen(true))
                setTicketTypesBlock(false)
                dispatch(setObj({
                    request_name: "web",
                    items: museumItem.tickets.map(el => {
                        return el.type === 'standart' && ticketCountStandart !== 0
                            ? {
                                type: el.type,
                                id: el.id,
                                quantity: ticketCountStandart
                            }
                            : el.type === 'discount' && ticketCountDicounted !== 0
                                ? {
                                    type: el.type,
                                    id: el.id,
                                    quantity: ticketCountDicounted
                                }
                                : el.type === 'free' && ticketCountFree !== 0
                                    ? {
                                        type: el.type,
                                        id: el.id,
                                        quantity: ticketCountFree
                                    }
                                    : el.type === 'subscription' && ticketCountSub !== 0
                                        ? {
                                            type: el.type,
                                            id: el.id,
                                            quantity: ticketCountSub
                                        }
                                        : null;
                    }).filter(ticket => ticket !== null)
                }))
            }
        }


    }

    // useEffect(() => {
    //     respBuyTicket.data.message === 'success' &&    (window.location.href = respBuyTicket.data.data.redirect_url)
    // }, [respBuyTicket.data.message])



    const handleMuseumInpFocus = (e) => {
        e.stopPropagation()
        setEventLineMuseum(false)
        setEventLineRegion(false)
        setopenModal(false)
        setTicketTypesBlock(false)
        setTicketCountFree(0)
        setTicketCountStandart(0)
        setTicketCountDicounted(0)
        setTicketCountSub(0)
        setFullValueTicket(0)
    }

    const handleRegionInpFocus = (e) => {
        e.stopPropagation()
        setEventLineRegion(false)
        setTicketTypesBlock(false)
        setopenModalMuseum(false)
        setTicketCountFree(0)
        setTicketCountStandart(0)
        setTicketCountDicounted(0)
        setTicketCountSub(0)
        setFullValueTicket(0)

    }

    const handlePrivateBlockClick = (e) => {
        e.stopPropagation()
        setEventLineMuseum(false)
        setTicketTypesBlock(true)
        setopenModal(false)
        setopenModalMuseum(false)

    }





    return (
        <>
            <div className='private_standart_ticket'>
                 {cartErrorMessage && <OutSideErrorModal txt={t('Ticket_type_placeholder.8')}/>}
                <div className='private_standart_ticket_regions' ref={regionRef} onClick={(e) => handleRegionInpFocus(e)}>
                    <input type="text" onKeyDown={handleKeyDown} onClick={() => setopenModal(!openModal)} value={selectedRegion.value} onChange={() => { }} placeholder={t('Ticket_type_placeholder.0')} />
                    <div className='placeholder_div'>
                        <span>{locationIcon}</span>
                        <p>{t('Ticket_type_placeholder.1')}</p>
                    </div>
                    {
                        openModal && (
                            <ul className='private_standart_ticket_regions_list' onClick={() => setopenModal(false)}>
                                {
                                    privateTicketRegions.map((region, index) => {

                                        return <li key={index} onClick={() => setSelectedRegion({ name: Object.keys(region)[0], id: index + 1, value: Object.values(region)[0] })}><span>{locationIcon}</span> <p>{Object.values(region)[0]}</p></li>

                                    })
                                }
                            </ul>
                        )
                    }
                    {eventLineRegion && <div className='line_ticket'></div>}
                </div>

                <div className='private_standart_ticket_museums' ref={museumRef} onClick={(e) => handleMuseumInpFocus(e)}>
                    <input type="text" onKeyDown={handleDelMuseum} value={selectedMuseum} onClick={() => setopenModalMuseum(true)} onChange={() => { }} placeholder={t('Ticket_type_placeholder.3')} />
                    <div className='placeholder_div'>
                        <span>{museumIcon}</span>
                        <p>{t('Ticket_type_placeholder.2')}</p>
                    </div>
                    {
                        filteredMuseums.length !== 0 && openModalMuseum && (

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

                <div ref={privateRef} className='private_standart_ticket_museums_private_block' onClick={(e) => handlePrivateBlockClick(e)} style={{ boxShadow: ticketTypesBlock ? '0 0 20px rgba(0, 0, 0, 0.055)' : 'none' }}>
                    <div className='placeholder_div_ticket'>
                        <span>{privateTicketIcon}</span>
                        <p>{t('Ticket_type_placeholder.6')}</p>
                    </div>

                    {ticketTypesBlock && museumItem && selectedMuseum &&

                        (<div className='private_standart_ticket_museums_private_block_ticket_types'>
                            {
                                museumItem && museumItem.tickets.map((el, index) => {

                                    return (
                                        <div key={index}>
                                            <div className='packet_div'>
                                                {
                                                    ticketsType_for_private.map(ticket => {
                                                        if (Object.keys(ticket)[0] === el.type) {
                                                            return <span key={el.id}>{Object.values(ticket)[0]}</span>
                                                        }
                                                    })
                                                }
                                                <span className='packet_div_price'>{el.price} AMD</span>

                                                <div className='packet_div_count'>
                                                    <span onClick={() => packetCount('-', el.type, el.max, el.price)}>{minusIcon}</span>
                                                    <span className={`count_span ${(ticketCountStandart && index === 0 && 'color') || (ticketCountDicounted && index === 1 && 'color') || (index === 2 && ticketCountFree && 'color') || (index === 0 && ticketCountSub && 'color')} `}>{el.type === 'standart' ? ticketCountStandart : el.type === 'discount' ? ticketCountDicounted : el.type === 'subscription' ? ticketCountSub : ticketCountFree}</span>
                                                    <span onClick={() => packetCount('+', el.type, el.max, el.price)}>{plusIcon}</span>
                                                </div>
                                            </div>
                                        </div>)
                                }

                                )
                            }

                            <div className='private_standart_ticket_museums_private_block_ticket_types_full_value'>
                                <span><b>{t('Ticket_type_placeholder.7')} </b>{fullValueTicket} AMD</span>
                            </div>

                            {respBuyTicket?.data.success === false && <p className='err_message_tickets'>{respBuyTicket?.data.message}</p>}
                            {errorMessageTicket && <p className='err_message_tickets'>{t('ticket_error_message')}</p>}

                            <div className='private_standart_ticket_museums_private_block_ticket_types_buy_div'>

                                <button className='bay_ticket_btn' onClick={buyTicket}>{t('buttons.0')}</button>
                                <button className='add_cart_btn' onClick={addCart}>{t('buttons.3')}</button>
                            </div>
                        </div>
                        )}
                </div>
            </div>
            <TicketMuseumBlock />
        </>
    )
}

export default memo(PrivateStandartAndAbonementTicket)