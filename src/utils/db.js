import Dexie from "dexie";

import { classes } from "./loader";

class AtndDB extends Dexie {
  constructor() {
    super('AtndDB');
    this.version(1).stores({
      pages: '++pid, cid',
      students: '++sid, cid',
      marks: '++mid, pid_sid'
    });
  }

  deletePage(pid) {
    this.transaction('rw', this.pages, this.marks, async () => {
      // Delete Corresponding Marks
      await this.marks
                .where('pid_sid').startsWith(`${pid}_`)
                .primaryKeys(pks => db.marks.bulkDelete(pks));

      // Delete the Page
      this.pages.delete(pid);
    });
  }
}

export const db = new AtndDB();

db.on('populate', () => {
  // Default page
  db.pages.bulkAdd(Object.keys(classes).map(k => {
    return {cid: parseInt(k), label: 'Quick Attendance'}
  }));

  // Students
  for(const k in classes){
    let list = require(`../json/${classes[k].filepath}`);
    db.students.bulkAdd(list.map(e => {
      return { ...e, cid: classes[k].cid }}));
  }
});
