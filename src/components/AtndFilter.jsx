import { useSelector, useDispatch } from "react-redux";

import { updateRoom, updateMark, setKeyword } from "../utils/filterSlice";
import { toggleTryMark } from "../utils/paramSlice";

import { marks, MC_ATTEND } from "../utils/loader";

import classnames from "classnames";
import "../sass/AtndFilter.scss";

const AtndFilter = (props) => {
  const dispatch = useDispatch();

  const rooms = useSelector((state) => state.param.aClass.rooms);
  const filters = useSelector((state) => state.filter);
  const atnds = useSelector((state) => state.roster.atnds);

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      dispatch(toggleTryMark())
    }
  }

  return (
    <>
      <div className="rooms-wrapper">
        {/* Classrooms */}
        {rooms?.map(e => (
          <div className={classnames('checkbox', {active: filters.rooms.includes(e.rid)})}
                  key={e.rid} onClick={()=>dispatch(updateRoom(e.rid))}>
            {e.label}
          </div>
        ))}
      </div>

      <div className="marks-wrapper">
        {/* Attendance marks */}
        {Object.keys(marks).map(k => (
          <div className={classnames('checkbox', {active: filters.marks.includes(k)})}
                    key={k} onClick={()=>dispatch(updateMark(k))}>
            {marks[k].emoji}
          </div>
        ))}
      </div>

      <div className="input-wrapper">
        <input type="text" value={filters.keyword} placeholder="Name or ID"
                autoComplete="false"
                onFocus={()=>dispatch(setKeyword(''))}
                onKeyPress={handleKeyPress}
                onChange={(e)=>dispatch(setKeyword(e.target.value))} />
        <span>🟩 {atnds.filter(e => e.mcd === MC_ATTEND).length}</span>
      </div>
    </>
  )
}

export default AtndFilter;
