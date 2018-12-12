import React from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "../../src/";
import TextField from "@material-ui/core/TextField";
import classnames from "classnames";

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

    /*Same component, this time with children instead of render props*/
    /*All MUIDataTable.* components will not actually be rendered, they're just containers for the API*/
    return (
      <MUIDataTable>

        <MUIDataTable.Row>
          {/*called for each row can do formatting or even wrapping in custom components*/}
          {(value, children) => (
            <MUIDataTableRow className={classnames({'isActive': value[1].isActive})}
                             style={{color: value[1].isActive ? "red" : "blue"}}>
              {children}
            </MUIDataTableRow>
          )}
        </MUIDataTable.Row>

        <MUIDataTableColumn
          name="Birthday"
          filter
          sort
        >
          <MUIDataTable.Cell>
            {(x) => (
              // Its possible to reuse the internal components for own components*/
              <MUIDataTableCell className={classnames({'isActive': x.isActive})}>
                {new Date(x).toISOString()}
              </MUIDataTableCell>
            )}
          </MUIDataTable.Cell>


          <MUIDataTable.Cell>
            {(x) => (
              <MUIDataTableFilterValue>
                {new Date(x).toISOString()}
              </MUIDataTableFilterValue>
            )}
          </MUIDataTable.Cell>

          <MUIDataTable.Cell>
            {(filterValues, onChange, className) => (
              <MUIDataTableFilterControl>
                <TextField
                  id="Birthday"
                  key="Birthday"
                  label="Birthday"
                  className={className}
                  type="date"
                  value={filterValues[0] || "1995-05-01"}
                  onChange={(e) => onChange([e.target.value])}
                />
              </MUIDataTableFilterControl>
            )}
          </MUIDataTable.Cell>

        </MUIDataTableColumn>

        <MUIDataTableColumn>
          {/*next columns ...*/}
        </MUIDataTableColumn>
      </MUIDataTable>
    );

  }
}

ReactDOM.render(<Example/>, document.getElementById("app-root"));
