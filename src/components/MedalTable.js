import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { medalsActions } from '../actions';
import _ from 'lodash';

class MedalTable extends Component {

  constructor(props) {
    super(props);
    
    this.onClickFilter = this.onClickFilter.bind(this);
  }

  componentWillMount() {
    this.props.fetchMedals();
  }

  onClickFilter(type) {
    this.props.sortMedals(type);
  }

  renderCountry(country, index) {
    return (
      <tr key={index}>
        <td className="rank">{index + 1}</td>
        <td className="flag"><img src={'./img/flags/24/' + country.iso['alpha-2'] + '.png'} /></td>
        <td className="country"><span>{country.iso.name}</span></td>
        { this.props.sortKey === '' ? <td className="total">{country.total}</td> : _.noop()}
        { this.props.sortKey === '' || this.props.sortKey === 'gold' ? <td className="gold">{country.gold}</td> : _.noop()}
        { this.props.sortKey === '' || this.props.sortKey === 'silver' ? <td className="silver">{country.silver}</td> : _.noop()}
        { this.props.sortKey === '' || this.props.sortKey === 'bronze' ? <td className="bronze">{country.bronze}</td> : _.noop()}
      </tr>
    );
  }

  render() {
    if (!this.props.list)
      return (
        <div className="loading">Loading...</div>
      );
      
    return (      
      <div>
        <table className="table table-striped" id="medals-table"> 
          <thead> 
            <tr> 
              <th className="rank">#</th> 
              <th className="flag"></th> 
              <th className="country">Country</th> 

              { this.props.sortKey === '' ?
                <th className="total">Total</th>
              : _.noop()}

              { this.props.sortKey === '' || this.props.sortKey === 'gold' ?
                <th className="gold">Gold 
                  { this.props.sortKey === 'gold' ? 
                  <a onClick={() => this.onClickFilter('')}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
                  : <a onClick={() => this.onClickFilter('gold')}><span className="glyphicon glyphicon-filter" aria-hidden="true"></span></a>
                  }
                </th> 
              : _.noop()}

              { this.props.sortKey === '' || this.props.sortKey === 'silver' ?
                <th className="silver">Silver 
                  { this.props.sortKey === 'silver' ? 
                  <a onClick={() => this.onClickFilter('')}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
                  : <a onClick={() => this.onClickFilter('silver')}><span className="glyphicon glyphicon-filter" aria-hidden="true"></span></a>
                  }
                </th> 
              : _.noop()}

              { this.props.sortKey === '' || this.props.sortKey === 'bronze' ?
                <th className="bronze">Bronze 
                  { this.props.sortKey === 'bronze' ? 
                  <a onClick={() => this.onClickFilter('')}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
                  : <a onClick={() => this.onClickFilter('bronze')}><span className="glyphicon glyphicon-filter" aria-hidden="true"></span></a>
                  }
                </th> 
              : _.noop()}

            </tr>
          </thead> 
          <tbody> 
            {this.props.list.map(function(country, i) {
              return this.renderCountry(country, i);
            }.bind(this))}
          </tbody> 
        </table>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    list: state.medals.list,
    sortKey: state.medals.sortKey
  };
}

export default connect(mapStateToProps, medalsActions)(MedalTable);

