import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 10,
    category: "general",
    language: "en",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    language: PropTypes.string,
    ApiKey: PropTypes.string.isRequired,
  };

  capitalize = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalArticles: 0,
      hasMore: true,

    };
    document.title = `NewsMonkey - ${this.capitalize(props.category)}`;
  }

  buildUrl = (page) => {
    const { country, category, language, pageSize, ApiKey } = this.props;
    return `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&language=${language}&apiKey=${ApiKey}&page=${page}&pageSize=${pageSize}`;
  };

  fetchNews = async (page,first=false) => {
    const url = this.buildUrl(page);
    const response = await fetch(url);
    if(first){this.props.setProgress(30);}
    const parsedData = await response.json();
    if(first){this.props.setProgress(70);}
    return parsedData;
  };

  async componentDidMount() {
    this.props.setProgress(10);
    const data = await this.fetchNews(this.state.page,true);
    this.setState({
      articles: data.articles,
      totalArticles: data.totalResults,
      loading: false,
      hasMore: data.articles.length > 0,
    });
    this.props.setProgress(100);
  }

  fetchData = async () => {
    const nextPage = this.state.page + 1;
    const data = await this.fetchNews(nextPage);
    const newArticles = data.articles || [];

    if (newArticles.length === 0) {
      this.setState({ hasMore: false, loading: false });
      return;
    }

    this.setState((prevState) => {
      const updatedArticles = prevState.articles.concat(newArticles);
      const hasMore = updatedArticles.length < data.totalResults;

      return {
        articles: updatedArticles,
        totalArticles: data.totalResults,
        page: nextPage,
        loading: false,
        hasMore: hasMore,
      };
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "60px 0px 20px" }}>
          Top {this.capitalize(this.props.category)} Headlines
        </h1>

        {/* {this.state.loading && <Spinner />} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchData}
          hasMore={this.state.hasMore}
          loader={<Spinner />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>The End</b>
            </p>
          }
        >
         <div className="container">
           <div className="row g-4 justify-content-center">
            {this.state.articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title || ""}
                  description={element.description || ""}
                  newsUrl={element.url || ""}
                  imageUrl={element.urlToImage}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
         </div>
        </InfiniteScroll>
      </>
    );
  }
}
