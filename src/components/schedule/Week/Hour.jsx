/* eslint-disable react/prop-types */

import { useContext, useState, useEffect } from "react"
import GlobalContext from "../../../context/GlobalContext"
import dayjs from "dayjs"


const Hour = ({ hour }) => {
  const { setDaySelected, setSelectedEvent, savedEvents, setShowEventModal } = useContext(GlobalContext);
  const [localEvents, setLocalEvents] = useState(savedEvents);

  useEffect(() => {
    setLocalEvents(savedEvents);
  }, [savedEvents]);

  const cssstyle = {
    background: `${"#EBEBEB1A"}`,
  };

  return (
    <div className={`border border-gray-200 h-32 ${'grid grid-cols-1 grid-rows-4'}`} style={cssstyle}>
      {hour.map((quarter, idk) => (
        <div
          className={`flex justify-start items-center border border-gray-100 cursor-pointer ${idk === 2 ? 'border-t-blue-200 border-solid' : "border-dashed"}`} key={idk}
          onClick={() => {
            setDaySelected(dayjs(quarter, 'DD-MM-YYYY HH:mm'));
            setShowEventModal(true);
          }}
          title={quarter.slice(10)}
        >
          {localEvents.filter((item) => dayjs(item.time).format("DD-MM-YYYY HH:mm") === quarter).map((evt, idx) => (
            <div key={idx}
              className="p-1 mr-3 text-white text-sm rounded mb-1 truncate"
              style={{ backgroundColor: evt.label }}
              onClick={() => setSelectedEvent(evt)}
            >
              {evt.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Hour