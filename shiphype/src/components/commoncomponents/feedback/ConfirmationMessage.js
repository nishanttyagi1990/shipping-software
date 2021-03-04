import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles} from '@material-ui/core/styles';
import {Platform,View,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import PropTypes from "prop-types";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import StepConnector from '@material-ui/core/StepConnector';

import ProgressBar from './ProgressBar';
import * as shiphypeservice from '.././ShipService/shiphype_service';
/**For Style */
import popUpStyle from '.././style/popUpStyle';


const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-52% + 16px)',
    right: 'calc(48% + 16px)',
  },
  line: {
    borderColor: '#3f51b5',
    borderTopWidth: 2,
    borderRadius: 1,
  },
})(StepConnector);


const useStyles = makeStyles(theme => ({
    submit: {
      margin: theme.spacing(0, 0, 0),
      borderRadius : 0,
},
textArea:{
  marginTop: theme.spacing(0),
  borderRadius : 0,
},
profileMargin: {
  marginTop: theme.spacing(2),
  borderRadius : 0,
},
paper: {
  border: '2px solid #ced4da',
  height: 100,
  width: 100,
},
root: {
  //flexGrow: 1,
  width: '100%',
},
profileMargin10: {
    marginTop: theme.spacing(2),
    border : '1px solid #cccccc',
    padding:'2%',
  },
  profileMargin1: {
   
    // border : '1px solid #cccccc',
   //  padding:'1%',
   marginLeft:'8px',
 
   },
   button2 :{
    //border : ' 1px solid #cccccc',
  //  borderRadius : '5px',
    paddingTop: '1%',
    paddingBottom: '1%',
    paddingLeft: '0%',
    paddingRight: '0%',
    textTransform: 'none',
    color:'#0158d4',
  },
  buttonGreen :{
    paddingTop: '1%',
    paddingBottom: '1%',
    paddingLeft: '0%',
    paddingRight: '0%',
    textTransform: 'none',
    color:'#00b300',
  },
  checkBoxColor:{
    color:'#0158d4',
  },
// grid: {
//   width: 100,
//   height: 100,
// },

}));

const warehouses = [
  {
    value: 'w1',
    label: 'Created',
  },
  {
    value: 'w2',
    label: 'Onhold',
  },
  {
    value: 'w3',
    label: 'Processing',
  },
  {
    value: 'w4',
    label: 'Cancled',
  },
  {
    value: 'w5',
    label: 'Done',
  },
];


