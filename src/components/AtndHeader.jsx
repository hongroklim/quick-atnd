const AtndHeader = ({ aClass, page, onMove, onRename }) => {
  const getPrev = (cid, pid) => 1;
  const getNext = (cid, pid) => null;

  const handleMove = (e) => {
    // TODO move the page
    const pid = parseInt(e.target.getAttribute('data-pid'));
    onMove(pid);
  }

  const handleRename = (e) => {
    const newLabel = window.prompt('Type a new name of this page.', page.label);
    if(newLabel && page.label !== newLabel){
      // TODO rename the page
      onRename(newLabel);
    }
  }

  const handleDelete = (e) => {
    if(window.confirm('Are you sure to remove this page?')){
      // TODO reload the page
      const prevPid = getPrev(aClass.id, page.pid);
      console.log('delete then reload the page');

      // Reload a new page
      onMove(null);
    }
  }

  const handleAppend = (e) => {
    // TODO append the new page
    console.log('append');

    // onMove(newPid);
  }

  return (
    <div>
      <button onClick={handleMove}
              data-pid={getPrev(aClass.id, page.pid)}
              disabled={!getPrev(aClass.id, page.pid)}> ◄◄ </button>
      <div>
        <div>{aClass.label}</div>
        <div>
          {page.label}
          <button onClick={handleRename}> ✏️ </button>
          <button onClick={handleDelete}> ❌ </button>
        </div>
      </div>
      {!getNext(aClass.id, page.pid)
        ? <button onClick={handleAppend}> + </button>
        : <button onClick={handleMove}
                  data-pid={getNext(aClass.id, page.pid)}> ►► </button>}
    </div>
  )
}

export default AtndHeader;
