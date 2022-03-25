import React, { useState, useEffect } from "react";

import { marks } from "../utils/loader";

const AtndFilter = (props) => {
  const [filters, setFilters] = useState(props.filters);

  const handleChange = (e) => {
    const key = e.target.getAttribute('data-key');
    let value = e.target.getAttribute('data-value');
    value = isNaN(parseInt(value)) ? value : parseInt(value);

    if (key === 'keyword'){
      setFilters({ ...filters, [key]: e.target.value });
      return;
    }

    const values = filters[key].includes(value)
                    ? filters[key].filter(e => e !== value)
                    : filters[key].concat([value]);
    
    setFilters({ ...filters, [key]: values });
  }

  useEffect(() => {
    props.onUpdate(filters);
  }, [filters]);

  return (
    <>
      <div>
        <div>
          {/* Classrooms */}
          {props.roomList.map(e => (
            <label key={e.rid}>
              <input type="checkbox" defaultChecked={filters.rooms.includes(e.rid)}
                     onChange={handleChange} data-key="rooms" data-value={e.rid} />
              {e.label}
            </label> 
          ))}
        </div>

        <div>
          {/* Attendance marks */}
          {Object.keys(marks).map(k => (
            <label key={k}>
              <input type="checkbox" defaultChecked={filters.marks.includes(k)}
                     onChange={handleChange} data-key="marks" data-value={k} />
              {marks[k].emoji} {marks[k].label}
            </label> 
          ))}
        </div>
      </div>

      <div>
        <input type="text" data-key="keyword" placeholder="Name or ID"
               value={filters.keyword} onChange={handleChange} />
      </div>
    </>
  )
}

export default AtndFilter;
