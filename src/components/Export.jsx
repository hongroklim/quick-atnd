import { useState, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { marks } from "../utils/loader";

import { toggleShowExport } from "../utils/paramSlice";

import "../sass/Export.scss";

const STUD_ROW_BEGIN = 6;

const Export = (props) => {
  const dispatch = useDispatch();

  const param = useSelector((state) => state.param);
  const roster = useSelector((state) => state.roster);

  const [showCopied, setShowCopied] = useState(false);

  const sortedStudents = useMemo(() => {
    const maxRow = roster.students.reduce((maxRow, e) =>
                        (e.row > maxRow) ? e.row : maxRow, 0);

    return [...Array(maxRow+1).keys()].splice(STUD_ROW_BEGIN)
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

  const refTextarea = useRef(null);

  const handleTextareaClick = () => {
    if(refTextarea && refTextarea.current) {
      refTextarea.current.focus();
      refTextarea.current.select();
    }
  }

  const handleCopy = (e) => {
    if(!showCopied){
      setShowCopied(true);
      handleTextareaClick();
      document.execCommand('copy');

      setTimeout(() => setShowCopied(false), 1000);
    }
  }

  return (
    <>
      <div className="export-header-wrapper">
        <span className="class-label">{param.aClass.label}</span>
        <span className="page-label">{param.page.label}</span>
        <button onClick={handleCopy} disabled={showCopied}>
          <span>{showCopied ? 'Copied' : 'Copy'}</span>
        </button>
        <button onClick={()=>dispatch(toggleShowExport())}><span>Close</span></button>
      </div>
      <div className="export-desc-wrapper">
        <span>복사 후 {STUD_ROW_BEGIN}번째 행에 붙여넣으세요.</span>
      </div>
      <div className="export-body-wrapper">
        <textarea value={studentsToString(sortedStudents)} readOnly={true}
                  rows={sortedStudents.length} />
        <textarea defaultValue={atndsToString(sortedAtnds)} readOnly={true}
                  onClick={handleTextareaClick} ref={refTextarea}
                  rows={sortedAtnds.length} />
      </div>
    </>
  )
}

export default Export;
