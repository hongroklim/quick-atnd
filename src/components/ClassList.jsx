import { Link, useNavigate } from "react-router-dom";

import { db } from "../utils/db";

import { classes } from "../utils/loader";

const ClassList = () => {
  const navigate = useNavigate();

  const handleLink = async (e) => {
    e.preventDefault();

    const cid = parseInt(e.currentTarget.getAttribute('data-cid'));
    const pid = await db.pages
                        .where('cid').equals(cid)
                        .last(p => p ? p.pid : '');

    navigate(`/class?cid=${cid}&pid=${pid}`);
  }

  return (
    <div>
      <div>Quick Attendance</div>
      <ul>
        {Object.keys(classes).map(k => classes[k]).map(c => (
          <div onClick={handleLink} data-cid={c.cid} key={c.cid}>
            <li>{c.label}</li>
          </div>
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
