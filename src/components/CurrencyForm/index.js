import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Typography,
  TextField,
  MenuItem,
  Box,
  Grid,
  Paper,
  IconButton,
  Button,
} from '@material-ui/core';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import Spinner from '../Spinner';

import { useSelector, useDispatch } from 'react-redux';
import Actions from '../../redux/actions';
import { useHistory } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
  paper: {
    borderTop: '6px solid ' + theme.palette.primary.main
  },
  title: {
    margin: '20px 0 40px'
  }
}));

const CurrencyForm = () => {
  const history = useHistory();
  const classes = useStyle();
  const dispatch = useDispatch();
  const { currency, convert } = useSelector(state => state);

  const [from, setFrom] = React.useState('USD');
  const [to, setTo] = React.useState('UZS');
  const [amount, setAmount] = React.useState(1);

  React.useEffect(() => {
    dispatch(Actions.getCurrencies.request())
  }, [dispatch]);


  const handleSwap = () => {
    const temp = to;
    setTo(from);
    setFrom(temp);
  };

  React.useEffect(() => {
    dispatch(Actions.convertCurrency.request({
      from,
      to,
      amount
    }));
    changeParams();
  },[from, to, dispatch]);

  const handleConvert = () => {
    dispatch(Actions.convertCurrency.request({
      from,
      to,
      amount
    }));
    changeParams();
  }

  const changeParams = () => {
    history.push({ search: `?tool=convert&from=${from}&to=${to}&amount=${amount}`});
  }

  const handleAmount = e => {
    const value = e.target.value;
    const isValid = /^[0-9\b]+$/.test(value);
    if(value !== '0' && (value === '' || isValid)){
      setAmount(value);
    }
  }

  return (
    <div>      
      <Typography className={classes.title} align="center" component="h1" variant="h4">Currency Converter</Typography>
      <Grid container justify="center" spacing={0}>
        <Grid item xs={4}>
          <Paper className={classes.paper} elevation={2} square>
            <Box p={5} className={classes.box}>
              <Typography paragraph component="p" align="center" variant="subtitle2" color="textSecondary">Exchange Rate</Typography>
              {
                convert.isFetched && Object.keys(convert.result).length
                ? <Typography component="p" align="center" variant="h5">
                  <b>{convert.result.from.amount} </b>
                  {convert.result.from.code}
                  {' = '} 
                  <b>{convert.result.to.amount} </b> 
                  {convert.result.to.code}
                </Typography>
                : null
              }
              {
                convert.isFetched && !Object.keys(convert.result).length
                ?  <Typography component="p" align="center" variant="subtitle1">Enter some money to see the result</Typography>
                : null
              }
              {
                !convert.isFetched && <Spinner style={{display:'block',margin:'auto'}} />
              }
              <Box marginY={5}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      value={amount}
                      onChange={handleAmount}
                      fullWidth
                      id="amount"
                      label="Amount"
                      type="text"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item sm={5} xs={12}>
                    <TextField
                      value={from}
                      onChange={e => setFrom(e.target.value)}
                      select
                      fullWidth
                      id="amount"
                      label="From"
                      type="number"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {
                        currency.list.length ? currency.list.map(cr => {
                          return (
                            <MenuItem key={cr.code} value={cr.code}>
                              {cr.code}
                            </MenuItem>
                          )
                        })
                        : <MenuItem value={from}>
                            {from}
                          </MenuItem>
                      }
                    </TextField>
                  </Grid>
                  <Grid item xs={2}>
                      <IconButton onClick={handleSwap}>
                        <SyncAltIcon color="primary" aria-label="Swap button" />
                      </IconButton>
                  </Grid>
                  <Grid item sm={5} xs={12}>
                    <TextField
                      value={to}
                      onChange={e => setTo(e.target.value)}
                      select
                      fullWidth
                      id="amount"
                      label="To"
                      type="number"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {
                        currency.list.length ? currency.list.map(cr => {
                          return (
                            <MenuItem key={cr.code} value={cr.code}>
                              {cr.code}
                            </MenuItem>
                          )
                        })
                        : <MenuItem value={to}>
                            {to}
                          </MenuItem>
                      }
                    </TextField>
                  </Grid>
                </Grid>
              </Box>
              <Button 
                variant="contained" 
                color="primary" 
                disableElevation 
                size="large" 
                fullWidth
                disabled={!convert.isFetched}
                onClick={handleConvert}
              >{
                convert.isFetched ? 'Convert' : 'Converting...'
              }</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}


export default CurrencyForm;