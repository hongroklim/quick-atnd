const genKey = (obj) => {
  const [dt, tm] = new Date(+new Date() + 3240 * 10000).toISOString().split("T");
  return 'LOG'
          + dt.replace(/\d{2}(\d{2})-(\d{2})-(\d{2})/g, '$1$2$3') +
          + tm.replace(/(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z/g, '$1$2$3$4')
          + obj.pos
          + Math.random().toString(36).substr(2,2);
}

export const log = async (obj) => {
  window.localStorage.setItem(genKey(obj), JSON.stringify(obj));
}
