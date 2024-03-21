import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEventsPage } from '../../store/slices/EventsPageSlice/EventsPageApi'
import { selectEventPage, selectEventPageLoading } from '../../store/slices/EventsPageSlice/EventsPageSlice'
import LoadSpinner from '../LoadSpinner/LoadSpinner'
import './EventsPage.css'
import { useTranslation } from 'react-i18next'
import { locationIcon } from '../../iconFolder/icon'

function EventsPage() {
    const { t, i18n } = useTranslation()
    const [page, setPage] = useState({ i: 1 })
    const [selectedRegion, setSelectedRegion] = useState({ name: '', id: '0', value: '' })
    const [openModal, setopenModal] = useState(false)
    const respEventPage = useSelector(selectEventPage)
    const loading = useSelector(selectEventPageLoading)
    const dispatch = useDispatch()
    const privateTicketRegions = t('privateTicketRegions', { returnObjects: true })
    const regionRef = useRef(null)



    useEffect(() => {
        dispatch(getEventsPage({ region: null, museum: null, pageIndex: page.i, }))
    }, [page])

    const pagination = () => {
        if (respEventPage.data.params && typeof respEventPage.data.params.page_count !== 'undefined') {
            const paginationList = [];
            for (let i = 1; i <= respEventPage.data.params.page_count; i++) {
                paginationList.push(<li key={i} onClick={() => setPage({ i })} style={{ backgroundColor: i === page.i ? 'var(--second_font_color)' : '#D9D9D94D' }} >{i}</li>);
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
            setSelectedRegion({name: '', id: '', value: ''})
        }
    };

    // const handleDelMuseum = (event) => {
    //     const key = event.key;
    //     if (key === 'Backspace' || key === 'Delete') {
    //         setSelectedMuseum('')
    //     }
    // };


    useEffect(() => {

        const hendelClick = (e) => {
            let path = e.composedPath ? e.composedPath() : e.path
            // let path2 = e.composedPath ? e.composedPath() : e.path
            // let path3 = e.composedPath ? e.composedPath() : e.path
            

            if (!path.includes(regionRef.current)) {
                setopenModal(false)
            }
            // if (!path2.includes(museumRef.current)) {
            //     setopenModalMuseum(false)
            // }
            // if (!path3.includes(privateRef.current)) {
            //     setTicketTypesBlock(false)
            // }
        }

        window.addEventListener('click', hendelClick)
        return () => window.removeEventListener('click', hendelClick)

    }, [])


    return (
        <div className='events_page'>
            <div className='events_page_baner'>

                <div className='events_page_dark'>
                    <h1>Events</h1>
                </div>
            </div>
            {
                loading === 'pending' ? <LoadSpinner /> : (
                    <div className='container'>
                        <div className='lines_div_events'>
                            <img src={require('../../images/line_gold.png')} alt="" />
                            <h1>Events</h1>
                            <img src={require('../../images/line_gold.png')} alt="" />
                        </div>

                        <div className='events_page_filter_div'>
                            <span className='events_page_filter_div_filter_icon'>** Filter</span>
s
                            <div className='events_page_filter_region' ref={regionRef} >
                                <input type="text" onKeyDown={handleKeyDown} onClick={() => setopenModal(!openModal)} value={selectedRegion.value} onChange={() => { }} placeholder='regions' />

                                {
                                    openModal && (
                                        <ul className='events_page_filter_region_list' onClick={() => setopenModal(false)}>
                                            {
                                                privateTicketRegions.map((region, index) => {

                                                    return <li key={index} onClick={() => setSelectedRegion({ name: Object.keys(region)[0], id: index + 1, value: Object.values(region)[0] })}><span>{locationIcon}</span> <span>{Object.values(region)[0]}</span></li>

                                                })
                                            }
                                        </ul>
                                    )
                                }
                            </div>
                        </div>
                        <div className='event_page_items'>

                            {
                                respEventPage?.data?.data.map(item =>
                                    <div key={item.id} className='event_page_item'>
                                        <div className='event_page_item_img_div'>
                                            <img src={item.image} alt="" />
                                            <div className='event_page_item_navigate_div'>
                                                <button className='event_page_item_navigate_div_btn'>Reade More</button>
                                            </div>
                                        </div>

                                        <div className='event_page_item_info_div'>
                                            <span className='event_page_item_info_div_title'>{item.name}</span>
                                            <p>{item.description}</p>
                                            {
                                                privateTicketRegions.map(el => Object.keys(el)[0] === item.region ? <span>{Object.values(el)[0]}</span> : '')
                                            }
                                        </div>

                                    </div>
                                )
                            }

                        </div>
                        <ul className='pagination_ul'>
                            <li onClick={() => page.i > 1 && setPage({ i: page.i - 1 })}>{'<<'}</li>
                            {console.log(page)}
                            {
                                pagination()
                            }
                            <li onClick={() => respEventPage.data.params.page_count > page.i && setPage({ i: page.i + 1 })}>{'>>'}</li>
                        </ul>
                    </div>
                )
            }
        </div>
    )
}

export default EventsPage