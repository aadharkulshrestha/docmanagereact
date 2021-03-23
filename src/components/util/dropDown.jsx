import React from "react";
import {
  makeStyles,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Input,
} from "@material-ui/core";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: "flex",
    // margin: theme.spacing(1),
    minWidth: 220,
    // maxWidth: 300,
  },
}));

function DropDown(props) {
  const classes = useStyles();

  const {
    fieldName,
    name,
    multipleVal,
    dropDownValues,
    handleBlur,
    handleChange,
    currentVal,
    disable,
  } = props;

  return (
    <FormControl className={classes.formControl}>
      {name === null ? null : (
        <InputLabel id="checkbox-label">{name}</InputLabel>
      )}
      <Select
        style={{ width: "100%", marginBottom: "30px" }}
        variant="outlined"
        name={fieldName}
        labelId="checkbox-label"
        id="mutiple-checkbox"
        multiple={multipleVal}
        value={currentVal}
        input={<Input />}
        onChange={handleChange}
        onBlur={handleBlur}
        MenuProps={MenuProps}
        disabled={disable}
      >
        <MenuItem value="">-----</MenuItem>
        {dropDownValues.map((val) => (
          <MenuItem key={val} value={val}>
            {val}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default DropDown;
