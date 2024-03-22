import React, { useEffect, useState, useRef } from 'react'
import { privateTicketsData } from '../../data/data'
import { useTranslation } from 'react-i18next'
import ButtonSecond from '../ButtonSecond/ButtonSecond'
import { useDispatch, useSelector } from 'react-redux'
import { getPrivateTicket } from '../../store/slices/PrivateTicketSlice/PrivateTicketApi'
import { selectprivateTicket } from '../../store/slices/PrivateTicketSlice/PrivateTicketSlice'
import { postTicketCart } from '../../store/slices/Shop/ShopApi'
import './PrivateUnitedTicket.css'
import { setModalIsOpenShop } from '../../store/slices/Shop/ShopSlice'
import { getIsAuth } from '../../store/slices/Auth/AuthSlice'

function PrivateUnitedTicket() {
    const { t, i18n } = useTranslation()
    const [selectedRegion, setSelectedRegion] = useState({ name: '', id: '0', value: '' })
    const [selectedMuseum, setSelectedMuseum] = useState('')
    const [openModal, setopenModal] = useState(false)
    const [openModalMuseum, setopenModalMuseum] = useState(false)
    const [ticketTypesBlock, setTicketTypesBlock] = useState(false)
    const [museumItem, setMuseumItem] = useState(null)
    const [ticketCount, setTicketCount] = useState(1)
    const [fullValueTicket, setFullValueTicket] = useState(0)
    const [options, setOptions] = useState([]);
    const [currentOpt, setCurrentOpt] = useState([]);
    const regionRef = useRef(null)
    const museumRef = useRef(null)
    const privateRef = useRef(null)
    const museumInpRef = useRef(null)
    const isAuth = useSelector(getIsAuth)

    const dispatch = useDispatch()
    const respStandartTicket = useSelector(selectprivateTicket)




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



    useEffect(() => {
        selectedRegion.name === 'bolor' || selectedRegion.id === '0'
            ? setOptions(respStandartTicket.data)
            : setOptions(respStandartTicket.data.filter(museum => museum.region_name === selectedRegion.name))

    }, [respStandartTicket.data])


    const privateTicketRegions = t('privateTicketRegions', { returnObjects: true })





    const calculateTotalPrice = () => {
        let totalPrice = 0;
        currentOpt.forEach(museum => {

            totalPrice += museum.tickets[0].price
        })
        setFullValueTicket(totalPrice);
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [currentOpt]);


    const handleCheckboxChange = (e, museum) => {
        setOptions(prevOptions =>
            prevOptions.map(option =>
                option.id === museum.id ? { ...option, complited: !option.complited } : { ...option }
            )
        );

        const isChecked = e.target.checked;

        if (isChecked) {
            setCurrentOpt([...currentOpt, museum]); // Ավելացնել ընտրված ելեմենտը
        } else {
            setCurrentOpt(currentOpt.filter(item => item.id !== museum.id)); // Հեռացնել ելեմենտը
        }


    };


    const handleSelectRegion = (e, obj) => {
        setSelectedRegion(obj)
        dispatch(getPrivateTicket('united'))

    }

    const packetCount = (op) => {
        if (op === '+') {
            currentOpt.forEach(el => {
                if (ticketCount < respStandartTicket.params.max_ticket_quantity) {
                    setTicketCount(ticketCount + 1);
                    setFullValueTicket(prevValue => prevValue + el.tickets[0].price);

                }
            });
        } else {
            if (ticketCount > 1) {
                setTicketCount(prevCount => prevCount - 1);
                currentOpt.forEach(el => {
                    setFullValueTicket(prevValue => prevValue - el.tickets[0].price);
                });
            }
        }
    };

    const addCart = (e) => {
        e.stopPropagation()
        if(isAuth){
            dispatch(setModalIsOpenShop(true));
        let museumId = []
        let typeTicket = ''
        currentOpt.map(item => {
            museumId.push(item.id)
            typeTicket = item.tickets[0].type
        })

        dispatch(postTicketCart({
            type: 'ticket',
            tickets: [{
                type: typeTicket,
                museum_ids: museumId,
                quantity: ticketCount
            }]
        }));

        setTicketTypesBlock(false)
        }
    }


    return (
        <div className='private_standart_ticket'>
            <div className='private_standart_ticket_regions' ref={regionRef} >
                <input type="text" onKeyDown={handleKeyDown} onClick={() => setopenModal(!openModal)} value={selectedRegion.value || ''} onChange={() => { }} placeholder='regions' />

                {
                    openModal && (
                        <ul className='private_standart_ticket_regions_list' onClick={() => setopenModal(false)}>
                            {
                                privateTicketRegions.map((region, index) => {

                                    return <li key={index} onClick={(e) => handleSelectRegion(e, { name: Object.keys(region)[0], id: index + 1, value: Object.values(region)[0] })}>{Object.values(region)[0]}</li>

                                })
                            }
                        </ul>
                    )
                }
            </div>

            <div className='private_standart_ticket_museums' ref={museumRef} >
                <input type="text" onKeyDown={handleDelMuseum} value={selectedMuseum} onClick={() => setopenModalMuseum(true)} onChange={() => { }} placeholder='museums' />
                {openModalMuseum && (
                    <ul className='private_united_ticket_museum_list'>
                        {options && options.map(museum => (
                            <label key={museum.id}>
                                <input
                                    id={museum.id}
                                    ref={museumInpRef}
                                    checked={currentOpt.some(item => item.id === museum.id)}
                                    type="checkbox"
                                    onChange={(e) => handleCheckboxChange(e, museum)}
                                />
                                <li>
                                    <span>{museum.name}</span>
                                    <span>{museum.tickets[0].price} AMD</span>
                                </li>
                            </label>
                        ))}
                    </ul>
                )}
            </div>

            <div ref={privateRef} className='private_standart_ticket_museums_private_block' onClick={() => setTicketTypesBlock(true)} style={{ boxShadow: ticketTypesBlock ? '10px 0 40px rgba(0, 0, 0, 0.168)' : 'none' }}>
                <span>Ticket types</span>

                {ticketTypesBlock && currentOpt.length === respStandartTicket.params.min_museum_quantity &&

                    (<div className='private_standart_ticket_museums_private_block_ticket_types'>
                        {
                            currentOpt.length === 2 && currentOpt.map(el =>
                                <div key={el.id}>
                                    <div className='packet_div'>
                                        <span className='packet_div_type'>{el.name}</span>
                                        <span className='packet_div_price'>{el.tickets[0].price} AMD</span>
                                    </div>
                                </div>
                            )
                        }

                        <div className='packet_div_count'>
                            <span onClick={() => packetCount('-')}>-</span>
                            <h3>{ticketCount}</h3>
                            <span onClick={() => packetCount('+')}>+</span>
                        </div>

                        <div className='private_standart_ticket_museums_private_block_ticket_types_full_value'>
                            <span>Ընդամենը -   {fullValueTicket} AMD</span>
                        </div>

                        <div className='private_standart_ticket_museums_private_block_ticket_types_buy_div'>
                            <ButtonSecond txt='0' />
                            <ButtonSecond txt='5' onClick={addCart} />
                        </div>
                    </div>
                    )}
            </div>
        </div>
    )
}

export default PrivateUnitedTicket