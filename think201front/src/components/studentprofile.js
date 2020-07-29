import React from 'react'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import {Typography} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import {BaseUrl} from './FetchServices'




const useStyles = makeStyles(theme=>({
   

      bigAvatar: {
        margin: 10,
        width: 100,
        height: 100,
      },
    root:{
        justifyContent:'center',display:"flex",alignItems:'center'
    },
    papercontainer:{
        marginTop:'5%',backgroundColor:"#A9A9A9",width:'30%',borderRadius:10
    },
    
}))



function Studentprofile(props){
   const classes=useStyles();

   const goBack=()=>{
    props.history.replace({pathname:'/Studentlist'})
  }

   const updateprofile=()=>{
    props.history.replace({pathname:'/update',details:props.history.location.details})
   }

   
   const displayAllRecords=()=>{
    return props.history.location.details.map((item,index)=>{
        return( 
            
            
            <div className={classes.root}>
            <Paper className={classes.papercontainer}>
            
            <Avatar alt="Image" src={`${BaseUrl}/images/${item.image}`} className={classes.bigAvatar} style={{marginLeft:'auto',marginRight:'auto',marginTop:'10%'}}/>
          
            <Typography style={{marginLeft:'20%',marginTop:'10%'}}>Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.name} </Typography>
            <Typography  style={{marginLeft:'20%',marginTop:'5%'}}>Email:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.email}</Typography>
            <Typography  style={{marginLeft:'20%',marginTop:'5%'}}>Mobile:   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.phone}</Typography>
            <Typography  style={{marginLeft:'20%',marginTop:'5%'}}>Degree:    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.degree}</Typography>
            <Button color="primary" variant="contained" onClick={updateprofile}  style={{marginLeft:'35%',marginTop:'15%',marginBottom:'10%'}} >Edit Profile</Button>
          
       
       </Paper>
       </div>
       
        )
    })
    
}
    

    return(
        <div>
             <i class="fa fa-arrow-left fa-2x" onClick={goBack} aria-hidden="true"></i>
    
       {displayAllRecords()}
  
       </div>
    )
}
export default Studentprofile;