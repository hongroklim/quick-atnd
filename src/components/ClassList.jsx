import { Link } from "react-router-dom";
import { useLiveQuery } from 'dexie-react-hooks';

import { db } from "../utils/db";

const ClassList = () => {
  const classes = useLiveQuery(() => db.classes.toArray());

  return (
    <div>
      <div>Quick Attendance</div>
      <ul>
        {classes?.map(e => (
          <Link to={`/class?cid=${e.cid}`} key={e.cid}>
            <li>{e.label}</li>
          </Link>
        ))}
      </ul>
      <ul>
        <Link to="/log">
          <li>log</li>
        </Link>
      </ul>
    </div>
  )
}

export default ClassList;
