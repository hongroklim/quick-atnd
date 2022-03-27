import Dexie from "dexie";

import { classes } from "./loader";
import { log } from "./logger";

import store from "./store";
import { fetchAtnds } from "./rosterSlice";
import { fetchPage } from "./paramSlice";

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

const proxyRequest = async (tableName, req) => {
  log({pos: '1', tblNm: tableName, type: req.type,
        reqValues: req.values || req.keys.map(k => ({key: k}))});
}

const proxyResponse = async (tableName, req, res) => {
  log({pos: '2', tblNm: tableName, type: req.type,
        reqValues: req.values || req.keys.map(k => ({key: k})),
        results: res.results || []});

  // Dispatch Attendance
  if(tableName === 'marks'
      && ['put', 'add', 'delete'].includes(req.type)
      && req.values){
    store.dispatch(fetchAtnds(req.values[0].pid_sid.split('_')[0]));
  }else if(tableName === 'pages' && req.type === 'put'){
    store.dispatch(fetchPage(req.values[0].pid, false));
  }
}

const proxyResponseError = async (tableName, req, e) => {
  log({pos: '3', tblNm: tableName, type: req.type, reqValues: req.values, err: e});
}

db.use({
  stack: "dbcore", name: "MutateProxy",
  create (downlevelDatabase) {
    return {
      ...downlevelDatabase,
      table (tableName) {
        const downlevelTable = downlevelDatabase.table(tableName);
        return {
          ...downlevelTable,
          mutate: req => {
            const myRequest = {...req};
            proxyRequest(tableName, myRequest);
            return downlevelTable.mutate(myRequest).then(res => {
              const myResponse = {...res};
              proxyResponse(tableName, myRequest, myResponse);
              return myResponse;
            }).catch(e => proxyResponseError(tableName, myRequest, e));
          }
        }
      }
    };
  }
});
