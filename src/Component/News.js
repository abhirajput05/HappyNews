import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
// import LoadingBar from 'react-top-loading-bar'


export default class News extends Component {
  static defaultProps={
    county:'in'
  }
  static propTypes={
    country:PropTypes.string
  }
  constructor(props){
    super(props);
    this.state={
      article:[],
      loading:true,
      page:1,
      totalResults:0
    }
    document.title=`${this.props.category.charAt(0).toUpperCase()+this.props.category} - NewsMonkey`
  
  }
  async upDatePage(){
    this.props.setProgress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b32f752305b14786a3944b294522fcc9&pageSize=6&page=${this.state.page}`;
    this.props.setProgress(30);
    this.setState({loading:true});
    let data=await fetch(url);
    let parseData= await data.json();
    this.props.setProgress(70);
    this.setState({article:parseData.articles,totalResults:parseData.totalResults,loading:false});
    this.props.setProgress(100);
  }
  async componentDidMount(){
    this.upDatePage();
  }
   
  fetchMoreData = async() => {
    this.setState({page:this.state.page+1})
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b32f752305b14786a3944b294522fcc9&pageSize=6&page=${this.state.page}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parseData= await data.json();
    this.setState({
      article:this.state.article.concat(parseData.articles),
      totalResults:parseData.totalResults,
  });

  };
  //  handlePrevClick=async()=>{
  //   this.setState({page:this.state.page-1});
  //   this.upDatePage();
  //  }
  //  handleNextClick=async ()=>{
  //   this.setState({page:this.state.page+1});
  //   this.upDatePage();
  // }

  render() {
   
    // console.log(this.state.article)
    return (
      <>
        <h1 className='text-center' style={{marginTop:"90px"}}>NewsMonkey - Top {this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)} Headlines </h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length!=this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row my-5">
          {this .state.article.map((element)=>{
           return   <div className="col-md-4" key={element.url}>
           <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
           </div>
          })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div class="d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}>&#8592; Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalArticle/6)}type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &#8594;</button>
        </div> */}
      </>
    )
  }
}
