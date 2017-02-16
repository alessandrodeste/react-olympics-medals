import _ from 'lodash';
import {  
  FETCH_MEDALS,
  FETCH_ISO,
  SORT_MEDALS
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {    
    case FETCH_MEDALS:
      const medals = sortCountryList(medalsByCountry(action.payload));
      return { ...state, 
        medalsList: medals, 
        list: mergeIso(medals, state.isoList),
        eventList: _.uniq(_.map(action.payload, 'event')),
        sortKey: ''
       };
    case FETCH_ISO:
      return { ...state, isoList: action.payload, list: mergeIso(state.medalsList, action.payload) };
    case SORT_MEDALS:
      return { ...state, 
        sortKey: action.payload, 
        list: action.payload === '' ?  sortCountryList(state.list) : sortCountryListBy(state.list, action.payload)
      };
  }

  return state;
}

//
// Helpers
//

// if all data are loaded merge the tables, otherwise return empty value
const mergeIso = (medalsList, isoList) => {
  if (isoList != undefined 
    && isoList.length > 0 
    && medalsList != undefined 
    && medalsList.length > 0)
    return _.map(medalsList, (medal) => {
      // fix country code with ISO alpha 3
      if (medal.country in fixISOMap) medal.country = fixISOMap[medal.country];
      // return the merged object
      return _.assign({}, medal, { iso: _.find(isoList, (iso) => iso['alpha-3'] === medal.country ) }) 
    });
  return undefined;
};

// Brute force fix to handle differences with ISO alpha 3
const fixISOMap = {
  'TRI': 'TTO',
  'NGR': 'NER',
  'BAH': 'BHS',
  'SUD': 'SDN',
  'SLO': 'SVN',
  'LAT': 'LVA',
  'GER': 'DEU',
  'RSA': 'SRB',
  'BAH': 'BHS',
  'POR': 'PRT',
  'CRO': 'HRV',
  'GRE': 'GRC'  
}

const medalsByCountry = athletes => _.map(_.groupBy(athletes, 'country'), (val, key) => {
  const howMany = (list, type) => _.filter(list, item => item.medal.toLowerCase() === type)
  return {
    'country': key,
    'athletes': val,
    'gold': howMany(val, 'gold').length,
    'silver': howMany(val, 'silver').length,
    'bronze': howMany(val, 'bronze').length,
    'total': val.length
  }
});

const sortCountryList = (list) => _.orderBy(list, ['total', 'gold', 'silver', 'bronze'], ['desc', 'desc', 'desc', 'desc']);
const sortCountryListBy = (list, criteria) => _.orderBy(list, [criteria], ['desc']);