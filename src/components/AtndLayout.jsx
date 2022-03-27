import React, { useEffect } from "react";
import ReactModal from 'react-modal';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import AtndHeader from "./AtndHeader";
import AtndFilter from "./AtndFilter";
import AtndRoster from "./AtndRoster";
import Export from "./Export";

import { loadClass, resetClass, fetchPage } from "../utils/paramSlice";

const AtndLayout = (props) => {
  const dispatch = useDispatch();

  const showExport = useSelector((state) => state.param.showExport);
  const { cid, pid } = useParams();

  useEffect(() => {
    return () => dispatch(resetClass());
  }, [dispatch]);

  useEffect(() => dispatch(loadClass(parseInt(cid))), [dispatch, cid]);
  useEffect(() => dispatch(fetchPage(parseInt(pid))), [dispatch, pid]);

  return (
    <>
      <AtndHeader />
      <AtndFilter />
      <AtndRoster />
      <ReactModal
        appElement={document.getElementById('root')}
        isOpen={showExport}>
        <Export />
      </ReactModal>
    </>
  )
}

export default AtndLayout;
