import { Link } from "react-router-dom";

import classes from "../json/classList.json";

const ClassList = () => {
  return (
    <div>
      <div>Quick Attendance</div>
      <ul>
        {classes.map(e => (
          <Link to={`/class?cid=${e.id}`} key={e.id}>
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
