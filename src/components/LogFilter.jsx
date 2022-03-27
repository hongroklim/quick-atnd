import { useSelector, useDispatch } from "react-redux";

import {
  DEFAULT_LOGFILTER,
  LOGFILTER_LISTS,
  updateList,
  updateValue
} from "../utils/logFilterSlice";

const LogFilter = (props) => {
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.logFilter);

  const handleListChange = (key, value) => {
    dispatch(updateList({key: key, value: value}));
  }

  const handleValueChange = (key, value) => {
    dispatch(updateValue({key: key, value: value}));
  }

  return (
    <div>
      <div>
        <span>date</span>
        <input type="date" data-key="date" value={filter.date}
          onChange={(e)=>handleValueChange('date', e.target.value)} />
        <button onClick={()=>handleValueChange('date', '')}>reset</button>
      </div>
      {LOGFILTER_LISTS.map(k => (
        <div key={k}>
          <span>{k}</span>
          {DEFAULT_LOGFILTER[k].map(e => (
            <label key={e}>
              <input type="checkbox" defaultChecked={filter[k].includes(e)}
                  onChange={()=>handleListChange(k, e)} />
              {e}
            </label>
          ))}
        </div>
      ))}
      <div>
        <span>sid</span>
        <input type="text" data-key="sid" value={filter.sid} placeholder=""
                onChange={(e)=>handleValueChange('sid', e.target.value)} />
      </div>
    </div>
  )
}

export default LogFilter;
