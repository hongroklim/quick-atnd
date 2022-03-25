import React, { useCallback } from "react";
import { useLiveQuery } from 'dexie-react-hooks';

import { db } from "../utils/db";
import { marks, MC_EMPTY, MC_ATTEND } from "../utils/loader";

const AtndList = ({ aClass, pid, filters }) => {
  const students = useLiveQuery(() =>
    db.students.where('cid').equals(aClass.cid).toArray(),
    [aClass]);

  const atnds = useLiveQuery(() =>
    db.marks.where('pid_sid').startsWith(`${pid}_`).toArray(),
    [pid], []);

  const handleMark = async (e) => {
    const sid = e.currentTarget.getAttribute('data-sid');
    const mark = await db.marks.where('pid_sid').equals(`${pid}_${sid}`).first();

    const nextMarkCode = (!mark || mark.mcd === MC_EMPTY) ? MC_ATTEND : MC_EMPTY;
    const item = {pid_sid: `${pid}_${sid}`, mcd: nextMarkCode};

    if(mark){ // Update
      db.marks.put({ ...item, mid: mark.mid })
    }else{ // Insert
      db.marks.add(item);
    }
  }

  const getRoomLabel = useCallback((rid) => {
    const room = aClass.rooms.find(e => e.rid === rid);
    return room ? room.label : null;
  }, [aClass.rooms]);

  const getMarkCode = (sid) => {
    const mark = atnds.find(e => e.pid_sid.endsWith(sid));
    return mark ? mark.mcd : MC_EMPTY;
  }

  const getMarkEmoji = (sid) => marks[getMarkCode(sid)].emoji;

  const filterings = (e => {
    return filters.rooms.includes(e.rid)
          && filters.marks.includes(getMarkCode(e.sid));
  });

  return (
    <>
      <div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>강의실</th>
              <th>전공</th>
              <th>학번</th>
              <th>이름</th>
              <th>출석</th>
            </tr>
          </thead>
          <tbody>
            {students?.filter(filterings).map(e => (
              <tr onClick={handleMark} data-sid={e.sid} key={e.sid}>
                <td>{getRoomLabel(e.rid)}</td>
                <td>{e.major}</td>
                <td>{e.sid}</td>
                <td>{e.name}</td>
                <td>{getMarkEmoji(e.sid)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AtndList;
