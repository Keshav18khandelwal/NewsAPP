import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
        }

    HandleUpdate = async () => {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.state.pageSize}&category=${this.props.category}`;
        this.setState({loading:true})
        this.props.setProgress(40);
        let data = await fetch(url);
        this.props.setProgress(70);
        let parsedData = await data.json();
        this.props.setProgress(100);
        this.setState({ articles: parsedData.articles, page: this.state.page+1, totalResults: parsedData.totalResults,loading:false });

    }

    fetchMoreData= async ()=>{
            // this.setState({page:this.state.page+1})
            // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=cef2b19db4454f5a919d4b3274961a97&page=${this.state.page}&pageSize=${this.state.pageSize}&category=${this.props.category}`;
            
            
            let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.state.pageSize}&category=${this.props.category}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: this.state.articles.concat(parsedData.articles), page:this.state.page+1, totalResults: parsedData.totalResults,loading:false });
           
    }

    // HandlePreviousBtn =  () => {
    //     this.setState({page:this.state.page-1})
    //      this.HandleUpdate()
    // }

    // HandleNextBtn =  () => {
    //     this.setState({page:this.state.page+1})
    //      this.HandleUpdate()
    // }

    articles = [];

    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1,
            pageSize: 8,
            totalResults:0
        }
    }
    async componentDidMount() {

        this.setState({page:this.state.page})
         this.HandleUpdate()
    }

    render() {
        return (
            <div>
                <h1 className='text-center' style={{marginTop:"63px"}}>Welcome To Apni News...<h4>{this.Capitalize(this.props.category)} Top News</h4></h1>
                {this.state.loading&&<Spinner/>}
                <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length!==this.state.totalResults}
                loader={<Spinner/>}
                >
                    <div className="container">
                <div className=" row ">
                    {this.state.articles.map((element) => {
                        return (<>
                            {<div key={element.url} className="col-md-3 mx-3 my-3">
                                <Card title={element.title} description={element.description} imgurl={element.urlToImage ? element.urlToImage : "https://variety.com/wp-content/uploads/2022/01/Sundance-Park-City-Atmophere.jpg?w=1000"}
                                    newsurl={element.url} publishedAt={element.publishedAt} source={element.source} />
                            </div>}
                            
                        </>

                        )
                    })}
                    
                </div>
                </div>
                </InfiniteScroll>
                
                {/* <div className="container d-flex justify-content-between my-3">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-primary" onClick={this.HandlePreviousBtn}>Previous</button>
                    <button type="button" disabled={Math.ceil(this.state.totalResults / this.state.pageSize) < this.state.page + 1} className="btn btn-primary" onClick={this.HandleNextBtn}>Next</button>
                </div> */}

            </div>
        )

    }
}

News.propTypes={
    country:PropTypes.string,
    category:PropTypes.string
}
News.defaultProps={
    country:'in',
    category:'general'
}