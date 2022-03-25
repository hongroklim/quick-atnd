import React, { useState } from "react"
import { useSearchParams } from "react-router-dom";

import AtndHeader from "./AtndHeader";
import AtndFilter from "./AtndFilter";
import AtndList from "./AtndList";

import { classes, marks } from "../utils/loader";

const getDefaultFilters = (aClass) => {
  return {
    rooms: aClass.rooms.map(e => e.rid),
    marks: Object.keys(marks),
    keyword: ''
  };
}

const AtndLayout = (props) => {
  let [params, setParams] = useSearchParams();

  const aClass = classes[parseInt(params.get('cid'))];

  const [filters, setFilters] = useState(getDefaultFilters(aClass));

  const handleMovePage = (nextPid) => {
    setParams({ ...Object.fromEntries(params), pid: nextPid });
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  }

  return (
    <>
      <AtndHeader aClass={aClass} pid={parseInt(params.get('pid'))}
                  onMove={handleMovePage} />

      <AtndFilter roomList={aClass.rooms} filters={filters}
                  onUpdate={handleFilterChange} />

      <AtndList aClass={aClass} pid={parseInt(params.get('pid'))}
                filters={filters} />
    </>
  )
}

export default AtndLayout;
