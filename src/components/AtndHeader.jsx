import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLiveQuery } from 'dexie-react-hooks';

import { db } from "../utils/db";
import { toggleShowExport } from "../utils/paramSlice";

import "../sass/AtndHeader.scss";

const fetchPrevNext = async (cid, pid) => {
  // Early return
  if(!cid || !pid) return null;

  // Right before the pageId
  let _prevPid = null;
  await db.pages.where('cid').equals(cid)
    .eachPrimaryKey(k => {_prevPid = (_prevPid < k && k < pid) ? k : _prevPid});

  // Right after the pageId
  let _nextPid = Number.MAX_SAFE_INTEGER;
  await db.pages.where('cid').equals(cid)
    .eachPrimaryKey(k => {_nextPid = (_nextPid > k && k > pid) ? k : _nextPid})
  _nextPid = _nextPid === Number.MAX_SAFE_INTEGER ? null : _nextPid;

  return [_prevPid, _nextPid];
};

const getTimestamp = () => {
  const [dt, tm] = new Date(+new Date() + 3240 * 10000).toISOString().split("T");
  return dt.replace(/\d{2}(\d{2})-(\d{2})-(\d{2})/g, '$1.$2.$3') +
          ' ' + tm.replace(/(\d{2}):(\d{2}):(\d{2}).*/g, '$1:$2:$3');
}

const AtndHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const aClass = useSelector((state) => state.param.aClass);
  const page = useSelector((state) => state.param.page);

  const _rs = useLiveQuery(()=>fetchPrevNext(aClass.cid, page.pid), [aClass, page]);
  if (!_rs) return (<div>placeholder</div>);

  const [prevPid, nextPid] = _rs;

  const handleMove = (pid) => {
    navigate(`/roster/${aClass.cid}/${pid}`);
  }

  const handleRename = (e) => {
    const newLabel = window.prompt('Type a new name of this page.', page.label);
    if(newLabel && page.label !== newLabel){
      db.pages.put({ ...page, label: newLabel });
    }
  }

  const handleDelete = async (e) => {
    if (!prevPid && !nextPid) {
      window.alert('There should be at least one page.');
      return;
    }

    if(window.confirm(`Are you sure to remove "${page.label}"?`)){
      db.deletePage(page.pid);

      // Next page is the following, otherwise the previous one.
      handleMove(nextPid ? nextPid : prevPid);
    }
  }

  const handleAppend = async (e) => {
    const newPid = await db.pages.add({
      cid: aClass.cid, label: getTimestamp()});
    handleMove(newPid);
  }

  return (
    <>
      <div className="header-container">
        <div className="breadcrumb">
          <span onClick={()=>navigate('/')} className="clickable">Home</span>
          <span className="sep" />
          <span>{aClass.label}</span>
        </div>
        <div className="btn-wrapper">
          <button onClick={()=>dispatch(toggleShowExport())}>Export</button>
          <button onClick={handleDelete}>X</button>
        </div>
      </div>

      <div className="page-wrapper">
        <button onClick={() => handleMove(prevPid)} disabled={!prevPid}><span>Prev</span></button>

          <span onClick={handleRename} className="page-label">{page.label}</span>

          {!nextPid
            ? <button onClick={handleAppend} className="add"><span>Add</span></button>
            : <button onClick={() => handleMove(nextPid)}><span>Next</span></button>}
      </div>
    </>
  )
}

export default AtndHeader;
