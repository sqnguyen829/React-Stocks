import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state={
    stocks:[],
    myStocks:[],
    filter:null,
    sortBy:''
  }

  componentDidMount(){
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(data => this.setState({stocks:data}))
  }

  addStock = (stock) => {
    if(!this.state.myStocks.includes(stock)){
      this.setState({
        myStocks:[...this.state.myStocks, stock]
      })
    }
  }

  removeStock = (stock) => {
    this.setState({
      myStocks:this.state.myStocks.filter(s => s.id !== stock.id)
    })
  }

  handleSort = (sortValue) => {
    if(sortValue==='alphabetically'){
      this.setState({
        sortBy:sortValue
      })
    }else if(sortValue==='price'){
      this.setState({
        sortBy:sortValue
      })
    }
  }

  handleFilter = (filterType) => {
    this.setState({
      filter:filterType
    })
  }

  render() {
    let stocks = this.state.stocks
    let myStocks = this.state.myStocks
    if(this.state.filter){
      stocks = stocks.filter(stock=> stock.type === this.state.filter)
    }

    if(this.state.sortBy==='alphabetically'){
      stocks= stocks.sort((a,b) => a.name.localeCompare(b.name))
    }else if(this.state.sortBy==='price'){
      stocks= stocks.sort((a,b) => b.price - a.price)
    }
    
    return (
      <div>
        <SearchBar sortBy={this.state.sortBy} handleSort={this.handleSort} handleFilter={this.handleFilter}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={stocks} handleStock={this.addStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={myStocks} handleStock={this.removeStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
