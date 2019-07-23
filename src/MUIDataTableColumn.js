import React from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import {withStyles} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import Input from "@material-ui/core/Input/Input";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";

const defaultFilterListStyles = {
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    margin: "0px 16px 0px 16px",
  },
  chip: {
    margin: "8px 8px 0px 0px",
  },
};

class MUIDataTableCell extends React.Component {
  render() {
    const {classes, children} = this.props;

    return <span>{children}</span>;
  }
}

class MUIDataTableFilterValue extends React.Component {
  render() {
    const {classes, value, label, index, filterUpdate} = this.props;

    return <Chip
      label={label}
      key={index}
      onDelete={filterUpdate(index, value, "checkbox")}
      className={classes.chip}
    />;
  }
}

class MUIDataTableFilterControl extends React.Component {
  render() {
    const {classes, filterValues, onChange, column, index} = this.props;

    return (
      <FormControl className={classes.selectFormControl} key={index}>
        <InputLabel htmlFor={column.name}>{column.name}</InputLabel>
        <Select
          value={filterValues.toString() || textLabels.all}
          name={column.name}
          onChange={event => onChange(index, event.target.value)}
          input={<Input name={column.name} id={column.name}/>}>
          <MenuItem value={textLabels.all} key={0}>
            {textLabels.all}
          </MenuItem>
          {filterData[index].map((filterColumn, filterIndex) => (
            <MenuItem value={filterColumn} key={filterIndex + 1}>
              {filterColumn !== null ? filterColumn.toString() : ""}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

class MUIDataTableColumn extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    display: PropTypes.bool,
    filter: PropTypes.bool,
    sort: PropTypes.bool,
    download: PropTypes.bool,
    Head: PropTypes.element,
    Cell: PropTypes.element,
    FilterValue: PropTypes.element,
    FilterControl: PropTypes.element,
  };

  render() {
    const {
            classes,
            // Default values if no custom render function provided
            FilterValue   = (x) => <MUIDataTableFilterValue value={x} label={x.toString}/>,
            FilterControl = (filterValues, onChange) => <MUIDataTableFilterControl filterValues={filterValues} onChange={onChange}/>,
            Head          = (defaults) => <MUIDataTableHead  {...defaults}/>,
            Cell          = (x) => <MUIDataTableCell>{x}</MUIDataTableCell>,
          } = this.props;

    // not sure what the component would return as it is only a container
    return null;
  }
}

export default withStyles(defaultFilterListStyles, {name: "MUIDataTableColumn"})(MUIDataTableColumn);
