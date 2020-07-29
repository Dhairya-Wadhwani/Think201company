import React,{useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import { makeStyles,withStyles } from '@material-ui/core';
import {BaseUrl,postData} from './FetchServices'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);







const useStyles=makeStyles((theme)=>({
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
      },
    
    
}))
 export default function Search (props){
     const classes=useStyles()
   

     const goBack=()=>{
      props.history.replace({pathname:'/Studentlist'})
    }

    

  const studentdetails=async(sno)=>{
    
   const body={sno:sno}
   var detail=await postData('student/studentdetail',body)
  props.history.replace({pathname:'/studentprofile',details:detail})
  }

  const [getList,setList]=React.useState({list:[]})

  const readAllRecords=async(searchvalue)=>{
    const body={"searchvalue":searchvalue}
    var list=await postData('student/searchdata',body)
     await setList({list});
}



  

useEffect(()=>{
    readAllRecords(props.history.location.searchvalue)
},[props])


 return(
   <div>
      <i class="fa fa-arrow-left fa-2x" onClick={goBack} aria-hidden="true"></i>
  
     <center >
     
    
     <TableContainer component={Paper} style={{width:'80%',marginTop:'5%'}}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Mobile</StyledTableCell>
            <StyledTableCell align="center">Degree</StyledTableCell>
            <StyledTableCell align="center">Image</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getList.list.map((row) => (
            <StyledTableRow key={row.name} onClick={event=>studentdetails(row.sno)}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.phone}</StyledTableCell>
              <StyledTableCell align="center">{row.degree}</StyledTableCell>
              <StyledTableCell align="center"> <Avatar alt="Image" src={`${BaseUrl}/images/${row.image}`} className={classes.bigAvatar} style={{marginLeft:'auto',marginRight:'auto'}} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
     </center>
     </div>
 )
 }

