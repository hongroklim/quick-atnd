import { useNavigate } from "react-router-dom";

import { db } from "../utils/db";

import { classes } from "../utils/loader";

const ClassList = () => {
  const navigate = useNavigate();

  const handleLink = async (cid) => {
    const pid = await db.pages
                        .where('cid').equals(cid)
                        .last(p => p ? p.pid : '');

    navigate(`/roster/${cid}/${pid}`);
  }

  const handleReset = () => {
    if(window.confirm('Are you sure to delete all databases?')){
      db.delete().then(() => {
        db.open().then(() => {
          window.alert('Database sucessfully reset.');
        }).catch((err) => {
          console.error(err);
          alert('Database is deleted, but failed to reopen.');
        });

      }).catch((err) => {
        console.error(err);
        alert('Failed to delete database.');
      });
    }
  }

  return (
    <div>
      <div>Quick Attendance</div>
      <ul>
        {Object.keys(classes).map(k => classes[k]).map(c => (
          <li onClick={() => handleLink(c.cid)} key={c.cid}>
            {c.label}
          </li>
        ))}
      </ul>
      <ul>
        <li onClick={() => navigate('/log')}>
          Log
        </li>
        <li onClick={handleReset}>
          Reset
        </li>
        <li>
          <a href="https://github.com/hongroklim/quick-attendance">Github</a>
        </li>
      </ul>
    </div>
  )
}

export default ClassList;
