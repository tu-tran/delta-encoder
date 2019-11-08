import React, { Component } from "react";
import "../App.css";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/styles/withStyles";
import {
 Box, Grid, CssBaseline, LinearProgress, Paper, TextField, Typography, Container 
} from "@material-ui/core";
import InputSelection from "./InputSelection";
import services from "../services";

const backgroundShape = require("../static/images/db.svg");

const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    overflow: "hidden",
    paddingBottom: 100
  },
  footer: {
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 200px",
    width: "100%",
    position: "fixed",
    bottom: 0,
    zIndex: -100,
    height: "100%",
    opacity: 0.1
  },
  container: {
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  actionButton: {
    textTransform: "uppercase",
    margin: theme.spacing(1),
    width: 152
  },
  tagline: {
    display: "inline-block",
    marginLeft: 10,
    [theme.breakpoints.up("md")]: {
      paddingTop: "0.8em"
    }
  },
  alignRight: {
    display: "flex",
    justifyContent: "flex-end"
  },
  indicator: {
    marginBottom: theme.spacing(2)
  }
});

class Main extends Component {
  constructor() {
    super();
    this.state = {
      type: "url",
      data: "/5000-words.txt",
      output: undefined,
      error: undefined
    };
  }

  onInputTypeChanged = (type, data) => {
    this.setState({ type, data });
  };

  compress = (_) => {
    this.onAction(() => services.compress(this.state).then(r => this.showOutput(r)));
  };

  decompress = (_) => {
    this.onAction(() => services.decompress(this.state).then(r => this.showOutput(r)));
  };

  showOutput = (data) => {
    const limit = 500;
    const lines = data.split("\n");
    const trimmedOutput = lines.length > limit ? `${lines.slice(0, limit).join("\n")}\n...(${lines.length - limit} rows trimmed)` : data;
    this.setState({ output: trimmedOutput });
  };

  onAction = async (action) => {
    try {
      this.setState({ busy: true, error: undefined });
      await action();
    } catch (e) {
      const msg = e && e.message ? e.message : "Internal Error";
      this.setState({ error: msg });
    } finally {
      this.setState({ busy: false });
    }
  };

  validate = () => !!this.state.data;

  render() {
    const canSubmit = !this.validate();
    const { classes } = this.props;
    const {
      type, data, output, error, busy
    } = this.state;
    return (
      <React.Fragment>
        <div className={classes.root}>
          <CssBaseline />
          <div className={classes.content}>
            <Container className={classes.container}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography color="secondary" gutterBottom>
                      <Typography component="span" variant="h3" className={classes.tagline}>
                        Delta Encoder
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <InputSelection type={type} data={data} onInputTypeChanged={this.onInputTypeChanged} />
                    <Box className={classes.alignRight}>
                      <Button disabled={busy || canSubmit} variant="contained" className={classes.actionButton} color="primary" id="btnCompress" onClick={this.compress}>
                        Compress
                      </Button>
                      <Button disabled={busy || canSubmit} variant="contained" className={classes.actionButton} color="primary" id="btnDecompress" onClick={this.decompress}>
                        Decompress
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box display="flex">
                      <TextField
                        InputProps={{ readOnly: true }}
                        error={!!error}
                        helperText={error ? String(error) : undefined}
                        fullWidth
                        multiline
                        margin="normal"
                        variant="outlined"
                        rows="17"
                        placeholder="Result will go here! :)"
                        label="Output"
                        id="output"
                        value={output}
                        variant={output ? "filled" : "outlined"}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
              {busy && <LinearProgress className={classes.indicator} />}
            </Container>
          </div>
          <div className={classes.footer} />
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Main);
