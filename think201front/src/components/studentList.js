import React,{useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import { makeStyles, withStyles} from '@material-ui/core';
import {getData,BaseUrl,postData} from './FetchServices'
import InputBase from '@material-ui/core/InputBase';


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

      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "#A8A8A8",
        '&:hover': {
          backgroundColor: "#f1f1f1",
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
    maincontainer:{
      justifyContent:'center',alignItems:'center',display:'flex',marginTop:'5%'
    },
    
}))
 export default function Studentlist (props){
     const classes=useStyles()
   

   const [search,setsearch]=React.useState(' ')

   const goBack=()=>{
    props.history.replace({pathname:'/form'})
  }

   const handlesearch=async(ete)=>{
      
    props.history.replace({pathname:'/search',searchvalue:search})
   }

     const[getList,setList]=React.useState({list:[]})
    const readAllRecords=async()=>{
      var list=await getData('student/studentlist')
       await setList({list});
  }

  const studentdetails=async(sno)=>{
    
   const body={sno:sno}
   var detail=await postData('student/studentdetail',body)
  
  props.history.replace({pathname:'/studentprofile',details:detail,})
  }


  

useEffect(()=>{
        readAllRecords()
    },[])
 return(
     <div >
        <i class="fa fa-arrow-left fa-2x" onClick={goBack} aria-hidden="true"></i>
       <div className={classes.maincontainer}>
       <div className={classes.search}>
            <div className={classes.searchIcon}>
              <i class="fa fa-search" aria-hidden="true"></i>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={(ete)=>setsearch(ete.currentTarget.value)}
              onKeyPress={(ete) => ete.key === 'Enter' ? handlesearch(ete) : null}
              inputProps={{ 'aria-label': 'search' }}
              fullWidth
            />
          </div>
          </div>
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
