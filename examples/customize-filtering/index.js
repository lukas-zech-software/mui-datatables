import React from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "../../src/";
import TextField from "@material-ui/core/TextField";

class Example extends React.Component {

  render() {

    const columns = [
      // A column in the current configuration object api
      {
        name: "Birthday",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (x) => <b>{new Date(x).toISOString()}</b>,
          customFilterValueRender: (filterValue) => {
            return <b>{new Date(filterValue).toISOString().split('T')[0]}</b>;
          },
          customFilterFn: (filterValues, columnValue) => {
            return new Date(filterValues[0]).getTime() >= new Date(columnValue).getTime();
          },
          customFilterRender: (filterValues, onChange, className) => {
            return (
              <TextField
                id="Birthday"
                key="Birthday"
                label="Birthday"
                className={className}
                type="date"
                value={filterValues[0] || "1995-05-01"}
                InputLabelProps={{
                  shrink: true,
                }}
                /* DO NOT FORGET TO CALL THE `onChange` METHOD! */
                /* TYPE MULTISELECT MUST RETURN AN ARRAY!! */
                onChange={(e) => onChange([e.target.value])}
              />
            );
          },
        }
      }
    ];

    return (
      <MUIDataTable>
        {/*This describes the same column as above as React component*/}
        <MUIDataTableColumn
          name="Birthday"
          filter
          sort
          // Its possible to reuse the internal components for own components
          Cell={(x) => <MUIDataTableCell>{new Date(x).toISOString()}</MUIDataTableCell>}
          FilterValue={(x) => <b>{new Date(x).toISOString()}</b>}
          FilterControl={(filterValues, onChange, className) => (
            <TextField
              id="Birthday"
              key="Birthday"
              label="Birthday"
              className={className}
              type="date"
              value={filterValues[0] || "1995-05-01"}
              onChange={(e) => onChange([e.target.value])}
            />
          )}
        />
      </MUIDataTable>
    );

  }
}

ReactDOM.render(<Example/>, document.getElementById("app-root"));
