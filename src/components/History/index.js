import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Actions from '../../redux/actions';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Container,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutline'

const useStyle = makeStyles(() => ({
  wrapper: {
    padding: '50px 0'
  },
  title: {
    marginBottom: '20px'
  },
  paper: {
    maxWidth: 700,
    margin: 'auto'
  }
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const HistoryPage = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.history);

  return (
    <div className={classes.wrapper}>
      <Container>
        <Typography className={classes.title} color='textSecondary' align='center' component='h2' variant='h4'>History</Typography>
        <TableContainer className={classes.paper} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>№</StyledTableCell>
                <StyledTableCell>From</StyledTableCell>
                <StyledTableCell>To</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Remove</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.length ? list.map((row,index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {index+1}
                  </TableCell>
                  <TableCell><b>{row.from.amount}</b> {row.from.code}</TableCell>
                  <TableCell><b>{row.to.amount}</b> {row.to.code}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => dispatch(Actions.removeHistory.request(index))} color="secondary">
                      <DeleteIcon></DeleteIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
              : (
                  <TableRow>
                    <TableCell>No data</TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  )
}

export default HistoryPage;