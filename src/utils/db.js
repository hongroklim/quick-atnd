import Dexie from "dexie";

class AtndDB extends Dexie {
  constructor() {
    super('AtndDB');
    this.version(1).stores({
      classes: '++cid',
      pages: '++pid, cid'
    });
  }
}

export const db = new AtndDB();

db.on('populate', async () => {
  const cid = await db.classes.add({
    label: 'AI-X: DL'
  });

  await db.pages.bulkAdd([
    {cid: cid, label: 'label1'},
    {cid: cid, label: 'label2'}
  ]);
});
