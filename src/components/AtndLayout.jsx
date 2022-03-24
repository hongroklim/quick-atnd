import React, { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "react-router-dom";
import { useLiveQuery } from 'dexie-react-hooks';

import AtndHeader from "./AtndHeader";
import AtndFilter from "./AtndFilter";
import AtndSearch from "./AtndSearch";
import AtndList from "./AtndList";

import { db } from "../utils/db";

const AtndLayout = (props) => {
  let [params, setParams] = useSearchParams();

  const aClass = useLiveQuery(
    () => db.classes.where('cid').equals(parseInt(params.get('cid'))).first(),
    [params]);

  if(!aClass) return null;

  const handleMovePage = (nextPid) => {
    setParams({ ...Object.fromEntries(params), pid: nextPid });
  }

  return (
    <>
      <AtndHeader aClass={aClass} pid={parseInt(params.get('pid'))} onMove={handleMovePage} />
      <AtndFilter />
      <AtndSearch />
      <AtndList />
    </>
  )
}

export default AtndLayout;
