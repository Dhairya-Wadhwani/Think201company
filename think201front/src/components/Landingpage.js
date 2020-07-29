import React from 'react'
import Button from '@material-ui/core/Button'


export default function Landingpage(props)
{
    function addStudent(){
      props.history.replace({pathname:'/form'})
    
    }
      return(
          <center>
             <Button color="secondary" variant="contained" style={{marginTop:'10%'}} onClick={addStudent}>Add Student</Button>
            
           
            </center>
      )
}