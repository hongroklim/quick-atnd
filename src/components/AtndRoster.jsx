import React, { useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Hangul from "hangul-js";

import { db } from "../utils/db";
import { MC_EMPTY, MC_ATTEND } from "../utils/loader";

import { setKeyword } from "../utils/filterSlice";
import { toggleTryMark } from "../utils/paramSlice";

import "../sass/AtndRoster.scss";

const getChoes = (str) => Hangul.disassemble(str, true)
                                .map(arr => arr[0]).join('');

const AtndRoster = (props) => {
  const dispatch = useDispatch();

  const aClass = useSelector((state) => state.param.aClass);
  const pid = useSelector((state) => state.param.page.pid);
  const filters = useSelector((state) => state.filter);

  const students = useSelector((state) => state.roster.students);
  const atnds = useSelector((state) => state.roster.atnds);

  const kwdSearcher = useMemo(() =>{
    return new Hangul.Searcher(filters.keyword);
  }, [filters.keyword]);

  const getRoomLabel = useCallback((rid) => {
    if(!aClass.rooms) return null;

    const room = aClass.rooms.find(e => e.rid === rid);
    return room ? room.label : null;

  }, [aClass.rooms]);

  const handleMark = async (sid) => {
    const mark = await db.marks.where('pid_sid').equals(`${pid}_${sid}`).first();

    const nextMarkCode = (!mark || mark.mcd === MC_EMPTY) ? MC_ATTEND : MC_EMPTY;
    const item = {pid_sid: `${pid}_${sid}`, mcd: nextMarkCode};

    if(mark){ // Update
      db.marks.put({ ...item, mid: mark.mid })
    }else{ // Insert
      db.marks.add(item);
    }
  }

  const getMarkCode = (sid) => {
    const mark = atnds.find(e => e.pid_sid.endsWith(sid));
    return mark ? mark.mcd : MC_EMPTY;
  }

  const matchesKeyword = (stud) => {
    const intKeyword = parseInt(filters.keyword);

    if(isNaN(intKeyword)){
      // Search for name
      return kwdSearcher.search(stud.name) >= 0
            || kwdSearcher.search(getChoes(stud.name)) >= 0;
    }else{
      // Search for student id
      return stud.sid.indexOf(filters.keyword) >= 0;
    }
  }

  const filterings = (e => {
    return filters.rooms.includes(e.rid)
          && filters.marks.includes(getMarkCode(e.sid))
          && matchesKeyword(e);
  });

  const filteredList = students?.filter(filterings) || [];

  const tryMark = useSelector((state) => state.param.tryMark);
  useEffect(() => {
    if(tryMark && filteredList.length === 1){
      handleMark(filteredList[0].sid);
      dispatch(setKeyword(''));
      dispatch(toggleTryMark());
    }
  }, [tryMark, filteredList, dispatch, handleMark ]);

  return (
    <div className="roster-wrapper">
      <table className="roster-table">
        <thead>
          <tr>
            <th>강의실</th>
            <th>학과</th>
            <th>학번</th>
            <th>이름</th>
          </tr>
        </thead>
        <tbody>
          {students?.filter(filterings).map(e => (
            <tr onClick={()=>handleMark(e.sid)} key={e.sid}
                  className={`mark-${getMarkCode(e.sid)}`}>
              <td>{getRoomLabel(e.rid)}</td>
              <td>{e.major}</td>
              <td>{e.sid}</td>
              <td>{e.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AtndRoster;
