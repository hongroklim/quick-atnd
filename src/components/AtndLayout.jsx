import React, { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "react-router-dom";

import AtndHeader from "./AtndHeader";
import AtndFilter from "./AtndFilter";
import AtndSearch from "./AtndSearch";
import AtndList from "./AtndList";

import {
  getLatestPid,
  generatePage,
  loadPage
} from "../utils/pageUtils"

import classes from "../json/classList.json";

const AtndLayout = (props) => {
  let [params, setParams] = useSearchParams();

  const getClassId = useCallback(() => parseInt(params.get('cid')), [params]);
  const getPageId = useCallback(() => parseInt(params.get('pid')), [params]);

  useEffect(() => {
    // Default pageId is the latest one
    if (isNaN(getPageId())) {
      // If there is no page, generate the new page (with side effect)
      const cid = getClassId();
      const pageId = getLatestPid(cid) || generatePage(cid);
      setParams({ ...Object.fromEntries(params), pid: pageId });
    }
  }, [params, setParams, getClassId, getPageId]);


  const [aClass] = useState(classes.find(c => c.id === getClassId()));
  const [page, setPage] = useState(loadPage(getPageId()));

  const handleMovePage = (pid) => {
    const pageId = pid || getLatestPid(getClassId()); 
    setParams({ ...Object.fromEntries(params), pid: pageId });
  }

  const handleRenamePage = (label) => {
    setPage({ ...page, label: label })
  }

  return (
    <>
      <AtndHeader aClass={aClass} page={page}
                  onMove={handleMovePage} onRename={handleRenamePage} />
      <AtndFilter />
      <AtndSearch />
      <AtndList />
    </>
  )
}

export default AtndLayout;
