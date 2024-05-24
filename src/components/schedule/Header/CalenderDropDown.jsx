import { useContext } from "react";
import GlobalContext from "../../../context/GlobalContext";
import { Button } from 'antd';

const CalenderButtons = () => {
    const { viewCalender, setViewCalender } = useContext(GlobalContext);

    // Button Items
    const items = [
        {
            key: 'Day',
            label: 'Dia',
            onClick: () => {
                setViewCalender('Day'); // Update global context
            }
        },
        {
            key: 'Week',
            label: 'Semana',
            onClick: () => {
                setViewCalender('Week'); // Update global context
            }
        },
        {
            key: 'Month',
            label: 'Mês',
            onClick: () => {
                setViewCalender('Month'); // Update global context
            }
        }/* ,
        {
            key: 'Appointments',
            label: 'Appointments',
            onClick: () => {
                setViewCalender('Appointments'); // Update global context
            }
        } */
    ];

    return (
        <div className="button-group">
            {items.map(item => (
                <Button
                    key={item.key}
                    type={viewCalender === item.key ? 'primary' : 'default'}
                    onClick={item.onClick}
                    style={{ marginRight: '8px', backgroundColor: viewCalender === item.key ? 'blue' : undefined, color: viewCalender === item.key ? 'white' : undefined }}
                >
                    {item.label}
                </Button>
            ))}
        </div>
    );
}

export default CalenderButtons;
