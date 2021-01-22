import axios from 'axios';
import buildURL from 'build-url';
import config from '../../config';


axios.defaults.params = {};
// axios.defaults.params['_f'] = 'json';
// axios.defaults.params['Referer'] = 'localhost:3000';
axios.defaults.headers.common['Accept'] = 'application/json';
// axios.defaults.headers.common['X_CMC_PRO_API_KEY'] = config.API_KEY;
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


const queryBuilder = (url='',{from,to,amount}={}) => {
  
  const query = {};

  // if(config.API_KEY){
  //   query['api_key'] = config.API_KEY;
  // }

  if(from){
    query['from'] = from
  }
  if(to){
    query['to'] = to
  }
  if(amount){
    query['amount'] = amount
  }

  return buildURL({
    path: url,
    queryParams: query
  })
}

export default {
  request: axios.create({
    baseURL: config.API_ROOT
  }),
  queryBuilder
}