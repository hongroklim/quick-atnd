import { useSelector, useDispatch } from "react-redux";

import { updateRoom, updateMark, setKeyword } from "../utils/filterSlice";

import { marks } from "../utils/loader";

const AtndFilter = (props) => {
  const rooms = useSelector((state) => state.param.aClass.rooms);
  const filters = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <div>
          {/* Classrooms */}
          {rooms?.map(e => (
            <label key={e.rid}>
              <input type="checkbox" defaultChecked={filters.rooms.includes(e.rid)}
                      onChange={()=>dispatch(updateRoom(e.rid))} />
              {e.label}
            </label>
          ))}
        </div>

        <div>
          {/* Attendance marks */}
          {Object.keys(marks).map(k => (
            <label key={k}>
              <input type="checkbox" defaultChecked={filters.marks.includes(k)}
                      onChange={()=>dispatch(updateMark(k))} />
              {marks[k].emoji} {marks[k].label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <input type="text" value={filters.keyword} placeholder="Name or ID"
                onChange={(e)=>dispatch(setKeyword(e.target.value))} />
      </div>
    </>
  )
}

export default AtndFilter;
