import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { marks } from "../utils/loader";

import { toggleShowExport } from "../utils/paramSlice";

import "../sass/Export.scss";

const Export = (props) => {
  const dispatch = useDispatch();

  const param = useSelector((state) => state.param);
  const roster = useSelector((state) => state.roster);

  const sortedStudents = useMemo(() => {
    const maxRow = roster.students.reduce((maxRow, e) =>
                        (e.row > maxRow) ? e.row : maxRow, 0);

    return [...Array(maxRow+1).keys()].splice(1)
      .map(n => {
        const student = roster.students.find(e => e.row === n) || {};
        return {row: n, sid: student.sid || '', name: student.name || ''};
      });

  }, [roster.students]);

  const sortedAtnds = useMemo(() => {
    return sortedStudents.map(stud => {
      const student = !stud.sid ? {} :
                (roster.atnds.find(e => e.pid_sid.endsWith(`_${stud.sid}`)) || {});
      return {label: (student.mcd ? marks[student.mcd].label : '')};
    });
  }, [sortedStudents, roster.atnds]);

  const studentsToString = (arr) =>
            arr.map(e => `${e.row}\t${e.name}`).join('\n');

  const atndsToString = (arr) => arr.map(e => e.label).join('\n');

  return (
    <>
      <div className="export-header-wrapper">
        <span className="class-label">{param.aClass.label}</span>
        <span className="page-label">{param.page.label}</span>
        <button onClick={()=>dispatch(toggleShowExport())}><span>Close</span></button>
      </div>
      <div className="export-body-wrapper">
        <textarea value={studentsToString(sortedStudents)}
                  rows={sortedStudents.length} readOnly={true} />
        <textarea defaultValue={atndsToString(sortedAtnds)}
                  rows={sortedAtnds.length} />
      </div>
    </>
  )
}

export default Export;
