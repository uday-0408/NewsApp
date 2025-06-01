import React, { Component } from "react";
// import image from "../../public/image.png"

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    let deafultImage ="/image.png"; // "https://static.toiimg.com/thumb/msid-10000000,width-600,height-400,quality-80,overlay-toiimgevents/photo.jpg";
    let cardStyle = {
      width: "100%",
      height: "520px",
      // margin: "10px",
      // objectFit: "cover",
    };
    let imageStyle = {
      height: "250px",
      objectFit: "cover",
    };
    let cardButtonStyle = {
      position: "absolute",
      bottom: "10px",
      left: "38%",
    };
    let authorAndDateStyle = {
      position: "absolute",
      bottom: "40px",
    };
    let badgeStyle = {
      // color:"black",
      position: "absolute",
      top: "0px",
      right: "0px",
      zIndex: 1,
    };
    const truncateByWords = (str, maxLen) => {
      return str
        .split(" ")
        .reduce(
          (acc, word) =>
            (acc + " " + word).length <= maxLen ? acc + " " + word : acc,
          ""
        )
        .trim(str.length > maxLen ? "..." : "");
    };

    return (
      <div className="mb-3">
        <div className="card" style={cardStyle}>
          <span className="badge rounded-pill bg-dark " style={badgeStyle}>
            {source ? source : ""}
          </span>
          <img
            src={imageUrl ? imageUrl : deafultImage}
            className="card-img-top"
            alt="Breaking News"
            style={imageStyle}
          />
          <div className="card-body">
            <h5 className="card-title">
              {title ? truncateByWords(title, 60) : "No title"}
            </h5>

            <p className="card-text">
              {description
                ? truncateByWords(description, 130) 
                : "No description available"}
            </p>
            <hr />
            <p className="card-text" style={authorAndDateStyle}>
              by {author ? author : "Unknown"} on{" "}
              {date ? new Date(date).toGMTString() : "Unknown date"}
            </p>
            <a
              href={newsUrl ? newsUrl : "#"}
              className="btn btn-dark btn-sm"
              target="_blank"
              rel="noopener noreferrer"
              style={cardButtonStyle}
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
