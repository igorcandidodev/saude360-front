/*
Day component withing our Month Calender
*/

import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useContext, useState, useEffect } from 'react';
import GlobalContext from '../../../context/GlobalContext';



const Day = ({ day }) => {

    const [dayEvents, setDayEvents] = useState([])
    const { setDaySelected, savedEvents, setSelectedEvent, daySelected,setShowEventModal } = useContext(GlobalContext)

    useEffect(() => {
        const events = savedEvents.filter(evt => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY"))
        setDayEvents(events)
    }, [savedEvents, day])

    const getCurrentDayClass = () => {
        return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? ' text-red-500' : ' '
    }

    const getTheSelectedDay = () => {
        return day.format('D') === daySelected.format('D')
    }

    const cssstyle = {

        color: `${getTheSelectedDay() ? 'blue': ""}`
    }

    return (
        <div className=' day border border-gray-200 flex flex-col h-36 DayBox' style={cssstyle}>
            <header className='flex flex-col '>
                {day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ?
                    <p className='text-left p-2 pb-0 text-base font-medium text-color-blue1'>Hoje</p>
                    :
                    <>
                        <p className={`text-base p-2 pb-0 text-left font-semibold ${getCurrentDayClass()}`}>
                            {day.format('D')}
                        </p>
                        <div>   
                        </div>

                    </>
                }
            </header>
            <div className="flex-1 cursor-pointer" onClick={() => {
                setDaySelected(day)
                setShowEventModal(true)
                // setViewCalender("Week")
            }}>
                {dayEvents.map((evt, idx) => (
                    <div key={idx}
                        className=" p-1 mr-3 text-white text-sm rounded mb-1 truncate"
                        style={{backgroundColor: evt.label}}
                        onClick={() => {
                            setSelectedEvent(evt)
                            setShowEventModal(true)
                        }
                        }
                    >
                        {evt.title}
                    </div>
                ))}
            </div>
        </div>
    )
}

Day.propTypes = {
    rowIdx: PropTypes.number,
    day: PropTypes.any
}


export default Day
