import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {Container,Typography} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import {postDataAndImage} from './FetchServices'




const useStyles = makeStyles(theme=>({
    paper: {
       padding: '30px',
       marginTop: '30px',
       justifyContent:'center',
       alignItems:'center'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
      dense: {
        marginTop: theme.spacing(2),
      },

      button: {
       marginTop:'25%'
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



function Form(props){
    const classes=useStyles();
    const [name,setname]=React.useState('');
    const [email,setemail]=React.useState('');
    const [photo,setphoto]=React.useState({icon:'',file:''});
    const [phone,setphone]=React.useState(' ');
    const [degree,setdegree]=React.useState(' ');
    const[message,setMessage]=React.useState('')

    const goBack=()=>{
      props.history.replace({pathname:'/home'})
    }


  const studentList=()=>{
    props.history.replace({pathname:'/Studentlist'})
  }


    const addNewRecord=async()=>{
      let formData = new FormData()
      formData.append('name',name)
      formData.append('email',email)
      formData.append('phone',phone)
      formData.append('photo',photo.file)
      formData.append('degree',degree)
      const config={headers:{'content-type':'multipart/form-data'}}
      const result=await postDataAndImage('student/studentdata',formData,config)
    
      if(result)
      {
        setMessage("Record submitted..")
        setemail('')
        setname('')
        setphoto('')
        setphone(' ')
        setdegree(' ')
      }
      else
      {
        setMessage("Submission Failed..")
      }
    }

    

    return(
      <div>
      <i class="fa fa-arrow-left fa-2x" onClick={goBack} aria-hidden="true"></i>
    <Container maxWidth="xs" >
        <Paper className={classes.paper}>
        <Typography style={{textAlign:'center',fontWeight:'bold'}}>Student Details</Typography>
        <Grid container>
            <Grid item xs={12}>
            <TextField
        id="outlined-dense"
        label="Name"
        required
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
        id="outlined-dense"
        label="Email"
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
        required
        value={email}
        variant="outlined"
        onChange={(event)=>setemail(event.target.value)}
        fullWidth
      />
     </Grid>

     <Grid item xs={12}>
     <TextField
        id="outlined-dense"
        label="Mobile"
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
        required
        value={phone}
        variant="outlined"
        onChange={(event)=>setphone(event.target.value)}
        fullWidth
      />
       
     </Grid>

     <Grid item xs={12} sm={6}>
     <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(event)=>setphoto({icon:URL.createObjectURL(event.target.files[0]),file:event.target.files[0]})}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes.button}>
          Picture
         
        </Button>
      </label>
     </Grid>
      <Grid item xs={12} sm={6}>
      <Avatar alt="Image" src={photo.icon} className={classes.bigAvatar} />
      </Grid>
      <Grid item xs={12}>
            <TextField
        id="outlined-dense"
        label="Degree"
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
        value={degree}
        required
        variant="outlined"
        onChange={(event)=>setdegree(event.target.value)}
        fullWidth
      />
     </Grid>
     <Grid item xs={12}>
     <Button onClick={addNewRecord} variant="contained" color="primary" style={{marginTop:'10%'}} fullWidth>
        Submit
      </Button>

     </Grid>
     </Grid>
        </Paper>

        <Typography>{message}</Typography>

        <Button color="secondary" variant="contained" style={{width:'100%',marginTop:'20%'}} onClick={studentList}>Show Student</Button>
    </Container>
 
</div>
    )
}
export default Form;