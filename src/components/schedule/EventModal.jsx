import { useContext, useState, useEffect } from 'react';
import { AiOutlineAlignLeft, AiOutlineBook, AiOutlineCheck, AiOutlineClockCircle, AiOutlineClose, AiOutlineDelete, AiOutlineMenu } from 'react-icons/ai';
import GlobalContext from '../../context/GlobalContext';
import { usePatients } from '../../context/PatientsContext';
import { useConsultations } from '../../context/ConsultationContext';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

// Color hexCodes
const hexCodes = {
    "indigo": "#3F00FF",
    "gray": "#808080",
    "green": "#00FF00",
    "blue": "#0000FF",
    "red": "#FF0000",
    "purple": "#800080",
};

const labelClasses = ["indigo", "gray", "green", "blue", "red", "purple"];
const labelHexCodes = labelClasses.map(label => hexCodes[label]);

const EventModal = () => {
    const { setShowEventModal, daySelected, selectedEvent, setSelectedEvent } = useContext(GlobalContext);
    const { patients } = usePatients();
    const { createConsultation, updateConsultation, deleteConsultation } = useConsultations();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState(daySelected);
    const [endTime, setEndTime] = useState(daySelected);
    const [selectedLabel, setSelectedLabel] = useState(labelHexCodes[0]);
    const [selectedPatient, setSelectedPatient] = useState("");

    useEffect(() => {
        if (selectedEvent) {
            setTitle(selectedEvent.title);
            setDescription(selectedEvent.description);
            setStartTime(dayjs(selectedEvent.startServiceDateAndTime));
            setEndTime(dayjs(selectedEvent.endServiceDateAndTime));
            setSelectedLabel(selectedEvent.color);
            setSelectedPatient(selectedEvent.patientId);
        }
    }, [selectedEvent]);

    console.log("Selected Event:", selectedEvent); 

    const handleStartTimeChange = (time) => {
        setStartTime(time);
    };

    const handleEndTimeChange = (time) => {
        setEndTime(time);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const consultationData = {
            date: daySelected.format(),
            startServiceDateAndTime: startTime.format(),
            endServiceDateAndTime: endTime.format(),
            title,
            description,
            color: selectedLabel
        };

        try {
            if (selectedEvent) {
                await updateConsultation(selectedEvent.id, consultationData); // Aqui estamos chamando updateConsultation
            } else {
                await createConsultation(selectedPatient, consultationData);
            }
            setShowEventModal(false);
        } catch (error) {
            console.error("Error creating/updating consultation:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteConsultation(selectedEvent.id);
            setShowEventModal(false);
            setSelectedEvent(null);
        } catch (error) {
            console.error("Error deleting consultation:", error);
        }
    };

    return (
        <div className='event h-screen w-full fixed md:left-0 top-0 flex justify-center items-center z-10'>
            <form className='bg-white rounded-lg shadow-2xl md:w-1/4 w-full'>
                <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
                    <span className='text-gray-400'>
                    </span>
                    <div className='flex gap-2'>
                        {selectedEvent && (
                            <span
                                className='text-gray-400 cursor-pointer'
                                onClick={() => {
                                    handleDelete();
                                    setSelectedEvent(null);
                                }}
                                title='Delete'
                            >
                                <AiOutlineDelete />
                            </span>
                        )}
                        <button title='Close' onClick={() => {
                            setShowEventModal(false);
                            setSelectedEvent(null);
                        }}>
                            <span className='text-gray-400'>
                                <AiOutlineClose />
                            </span>
                        </button>
                    </div>
                </header>
                <div className="p-3">
                    <p>{daySelected.format("dddd, MMMM, DD")}</p>
                    <div className="grid grid-cols-1/5 items-end gap-y-7">
                        <div></div>
                        <input type="text"
                            name="title"
                            placeholder='Adicione um Título'
                            required
                            className='pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-200'
                            value={title} onChange={(e) => setTitle(e.target.value)}
                        />
                        <span className='text-gray-400 flex items-center'>
                            <AiOutlineClockCircle size={15} /> 
                            <span style={{ marginLeft: '8px' }}>Horário de início</span>
                            </span>
                        <div className='flex flex-col gap-3'>
                            <TimePicker
                                format="HH:mm"
                                minuteStep={15}
                                value={startTime}
                                onChange={handleStartTimeChange}
                                okButtonProps={{
                                    className: 'my-custom-ok-button',
                                }}
                                style={{ width: '100%' }}
                            />
                        </div>
                        <span className='text-gray-400 flex items-center'>
                            <AiOutlineClockCircle /> 
                            <span style={{ marginLeft: '8px' }}>Horário de término</span>
                        </span>
                        <div className='flex flex-col gap-3'>
                            <TimePicker
                                format="HH:mm"
                                minuteStep={15}
                                value={endTime}
                                onChange={handleEndTimeChange}
                                okButtonProps={{
                                    className: 'my-custom-ok-button',
                                }}
                                style={{ width: '100%' }}
                            />
                        </div>
                        <span className='text-gray-400'>
                            <AiOutlineAlignLeft />
                        </span>
                        <select name="patient" required value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
                            <option value="" disabled>Selecione o paciente</option>
                            {patients.map(patient => (
                                <option key={patient.id} value={patient.id}>{patient.fullName}</option>
                            ))}
                        </select>
                        <span className='text-gray-400'>
                            <AiOutlineAlignLeft />
                        </span>
                        <input type="text"
                            name="description"
                            placeholder='Adicione uma descrição'
                            className='pt-3 border-0 text-gray-600  pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-200 flex items-center justify-center'
                            value={description} onChange={(e) => setDescription(e.target.value)}
                        />
                        <span className='text-gray-400'>
                            <AiOutlineBook />
                        </span>
                        <div className="flex gap-x-2">
                            {labelHexCodes.map((lblClass, i) => (
                                <div key={i}
                                    className=" w-4  h-4  flex items-center justify-center cursor-pointer rounded-xl"
                                    style={{ backgroundColor: `${lblClass}` }}
                                    onClick={() => setSelectedLabel(lblClass)}
                                >
                                    <span className='text-white text-xs'>
                                        {selectedLabel === lblClass && < AiOutlineCheck />}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <footer className='flex justify-end md:w-full border-t p-3 mt-5'>
                    <button type='submit' className={`${title && description && selectedPatient ? "bg-blue-100 hover:bg-blue-600" : "bg-blue-500 cursor-not-allowed"}  px-6 py-2 rounded text-white`} disabled={!title || !description || !selectedPatient} 
                    onClick={(e) => {
                        handleSubmit(e);
                        setSelectedEvent(null);
                    }}
                    >
                        Salvar
                    </button>
                </footer>
            </form>
        </div>
    );
};

export default EventModal;
