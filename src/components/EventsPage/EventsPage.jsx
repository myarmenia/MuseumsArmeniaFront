import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEventsPage } from '../../store/slices/EventsPageSlice/EventsPageApi'
import { selectEventPage, selectEventPageLoading } from '../../store/slices/EventsPageSlice/EventsPageSlice'
import LoadSpinner from '../LoadSpinner/LoadSpinner'
import './EventsPage.css'
import { useTranslation } from 'react-i18next'
import { dropDownIcon, filterIcon, filterIcon1, filterIcon2, leftPaginationIcon, locationIcon, locationIcon2, museumIcon, rightPaginationIcon } from '../../iconFolder/icon'
import { useNavigate } from 'react-router-dom'

function EventsPage() {
    const { t, i18n } = useTranslation()
    const [page, setPage] = useState({ i: 1 })
    const [selectedRegion, setSelectedRegion] = useState({ name: '', id: null, value: '' })
    const [selectedMuseum, setSelectedMuseum] = useState({ name: '', id: null, value: '' })
    const [openModal, setopenModal] = useState(false)
    const [openMuseumModal, setOpenMuseumModal] = useState(false)
    const respEventPage = useSelector(selectEventPage)
    const loading = useSelector(selectEventPageLoading)
    const dispatch = useDispatch()
    const privateTicketRegions = t('privateTicketRegions', { returnObjects: true })
    const regionRef = useRef(null)
    const museumRef = useRef(null)

    const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
    const navigate = useNavigate()



    useEffect(() => {
        dispatch(getEventsPage({ region: null, museum: null, pageIndex: page.i, }))
    }, [page])

    const pagination = () => {
        if (respEventPage.data.params && typeof respEventPage.data.params.page_count !== 'undefined') {
            const paginationList = [];
            for (let i = 1; i <= respEventPage.data.params.page_count; i++) {
                paginationList.push(<li key={i} onClick={() => setPage({ i })} style={{ color: i === page.i ? 'var(--second_font_color)' : 'black' }} >{i}</li>);
            }
            return paginationList;
        }
        else {
            return <LoadSpinner />
        }
    }

    const handleKeyDown = (event) => {
        const key = event.key;
        if (key === 'Backspace' || key === 'Delete') {
            setSelectedRegion({ name: '', id: '', value: '' })
        }
    };

    const handleDelMuseum = (event) => {
        const key = event.key;
        if (key === 'Backspace' || key === 'Delete') {
            setSelectedMuseum({ name: '', id: '', value: '' })
        }
    };


    useEffect(() => {

        const hendelClick = (e) => {
            let path = e.composedPath ? e.composedPath() : e.path
            let path2 = e.composedPath ? e.composedPath() : e.path


            if (!path.includes(regionRef.current)) {
                setopenModal(false)
            }
            if (!path2.includes(museumRef.current)) {
                setOpenMuseumModal(false)
            }

        }

        window.addEventListener('click', hendelClick)
        return () => window.removeEventListener('click', hendelClick)

    }, [])

    const filteredMuseums = selectedRegion.name === 'bolor' || selectedRegion.id === null
        ? respEventPage?.data?.params?.museum_list
        : respEventPage?.data?.params?.museum_list.filter(museum => museum.region_name === selectedRegion.name);


    const handleMuseumItem = (museum) => {
        setSelectedMuseum({ name: museum.name, id: null, value: museum.name })

        dispatch(getEventsPage({ region: selectedRegion.id, museum: museum.id, pageIndex: '1', }))
    }

    const handleRegionItem = (region) => {
        setSelectedRegion(region)
        dispatch(getEventsPage({ region: region.id !== 0 ? region.id : null, museum: selectedMuseum.id, pageIndex: '1', }))
        setSelectedMuseum('')
    }


    return (
        <div className='events_page'>
            {
                loading === 'pending' ? <LoadSpinner fullBackColor="white"/>: (
                    <div className='container'>
                        <div className='lines_div_event'>
                            <div>
                                <img src={require('../../images/Line 106.png')} alt="" />
                                 <h2>{t('navMenuItems.2')}</h2>
                                 <img src={require('../../images/Line 106.png')} alt="" />
                            </div>
                                <h3>{t('eventPageTitle')}</h3>
                        </div>

                        <div className='events_page_block'>

                            <div className='events_page_filter_div'>
                                <div>
                                    <div className='events_page_filter_region' ref={regionRef} >
                                        <div className='events_page_filter_region_inp_div'>
                                            <input type="text" onKeyDown={handleKeyDown} onClick={() => setopenModal(!openModal)} value={selectedRegion.value} onChange={() => { }} placeholder={t('Ticket_type_placeholder.1')} />
                                            <span>{dropDownIcon}</span>
                                        </div>

                                        {
                                            openModal && (
                                                <ul className='events_page_filter_region_list' onClick={() => setopenModal(false)}>
                                                    {
                                                        privateTicketRegions.map((region, index) => {

                                                            return <li key={index} onClick={() => handleRegionItem({ name: Object.keys(region)[0], id: index, value: Object.values(region)[0] })}><span>{locationIcon}</span> <p>{Object.values(region)[0]}</p></li>

                                                        })
                                                    }
                                                </ul>
                                            )
                                        }
                                    </div>

                                    <div className='events_page_filter_museum' ref={museumRef}>
                                        <div className='events_page_filter_museum_inp_div'>
                                            <input type="text" value={selectedMuseum.value || ''} onKeyDown={handleDelMuseum} onClick={() => setOpenMuseumModal(!openMuseumModal)} onChange={() => { }}  placeholder={t('Ticket_type_placeholder.3')} />
                                            <span>{dropDownIcon}</span>
                                        </div>

                                        {openMuseumModal && <ul className='events_page_filter_museum_list' onClick={() => setOpenMuseumModal(false)}>
                                            <li onClick={() => handleMuseumItem({name: t('allMussseum'), id: null})}><span>{museumIcon}</span> <p>{t('allMussseum')}</p></li>
                                            {
                                                filteredMuseums.map(museum =>
                                                    <li key={museum.id} onClick={() => handleMuseumItem(museum)}><span>{museumIcon}</span> <p>{museum.name}</p></li>
                                                )
                                            }
                                        </ul>}
                                    </div>
                                </div>
                            </div>
                            <div className='event_page_items'>

                                {
                                    respEventPage?.data?.data.map((item, index) =>
                                        <div key={item.id} className='event_page_item'>
                                            <div className='event_page_item_img_div'>
                                                <img src={item.image} alt="" />
                                                <div className='event_page_item_navigate_div'>
                                                    <button className='event_page_item_navigate_div_btn' onClick={() => navigate(`/${leng}/events/${item.id}`)}>{t('event_single_page.0')}</button>
                                                </div>
                                            </div>

                                            <div className='event_page_item_info_div'>
                                                <span className='event_page_item_info_div_title' title={item.name}>{item.name}</span>
                                                <p>{item.museum_name}</p>
                                                {
                                                    privateTicketRegions.map((el, index) => Object.keys(el)[0] === item.region ? <span key={index} >{locationIcon2}  {Object.values(el)[0]}</span> : '')
                                                }

                                                <div className='data_and_price_div_events'>
                                                    <span>{item.full_date}</span>
                                                    <span>{item.price} AMD</span>
                                                </div>
                                            </div>

                                        </div>

                                    )
                                }

                            </div>

                            {respEventPage.data.params.page_count > 1 && <ul className='pagination_ul'>
                            <li onClick={() => page.i > 1 && setPage({ i: page.i - 1 })}>{leftPaginationIcon}</li>

                            {
                                pagination()
                            }
                            <li onClick={() => respEventPage.data.params.page_count > page.i && setPage({ i: page.i + 1 })}>{rightPaginationIcon}</li>
                        </ul>}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default EventsPage