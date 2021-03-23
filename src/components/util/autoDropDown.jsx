import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useRef } from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: "flex",
    // margin: theme.spacing(1),
    minWidth: 220,
  },
}));

function AutoDropDown(props) {
  const classes = useStyles();
  const refe = useRef();
  const {
    fieldName,
    name,
    multipleVal,
    dropDownValues,
    handleChange,
    currentVal,
    disable,
    onInputChange,
  } = props;

  return (
    <Autocomplete
      id="autocomplete dropDown"
      ref={refe}
      className={classes.formControl}
      multiple={multipleVal}
      disabled={disable}
      name={fieldName}
      options={dropDownValues}
      onChange={(event, value) => handleChange(event, value, refe)}
      value={currentVal}
      onInputChange={onInputChange}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          label={name}
          InputProps={{
            ...params.InputProps,
            type: "Search",
          }}
        />
      )}
    />
  );
}

export default AutoDropDown;
