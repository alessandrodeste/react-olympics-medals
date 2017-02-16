import { expect } from '../test_helper';
import medalsReducer from '../../src/reducers/medals_reducer';
import { FETCH_ISO, FETCH_MEDALS, SORT_MEDALS } from '../../src/actions/types';

const isoData = [{"name":"Afghanistan","alpha-2":"AF","alpha-3":"KEN","country-code":"004","iso_3166-2":"ISO 3166-2:AF","region":"Asia","sub-region":"Southern Asia","region-code":"142","sub-region-code":"034"}];
const medals = [{
    "athlete": "KOGO, Micah",
    "country": "KEN",
    "sex": "Men",
    "event": "10000m",
    "medal": "Bronze"
  }];

const storeAfterFetchMedalsAndIso = {
        "eventList": [
          "10000m"
        ],
        "isoList": [
          {
            "alpha-2": "AF",
            "alpha-3": "KEN",
            "country-code": "004",
            "iso_3166-2": "ISO 3166-2:AF",
            "name": "Afghanistan",
            "region": "Asia",
            "region-code": "142",
            "sub-region": "Southern Asia",
            "sub-region-code": "034"
          }
        ],
        "list": [
          {
            "athletes": [
              {
                "athlete": "KOGO, Micah",
                "country": "KEN",
                "event": "10000m",
                "medal": "Bronze",
                "sex": "Men"
              }
            ],
            "bronze": 1,
            "country": "KEN",
            "gold": 0,
            "iso": {
              "alpha-2": "AF",
              "alpha-3": "KEN",
              "country-code": "004",
              "iso_3166-2": "ISO 3166-2:AF",
              "name": "Afghanistan",
              "region": "Asia",
              "region-code": "142",
              "sub-region": "Southern Asia",
              "sub-region-code": "034"
            },
            "silver": 0,
            "total": 1
          }
        ],
      "medalsList": [
          {
            "athletes": [
              {
                "athlete": "KOGO, Micah",
                "country": "KEN",
                "event": "10000m",
                "medal": "Bronze",
                "sex": "Men"
              }
            ],
            "bronze": 1,
            "country": "KEN",
            "gold": 0,
            "silver": 0,
            "total": 1
          }
        ],
       sortKey: ""
      };
const storeAfterFetchMedals = {
      list: undefined,
      "eventList": [
        "10000m"
      ],
      medalsList: [
        {"athletes": [
          {
            "athlete": "KOGO, Micah",
            "country": "KEN",
            "event": "10000m",
            "medal": "Bronze",
            "sex": "Men"
          }
        ],
        bronze: 1,
        country: "KEN",
        gold: 0,
        silver: 0,
        total: 1
      }],
      "sortKey": ""
    };

describe('Medals Reducer', () => {
  it('handles action with unknown type', () => {
    expect(medalsReducer(undefined, {})).to.eql({});
  });

  it('handles action of type FETCH_ISO with empty data', () => {
    const action = { type: FETCH_ISO, payload: [] };
    expect(medalsReducer({}, action)).to.eql({isoList: [], list: undefined});
  });

  it('handles action of type FETCH_ISO with data', () => {
    const action = { type: FETCH_ISO, payload: isoData };
    expect(medalsReducer({}, action)).to.eql({isoList: isoData, list: undefined});
  });

  it('handles action of type FETCH_MEDALS with empty data', () => {
    const action = { type: FETCH_MEDALS, payload: [] };
    expect(medalsReducer({}, action)).to.eql( {
        eventList: [],
        list: undefined,
        medalsList: [],
        sortKey: ""
       });
  });

  it('handles action of type FETCH_MEDALS with data', () => {
    const action = { type: FETCH_MEDALS, payload: medals };
    expect(medalsReducer({}, action)).to.eql(storeAfterFetchMedals)
  });

  it('handles action of type FETCH_ISO after FETCH_MEDALS and merge', () => {
    const action = { type: FETCH_ISO, payload: isoData };
    expect(medalsReducer(storeAfterFetchMedals, action)).to.eql( storeAfterFetchMedalsAndIso );
  });

  it('handles action of type FETCH_MEDALS after FETCH_ISO and merge', () => {
    const action = { type: FETCH_MEDALS, payload: medals };
    expect(medalsReducer({isoList: isoData, list: undefined}, action)).to.eql( storeAfterFetchMedalsAndIso );
  });
});
