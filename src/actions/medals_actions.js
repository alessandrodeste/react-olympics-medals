import axios from 'axios';
import {
  FETCH_MEDALS,
  FETCH_ISO,
  SORT_MEDALS
} from './types';

const URL_STANDARD_ISO = 'https://rawgit.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.json';
const URL_OLYMPICS_2008 = 'https://rawgit.com/KitmanLabs/interview_screeners/master/frontend/olympics_2008_medalists.json';

/**
 * Read all medals and merge with ISO standards names
 */
export function fetchMedals() {
  const request = axios.get(URL_OLYMPICS_2008);

  return (dispatch) => {
    request.then(response => {
      
      // Store the medals
      dispatch({
        type: FETCH_MEDALS,
        payload: response.data
      });

      // read all ISO standard to merge the data
      return _fetchISO();

    }).then(response => {
      dispatch({
        type: FETCH_ISO,
        payload: response.data
      });
    });
  }
}

/**
 * Retrieve all country ISO data
 */
export function _fetchISO() {  
  return axios.get(URL_STANDARD_ISO);
}

/**
 * Sort medals by criteria (empty string for default)
 */
export function sortMedals(criteria) {
  return (dispatch) => {
    dispatch({
      type: SORT_MEDALS,
      payload: criteria
    });
  }
}