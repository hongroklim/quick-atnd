import React from "react";
import { useLiveQuery } from 'dexie-react-hooks';

import { db } from "../utils/db";

const fetchPage = async (cid, pid) => {
  const _page = await db.pages.get(pid);

  // Right before the pageId
  let _prevPid = null;
  await db.pages.where('cid').equals(cid)
    .eachPrimaryKey(k => {_prevPid = (_prevPid < k && k < pid) ? k : _prevPid});

  // Right after the pageId
  let _nextPid = Number.MAX_SAFE_INTEGER;
  await db.pages.where('cid').equals(cid)
    .eachPrimaryKey(k => {_nextPid = (_nextPid > k && k > pid) ? k : _nextPid})
  _nextPid = _nextPid === Number.MAX_SAFE_INTEGER ? null : _nextPid;

  return [_page, _prevPid, _nextPid];
};

const getTimestamp = () => {
  const [dt, tm] = new Date(+new Date() + 3240 * 10000).toISOString().split("T");
  return dt.replace(/\d{2}(\d{2})-(\d{2})-(\d{2})/g, '$1.$2.$3') +
          ' ' + tm.replace(/(\d{2}):(\d{2}):(\d{2}).*/g, '$1:$2:$3');
}

const AtndHeader = ({ aClass, pid, onMove }) => {
  const _rs = useLiveQuery(() => fetchPage(aClass.cid, pid), [aClass, pid]);
  if (!_rs) return null;

  const [page, prevPid, nextPid] = _rs;

  const handleMove = (e) => {
    const newPid = parseInt(e.target.getAttribute('data-pid'));
    onMove(newPid);
  }

  const handleRename = (e) => {
    const newLabel = window.prompt('Type a new name of this page.', page.label);
    if(newLabel && page.label !== newLabel){
      db.pages.put({ ...page, label: newLabel });
    }
  }

  const handleDelete = async (e) => {
    if (!prevPid && !nextPid) {
      alert('There should be at least one page.');
      return;
    }

    if(window.confirm('Are you sure to remove this page?')){
      await db.pages.delete(pid);

      // Next page is the following, otherwise the previous one.
      onMove(nextPid ? nextPid : prevPid);
    }
  }

  const handleAppend = async (e) => {
    const newPid = await db.pages.add({
      cid: aClass.cid, label: getTimestamp()});
    onMove(newPid);
  }

  return (
    <div>
      <button onClick={handleMove}
              data-pid={prevPid}
              disabled={!prevPid}> ◄◄ </button>
      <div>
        <div>{aClass.label}</div>
        <div>
          {page.label}
          <button onClick={handleRename}> ✏️ </button>
          <button onClick={handleDelete}> ❌ </button>
        </div>
      </div>
      {!nextPid
        ? <button onClick={handleAppend}> + </button>
        : <button onClick={handleMove}
                  data-pid={nextPid}> ►► </button>}
    </div>
  )
}

export default AtndHeader;