/****   For changing the textfield radius  : End *********/
const styles = (theme) => ({
  root: {
    '@media print': {
    margin: 0,
    padding: theme.spacing(1),
    borderRadius:0
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: '-2px',
    color: theme.palette.grey[500],
  },
 
});
//Make custom button
const ColorButton = withStyles(theme => ({
    root: {
      color: '#fff',
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height:'70%',
      width:'180px',
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       backgroundColor:'#0168fa',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
    },
  }))(Button);
  //Make custom button
const ColorButton1 = withStyles(theme => ({
    root: {
      color: '#fff',
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height:'70%',
      width:'30px',
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       backgroundColor:'#0168fa',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
    },
  }))(Button);


  const DialogTitle = withStyles(styles)(props => {
    
    const { children, classes,onClose,onChangeValue,warehouse,warehouses, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        {onClose ? (
            <Grid container item xs={10} justify="flex-end">
          <IconButton aria-label="close" className={classes.closeButton} onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
          </Grid>
        ) : null}
        <Grid item xs={6} justify="flex-start">
        <Typography justify="center" variant="body1"style={{fontSize: '16px',
            fontWeight: '700',
            marginTop:'20px',
            marginBottom:'20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Confirmation Message
            </Typography>
            </Grid>

      </MuiDialogTitle>
    );
  });

  /**
   * Description:To do show step of task
   */
  function getSteps() {
    return ['Marketplace Integration', 'Shipping Profile', 'Return Settings','Import Products','Import Customers'];
  }


/**
 * Description:This function is used for Select warehouse
 * @param {*} props 
 */
export default function ShippingProfile(props) {
   const classes = useStyles();
  
   const {openDeleteCard}= props;
   const enableTrue=props.enableTrue;
   const [loading,setLoading]=React.useState(false);
   const [open, setOpen]=React.useState(false);
   const [msg,setMsg]=React.useState('');
   const [type,setType]=React.useState('');
   const [status,setStatus]=React.useState(false);
   const userid=props.userid;
   const integrationId=props.integrationId;
   const [fetchid,setFetchid]=React.useState('');
   const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
    ppt:false,
    doc:false,
  });

  React.useEffect(()=>{
    FetchIntegration();
  },[]);
  const removeIntegration =()=>{
    setLoading(true);
   
    shiphypeservice.removeIntegration(userid,integrationId)
          .then(response => {
           console.log("status",response.status);
                if(response.status === true) {
                    setOpen(true);
                    setType('success');
                    setMsg(response.message);
                    setStatus(response.status);
                    setLoading(false);
                    if(integrationId === 4){
                      removeIntegration2(fetchid);
                    }else{
                      props.ConframetionCheck();
                    }
                    
                           }else{
                            setOpen(true);
                            setType('error');
                   setMsg(response.message);
                   setStatus(response.status);
                   setLoading(false);
                   props.ConframetionCheck();
                            console.log("message",response.message);
                           }   
              }).catch((error) =>{
                    console.error(error);
              });
            }

            const removeIntegration2 =(fulfillmentserviceid)=>{
              setLoading(true);
             
              shiphypeservice.removeFullfillment(fulfillmentserviceid)
                    .then(response => {
                     console.log("status",response.status);
                          if(response.status === true) {
                              
                              props.ConframetionCheck();
                                     }else{
                                     
                             props.ConframetionCheck();
                                      console.log("message",response.message);
                                     }   
                        }).catch((error) =>{
                              console.error(error);
                        });
                      }
          
            
            const FetchIntegration =()=>{
             
             
              shiphypeservice.fetchShopifyFUllfillment(userid,4)
                    .then(response => {
                     console.log("status",response.status);
                          if(response.status === true) {
                            setFetchid(response.data.fulfillmentServiceId);
                                     }else{
                                     
                                     }   
                        }).catch((error) =>{
                              console.error(error);
                        });
                      }
            const handleClose = () => {
                setOpen(false);
              };
              const showToast =(open,msg,type)=>{ 
             
                return(
              <Toast
               open={open}
               handleClose={handleClose}
               type={type}
               msg={msg}
              />
             )
              }
  const handleChange = (event) => {
    removeIntegration();
   
  };

  const { gilad, jason, antoine,ppt,doc } = state;
 
            
  const handleClose1 = () => {
    props.handleDeleteCancle();
  };
           


    return (  
      <View>
      <Dialog 
        maxWidth="xs"
        fullWidth={true}
        className={classes.dialog} 
        onClose={()=>{handleClose1(false)}} 
        aria-labelledby="customized-dialog-title" 
        open={openDeleteCard}>
        <Grid item xs={12} >
       
        <DialogTitle id="customized-dialog-title" onClose={()=>{handleClose1(false)}}  style={{width:'96%',margin:'auto',paddingBottom:'0px',paddingTop:'0px'}} >
       
        </DialogTitle>
       </Grid>
       <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>
         <DialogContent style={popUpStyle.sizeOfBody}>
       
            <Grid container justify="space-between">
            <Grid item xs={12} md={6} lg={6}>
          
            </Grid>
        <Grid item xs={12} md={6} lg={6} container justify="flex-end">
        <Grid item xs={4}  md={6} lg={6}>
      
     </Grid></Grid></Grid>  
         <form className={classes.form}>
         <Grid container className={classes.root} spacing={1}>
         
        <Grid container justify="space-between">
       
        <Grid item xs={12} md={12} lg={12}>
        <Grid>
        <Typography justify="center" variant="body1">
        
        </Typography></Grid>
        <Grid  items xs={12} lg={12}>
        <Grid justify="center" // Add it here :)
      container>
      
       <Text style={{fontSize: '14px',
            fontWeight: '700',
            marginTop:'20px',
            marginBottom:'20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
       
      Are you sure you want to Remove this Integration?
       </Text>
       <Text style={{fontSize: '12px',
           // fontWeight: '700',
            marginTop:'20px',
            marginBottom:'20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
      
      </Text>
         
          </Grid>
      
        </Grid>
       
        </Grid>
      
        </Grid>
       
         </Grid>
           </form>
           </DialogContent>
           <DialogActions style={{margin:'auto'}}>
            <Grid  justify="flex-end"
            container 
            spacing={24} >
            
            <Grid item>
            <Grid container spacing={1} justify="center">
        <Grid item  justify="center">
        {/* <ColorButton1
          size='large'
          variant="contained"
          color='primary'
          className={classes.submit}
          onClick={props.handleDeleteCancle}
        >
      No
        </ColorButton1> */}
        </Grid>

        <Grid item  justify="center">
        <ColorButton
          size='large'
          variant="contained"
          color='primary'
          className={classes.submit}
          onClick=  {()=>{handleChange()}}
        >
     Yes
        </ColorButton>
        </Grid>
      </Grid>
    
       </Grid>
       </Grid>
       </DialogActions>
      </Dialog>
        </View>
    );
  }


  ShippingProfile.propTypes = {
    openDeleteCard: PropTypes.bool,
  //  handleNextPage: PropTypes.func,
  handleDeleteCancle: PropTypes.func
  };