import { useSelector, useDispatch } from "react-redux";

import {
  DEFAULT_LOGFILTER,
  LOGFILTER_LISTS,
  updateList,
  updateValue
} from "../utils/logFilterSlice";

import classnames from "classnames";
import "../sass/LogFilter.scss";

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
      {LOGFILTER_LISTS.map(k => (
        <div className="log-list-wrapper" key={k}>
          <div className="label">{k}</div>
          {DEFAULT_LOGFILTER[k].map(e => (
            <div className={classnames('checkbox', {active: filter[k].includes(e)})}
                  onClick={()=>handleListChange(k, e)} key={e}>
              {e}
            </div>
          ))}
        </div>
      ))}
      <div className="log-text-wrapper">
        <span className="label">date</span>
        <input type="date" data-key="date" value={filter.date}
          onChange={(e)=>handleValueChange('date', e.target.value)} />
        <button onClick={()=>handleValueChange('date', '')}>clear</button>
      </div>
      <div className="log-text-wrapper">
        <span className="label">sid</span>
        <input type="text" data-key="sid" value={filter.sid} placeholder=""
                onChange={(e)=>handleValueChange('sid', e.target.value)} />
      </div>
    </div>
  )
}

export default LogFilter;
