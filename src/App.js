import axios from "axios";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {dateFilter,textFilter,Comparator } from "react-bootstrap-table2-filter";


let actionType;
let logtimeDateFilter;
let appid;
let aapptype;
let logid;

export function App() {
  //fetch data from api using axios --mohanad alhelo--
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f").then((res) => {
      let data = res.data.result.auditLog
      console.log(data);
      setData(data);  
    });
  };
  
  //Creats columns using bootstrap table lib --mohanad alhelo--
  const columns = [
    {
      dataField: "logId",
      text: "logId",
      sort: true,
      filter: textFilter({
        getFilter: (filter) => {
          logid = filter;
        }
      })
    },
    {
      dataField: "applicationType",
      text: "applicationType",
      filter: textFilter({
        getFilter: (filter) => {
          aapptype = filter;
        }
      }),
      sort: true,
    },
    {
      dataField: "applicationId",
      text: "applicationId",
      sort: true,
      editable: false,
      filter: textFilter({
        getFilter: (filter) => {
          appid = filter;
        }
      }),
    },
    {
      dataField: "creationTimestamp",
      text: "Time",
      sort: true,
      editable: false,
      filter: dateFilter({
        getFilter: (filter) => {
          logtimeDateFilter = filter;
         
        }
      })
    },
    {
      dataField: "actionType",
      text: "actionType",
      filter: textFilter({
        getFilter: (filter) => {
          actionType = filter;
        }
      }),
      sort: true
    },
  ];
  const handleClick = () => {
    actionType('');
    logtimeDateFilter('');
    appid('');
    aapptype('');
    logid('');
  };

  return (
    <div className="App">
       <button className="btn btn-lg btn-primary" onClick={ handleClick }> Clear all filters </button>
      <BootstrapTable
        keyField="logId"
        data={data}
        columns={columns}
        striped
        hover
        condensed
        pagination={paginationFactory()}
        filter={filterFactory()}
        filterPosition="top"
      />
    </div>
  );
}
export default App;
