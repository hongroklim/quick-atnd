import jsonClasses from "../json/classList";

// Classes : Array type into Object
const classes = {};

for(const c of jsonClasses){
  classes[c.cid] = c;
}

// Marks
const marks = {
  E : {mcd: 'E', label: 'Empty',   emoji: '🔲'},
  Y : {mcd: 'Y', label: 'Checked', emoji: '🟩'}
}

const MC_EMPTY = 'E';
const MC_ATTEND = 'Y';

export { classes, marks, MC_EMPTY, MC_ATTEND };
