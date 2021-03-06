import jsonClasses from "../json/classList";

// Classes : Array type into Object
const classes = {};

for(const c of jsonClasses){
  classes[c.cid] = c;
}

// Marks
const MC_EMPTY = 'E';
const MC_ATTEND = 'Y';

const marks = {
  [MC_EMPTY]  : {mcd: MC_EMPTY,  label: '',     emoji: 'π²'},
  [MC_ATTEND] : {mcd: MC_ATTEND, label: 'μΆμ', emoji: 'π©'}
}

export { classes, marks, MC_EMPTY, MC_ATTEND };
