/*
Month View Calender Component
*/

// Imports
import PropTypes from 'prop-types';
import Day from "./Day"
import React from 'react';

import CalenderHeader from '../Header/CalenderHeader';

const Month = ({ month }) => {
    return (
        // Month Component Main Entry
        <div className='flex flex-col flex-1 animate__backOutLeft animate__backInRight animate__delay-2s h-screen'>
            {/* Month Calender Header with Dates */}
            <CalenderHeader />
            <div className="grid grid-cols-7 grid-rows-1 py-4 border border-b-0 shadow-md">
                {month[0].map((day, i) => (
                    <span key={i} className='text-sm text-center flex items-center justify-center h-4'>
                        {day.format("ddd")}
                    </span>
                ))}
            </div>

                    {/* Month View Days */}
            <div className='overflow-y-scroll '>
                <div className="flex-1 grid grid-cols-7 grid-rows-5 ">
                    {month.map((row, i) => (
                        <React.Fragment key={i}>
                            {row.map((day, idx) => (
                                <Day day={day} key={idx} rowIdx={i} />
                            ))}
                        </React.Fragment>))}
                </div>
            </div>
        </div>
    )
}

Month.propTypes = {
    month: PropTypes.any
}

export default Month