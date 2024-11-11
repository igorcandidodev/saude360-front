import AddButton from "../AddButton";
/* import JumpByWeek from "./JumpByWeek" */
import SmallCalender from "./SmallCalender";
import Appointments from "../Appointments/Appointments";

const Sidebar = () => {
  return (
    <aside className="border bg-gray2 px-5 w-50 pt-12">
      {/* Create Event Dummy Button for testing  */}
      <AddButton />
      <SmallCalender />
      {/*         <JumpByWeek /> */}
      {/*         <Appointments/> */}
    </aside>
  );
};

export default Sidebar;
