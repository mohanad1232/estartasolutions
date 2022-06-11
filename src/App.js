import axios from "axios";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {dateFilter,textFilter } from "react-bootstrap-table2-filter";


function App() {
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
  let logtimeDateFilter;

  //Creats columns using bootstrap table lib --mohanad alhelo--
  const columns = [
    {
      dataField: "logId",
      text: "logId",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "applicationType",
      text: "applicationType",
      filter: textFilter(),
      sort: true,
    },
    {
      dataField: "applicationId",
      text: "applicationId",
      sort: true,
      editable: false,
      filter: textFilter(),
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
      filter: textFilter(),
      sort: true
    },
  ];
  return (
    <div className="App">
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
