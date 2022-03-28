import { useNavigate } from "react-router-dom";

import { db } from "../utils/db";

import { classes } from "../utils/loader";

import "../sass/ClassList.scss";

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
      <div className="logo-wrapper">
        <img src="/logo.png" alt="Quick Attendance" className="logo" />
      </div>

      <div className="class-wrapper">
        {Object.keys(classes).map(k => classes[k]).map(c => (
          <div onClick={() => handleLink(c.cid)} key={c.cid} className="class-label">
            <span>{c.label}</span>
          </div>
        ))}
      </div>

      <div className="link-wrapper">
        <div onClick={() => navigate('/log')}>
          Log
        </div>
        <div onClick={handleReset}>
          Reset
        </div>
        <div>
          <a href="https://github.com/hongroklim/quick-atnd"
              target="_blank" rel="noreferrer">Github</a>
        </div>
      </div>
    </div>
  )
}

export default ClassList;
