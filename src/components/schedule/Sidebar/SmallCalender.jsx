import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import React, { useState, useEffect, useContext } from 'react';
import { getMonth } from '../../../util';
import GlobalContext from '../../../context/GlobalContext';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.locale('pt-br');

const SmallCalender = () => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const { monthIndex, daySelected, setSmallCalendarMonth, setDaySelected, setMonthIndex } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  // Handle Next and Prev Months
  const handlePrevNextMonth = (action) => {
    setMonthIndex(currentMonthIdx - action);
  }

  const getDayClass = (day) => {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    return nowDay === currDay ? 'bg-blue-500 text-white rounded-full ' : (currDay === slcDay ? "bg-blue-100 rounded-full text-blue-600 font-bold" : "");
  }

  const getMonthClass = (day) => {
    const startOfMonth = dayjs(new Date(dayjs().year(), currentMonthIdx)).startOf('month');
    const endOfMonth = dayjs(new Date(dayjs().year(), currentMonthIdx)).endOf('month');
    
    if (day.isBefore(startOfMonth) || day.isAfter(endOfMonth)) {
      return 'text-gray-400';  // Previous or next month days
    } else {
      return 'text-black';  // Current month days
    }
  }

  const handleDayClick = (day) => {
    if (day.month() !== currentMonthIdx) {
      setMonthIndex(day.month());
    }
    setDaySelected(day);
  }

  return (
    <div className='py-4 w-80'> {/* Adiciona largura fixa ao contêiner */}
      <header className="flex justify-between items-center">
        <p className="text-black text-sm font-medium">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format('MMMM YYYY')}
        </p>
        <div className='flex items-center justify-center gap-2'>
          <button onClick={() => handlePrevNextMonth(1)} className=''>
            <span className='cursor-pointer text-black text-lg'>
              <AiOutlineLeft />
            </span>
          </button>
          <button onClick={() => handlePrevNextMonth(-1)} className=''>
            <span className='cursor-pointer text-black text-lg'>
              <AiOutlineRight />
            </span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6 mt-5">
        {currentMonth[0].map((day, i) => (
          <span key={i} className='text-xs py-1 mx-2 text-center text-gray-400 font-semibold'>
            {day.format('ddd')}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button onClick={() => handleDayClick(day)} key={idx} className={`${getDayClass(day)} ${getMonthClass(day)}`}>
                <span className='text-sm'>
                  {day.format('D')}
                </span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default SmallCalender;