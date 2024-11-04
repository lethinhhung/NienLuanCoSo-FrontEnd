import { Calendar } from 'antd';

function CustomCalendar({ dateCellRender, handleSelectDate }) {
    return <Calendar cellRender={dateCellRender} onSelect={handleSelectDate} fullscreen={true}></Calendar>;
}

export default CustomCalendar;
