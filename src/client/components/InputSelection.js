import React, { Component } from "react";
import PropTypes from "prop-types";
import { Box, Button, Radio, TextField, Tooltip, Typography } from "@material-ui/core";
import withStyles from "@material-ui/styles/withStyles";

const styles = (theme) => ({
  inputFile: { margin: 5 }
});

class InputSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type ? props.type : "url",
      target: { url: undefined, string: undefined, file: undefined }
    };

    if (props.type && props.data) {
      this.state.target[props.type] = props.data;
    }
  }

  getType = (e) => {
    const idAttrib = e.attributes.id;
    if (idAttrib) {
      const val = idAttrib.value;
      return val === "input-file" ? "file" : val;
    }
    return undefined;
  };

  onInputFocus = (e) => {
    const newType = this.getType(e.target);
    if (newType) {
      const newState = Object.assign({}, this.state);
      newState.type = newType;
      this.setState({ type: newType });
      this.onInputChanged(newState);
    }
  };

  onChangeData = (e) => {
    const newType = this.getType(e.target);
    if (newType) {
      const newState = Object.assign({}, this.state);
      newState.type = newType;
      if (newType === "file") {
        newState.target[newState.type] = e.target.files && e.target.files.length ? e.target.files[0] : undefined;
      } else {
        newState.target[newState.type] = e.target.value;
      }
      this.setState(newState);
      this.onInputChanged(newState);
    }
  };

  onChangeType = (e) => {
    const newType = this.getType(e.target);
    if (newType) {
      const newState = Object.assign({}, this.state);
      newState.type = newType;
      this.setState(newState);
      this.onInputChanged(newState);
    }
  };

  onInputChanged = (newState) => {
    const { onInputTypeChanged } = this.props;
    const { type, target } = newState || this.state;
    if (onInputTypeChanged) {
      onInputTypeChanged(type, target[type]);
    }
  };

  render() {
    const { classes } = this.props;
    const { type, target } = this.state;
    return (
      <Box>
        <Tooltip title="Enter the input text manually" placement="right">
          <Box display="flex">
            <Radio name="inputType" value="text" id="text" checked={type === "text"} onChange={this.onChangeType} />
            <TextField
              fullWidth
              multiline
              margin="normal"
              variant="outlined"
              rows="10"
              placeholder="Enter string content"
              label="String content"
              id="text"
              onFocus={this.onInputFocus}
              onChange={this.onChangeData}
            />
          </Box>
        </Tooltip>
        <Tooltip title="Enter the URL of the text file" placement="right">
          <Box display="flex">
            <Radio name="inputType" value="url" id="url" checked={type === "url"} onChange={this.onChangeType} />
            <TextField fullWidth margin="normal" variant="outlined" placeholder="Enter URL" defaultValue={target.url} id="url" label="URL" onFocus={this.onInputFocus} onChange={this.onChangeData} />
          </Box>
        </Tooltip>
        <Tooltip title="Upload the text file from the computer" placement="right">
          <Box display="flex">
            <Radio name="inputType" value="url" id="file" checked={type === "file"} onChange={this.onChangeType} />
            <span>
              <input accept="text/plain" className={classes.input} style={{ display: "none" }} id="input-file" type="file" onChange={this.onChangeData} />
              <label htmlFor="input-file">
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
            </span>
            <Typography id="file" className={classes.inputFile} onClick={this.onInputFocus}>
              {target.file && target.file.name}
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    );
  }
}

InputSelection.propTypes = {
  onInputTypeChanged: PropTypes.func.isRequired
};

export default withStyles(styles)(InputSelection);
