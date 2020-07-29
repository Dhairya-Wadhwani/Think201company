import React, { useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {Typography,Container} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import {postDataAndImage,BaseUrl,postData} from './FetchServices'
import Badge from '@material-ui/core/Badge';




  



const useStyles = makeStyles(theme=>({
   
    paper: {
        padding: '30px',
        marginTop: '30px',
        justifyContent:'center',
        alignItems:'center'
     },
     root: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
        },
      },
     textField: {
         marginLeft: theme.spacing(1),
         marginRight: theme.spacing(1),
       },
       dense: {
         marginTop: theme.spacing(2),
       },
 
       button: {
        marginTop:'10%'
        
       },
 
       input: {
         display: 'none',
       },
       rightIcon: {
         marginLeft: theme.spacing(1),
       },
 
       bigAvatar: {
         margin: 10,
         width: 100,
         height: 100,
       },
     
    
    
}))





function Update(props){
   const classes=useStyles();

   const [name,setname]=React.useState('');
    const [email,setemail]=React.useState('');
    const [photo,setphoto]=React.useState({icon:'',file:''});
    const [phone,setphone]=React.useState('');
    const [degree,setdegree]=React.useState('');
    const[message,setMessage]=React.useState('')

    
    
 const updateimage=async(sno)=>{
    let formData = new FormData()
    formData.append('sno',sno)
    
    formData.append('photo',photo.file)
  
    const config={headers:{'content-type':'multipart/form-data'}}
    const result=await postDataAndImage('student/updateimage',formData,config)
    if(result)
    {
      props.history.replace({pathname:'/Studentlist'})
    }
    else
    {
        setMessage("Updation Failed")
    }
 }
        
 
    

    const addNewRecord=async(sno)=>{

     
  
            const body={sno:sno,name:name,email:email,phone:phone,degree:degree}
              const result=await postData('student/updatedata',body)
            
              if(result)
              {
                props.history.replace({pathname:'/Studentlist'})
                setemail(' ')
                setname(' ')
                setphoto(' ')
                setphone(' ')
                setdegree(' ')
              }
              else
              {
                setMessage("Updation Failed")
              }
    
    }

useEffect(()=>{
    setname(props.history.location.details[0].name)
    setemail(props.history.location.details[0].email)
    setphone(props.history.location.details[0].phone)
    setdegree(props.history.location.details[0].degree)
},[props])
  

   const displayAllRecords=()=>{
    return props.history.location.details.map((item,index)=>{
        
      
        return( 
            <Container maxWidth="xs" >
        <Paper className={classes.paper}>
        <Typography style={{textAlign:'center',fontWeight:'bold'}}>Student Details</Typography>
        <Grid container>
        <Grid item xs={12} style={{justifyContent:'center',alignItems:'center',display:'flex'}}>
    
        <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={
           
      
             <div>
             <input
             accept="image/*"
             className={classes.input}
             id="contained-button-file"
             multiple
             type="file"
             onChange={(event)=>setphoto({icon:URL.createObjectURL(event.target.files[0]),file:event.target.files[0]})}
           />
           <label htmlFor="contained-button-file"> <i class="fa fa-camera fa-2x" aria-hidden="true" ></i>   </label>
           </div>
        
       }
      >
        <Avatar alt="Travis Howard" src={photo.icon?photo.icon:`${BaseUrl}/images/${item.image}`} className={classes.bigAvatar}/>
      </Badge>
      </Grid>
            <Grid item xs={12}>
            <TextField
        id="studentname"
        label="Name"
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
        value={name}
        variant="outlined"
        onChange={(event)=>setname(event.target.value)}
        fullWidth
      />
     </Grid>

     <Grid item xs={12}>
            <TextField
        id="studentemail"
        label="Email"
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
        value={email}
        
        variant="outlined"
        onChange={(event)=>setemail(event.target.value)}
        fullWidth
      />
     </Grid>

     <Grid item xs={12}>
            <TextField
        id="studentmobile"
        label="Mobile"
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
        value={phone}
        variant="outlined"
        onChange={(event)=>setphone(event.target.value)}
        fullWidth
      />
     </Grid>

    
     
      <Grid item xs={12}>
            <TextField
        id="studentdegree"
        label="Degree"
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
        value={degree}
        variant="outlined"
        onChange={(event)=>setdegree(event.target.value)}
        fullWidth
      />
     </Grid>
     <Grid item xs={12} sm={6}>
     <Button onClick={event=>addNewRecord(item.sno)} variant="contained" color="primary" style={{marginTop:'10%'}} >
        Update Details
      </Button>

     </Grid>
     <Grid item xs={12} sm={6} >
    
      
        <Button variant="contained" component="span" className={classes.button} onClick={event=>updateimage(item.sno)}>
          Update Picture
         
        </Button>
       
     </Grid>
     </Grid>
        </Paper>
       
        <Typography>{message}</Typography>
    </Container>
            
            
          
    
       
        )
    })
    
}
    

    return(
        <div>
       {displayAllRecords()}
    
       </div>
    )
}
export default Update;
