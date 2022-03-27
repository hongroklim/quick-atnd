import React, { useState } from "react";
import { useSelector } from "react-redux";

import LogFilter from "./LogFilter";

import {
  DEFAULT_LOGFILTER,
  LOGFILTER_LISTS,
  SID_KEYS
} from "../utils/logFilterSlice";

const logFilterKeys = Object.keys(DEFAULT_LOGFILTER);

const includedDate = (date, key) => {
  return key.includes(date.substr(2).replaceAll('-', ''));
}

const includedSid = (sid, objArr) => {
  return objArr.map(e => {
    return SID_KEYS
            .map(k => e[k] && e[k].includes(sid))
            .some(e => e);
  }).some(e => e);
}

const regexp = /LOG(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{3}).*/g;
const parseTS = (key) => key.replace(regexp, '$1:$2:$3 $4:$5:$6.$7');

const parseReqValues = (arr) => {
  return arr?.map(e => {
    return Object.keys(e).sort().map(k => `${k}: ${e[k]}`).join(', ')
  }).join('\n')
}

const getRow = (key, obj) => {
  return (
    <tr key={key}>
      <td>{parseTS(key)}</td>
      <td>{obj.pos}</td>
      <td>{obj.tblNm}</td>
      <td>{obj.type}</td>
      <td>{parseReqValues(obj.reqValues)}</td>
      <td>{obj.results?.toString()}</td>
    </tr>
  )
}

const Log = () => {
  const [keyLength] = useState(window.localStorage.length);
  const filter = useSelector((state) => state.logFilter);

  const filterList = (key, obj) => {
    return logFilterKeys.map(k => {
      if(LOGFILTER_LISTS.includes(k)){
        return filter[k].includes(obj[k]);

      }else if(k === 'date'){
        return !filter[k] || includedDate(filter[k], key);

      }else{ // sid
        return !filter[k] || includedSid(filter[k], obj.reqValues);
      }

    }).every(e => e);
  }

  return (
    <>
      <LogFilter />
      <div>
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Pos</th>
              <th>Table</th>
              <th>Type</th>
              <th>Requests</th>
              <th>Keys</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(keyLength).keys()]
                .map(i => window.localStorage.key(i))
                .filter(k => k.startsWith('LOG'))
                .sort()
                .map(k => [k, JSON.parse(window.localStorage.getItem(k))])
                .filter(kv => filterList(kv[0], kv[1]))
                .map(kv => getRow(kv[0], kv[1]))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Log;
