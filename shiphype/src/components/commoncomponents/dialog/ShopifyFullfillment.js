import React, { useState, useEffect } from "react";
import { fade, withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import PropTypes from "prop-types";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Platform, View, Image, Text } from "react-native";
import ProgressBar from "../feedback/ProgressBar";
import popUpStyle from "../style/popUpStyle";
import * as shiphypeservice from "../ShipService/shiphype_service";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(0),
  },

  root: {
    flexGrow: 1,
  },
  form: {
    marginLeft: theme.spacing(0),
  },

  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: "-2px",
    color: theme.palette.grey[500],
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  ImagesDesignEbay: {
    width: "115px",
    height: "115px",
    marginTop: "5%",
    marginLeft: "35%",
    justifyContent: "center",
  },
}));

const styles = (theme) => ({
  root: {
    "@media print": {
      margin: 0,
      padding: theme.spacing(1),
      borderRadius: 0,
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: "-2px",
    color: theme.palette.grey[500],
  },
});
//Make custom button
const ColorButton = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "100%",
    width: "380px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#0168fa",
    "&:hover": {
      backgroundColor: "#002080",
    },
  },
}))(Button);
const ColorButton2 = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "100%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#0168fa",
    "&:hover": {
      backgroundColor: "#002080",
    },
  },
}))(Button);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, isSucess, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {onClose ? (
        <Grid container item xs={12} justify="flex-end">
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={props.onClose}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      ) : null}
      {isSucess === true ? (
        <Grid item xs={12} justify="center">
          <Typography
            justify="center"
            variant="body1"
            style={{
              fontSize: "14px",
              fontWeight: "700",
              marginTop: "15px",
              textAlign: "center",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            }}
          >
            Fulfillment Success
          </Typography>
        </Grid>
      ) : (
        <Grid item xs={12} justify="center">
          <Typography
            justify="center"
            variant="body1"
            style={{
              fontSize: "14px",
              fontWeight: "700",
              marginTop: "15px",
              textAlign: "center",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            }}
          >
            Shopify Integration
          </Typography>
        </Grid>
      )}
    </MuiDialogTitle>
  );
});

/**
 * Description:This function is used for InvitePeople for str8line popup
 * @param {*} props
 */

export default function DeleteCard(props) {
  // const [open]= props;
  const classes = useStyles();
  const { userid, shopifycode, fullfillmentOpen } = props;
  const [loading, setLoading] = useState(false);
  const [isSucess, setIsSucess] = useState(false);

  const handleClose = () => {
    props.handleClose1();
  };

  const AddFullfillment = () => {
    const fulfillment_service = {
      name: "ShipHypeFulfillment",
    };
    shiphypeservice
      .shopifyfullfilmentAdd(
        shopifycode,
        window.sessionStorage.getItem("storename"),
        userid,
        fulfillment_service
      )
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);

          setIsSucess(true);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <Dialog
        maxWidth="xs"
        fullWidth={true}
        open={fullfillmentOpen}
        onClose={handleClose}
      >
        <Grid item xs={12}>
          <DialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
            isSucess={isSucess}
            style={{
              width: "96%",
              margin: "auto",
              paddingBottom: "0px",
              paddingTop: "0px",
            }}
          ></DialogTitle>
        </Grid>
        <DialogContent style={popUpStyle.sizeOfBody}>
          <Grid justify="center">
            <ProgressBar loading={loading} />
          </Grid>

          <form className={classes.form}>
            {isSucess === true ? (
              <Grid container spacing={1} justify="center" direction="column">
                <Grid
                  item
                  xs={10}
                  style={{ justifyContent: "center", padding: "0" }}
                >
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "15px",
                      marginTop: "5px",

                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    Store : {window.sessionStorage.getItem("storename")}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "12px",
                      marginTop: "1px",

                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    Please be sure on Shopify store you have set every product's
                    fulfillment service to the new service.
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "12px",
                      marginTop: "5px",
                      fontWeight: "700",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    ShipHype will not be able to fulfill any orders for products
                    that have there fulfillment service set to anything else.
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={3} justify="center">
                  <ColorButton2
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={handleClose}
                  >
                    Next
                  </ColorButton2>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={1} justify="center" direction="column">
                <Grid
                  item
                  xs={10}
                  style={{ justifyContent: "center", padding: "0" }}
                >
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "15px",
                      marginTop: "5px",

                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    Store : {window.sessionStorage.getItem("storename")}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "12px",
                      marginTop: "5px",
                      fontWeight: "700",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    Heads up!
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "12px",
                      marginTop: "1px",

                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    Shopify has mandated that all stores be linked with
                    Fulfillment Services in Order to keep track of inventory and
                    order across locations.
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "12px",
                      marginTop: "5px",

                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    You have not created any Fulfillment Services on your Store.
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={3} justify="center">
                  <ColorButton
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      AddFullfillment();
                    }}
                  >
                    ShipHype create a Fulfillment Service for you
                  </ColorButton>
                </Grid>
              </Grid>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </View>
  );
}

DeleteCard.propTypes = {
  fullfillmentOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};
