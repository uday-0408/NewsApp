// pageSize={this.pageSize}// import logo from './logo.svg';
import "./App.css";
import Navbar from "./Components/Navbar";
import React, { Component } from "react";
import News from "./Components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize = 10;
  state = {
    progress: 0,
  }
  setProgress = (progress) => {
    this.setState({ progress });
  };
  ApiKey="dcdda142a7b2440f980f3c02805f8d71";
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
            onLoaderFinished={() => this.setProgress(0)}
            height={5}
            transitionTime={100}
          />
          <Routes>
            <Route path="/" element={<><News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="us" ApiKey={this.ApiKey} language="en" category="general"/></>}/>
            <Route path="/business" element={<><News setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="us" ApiKey={this.ApiKey} language="en" category="business"/></>}/>
            <Route path="/entertainment" element={<><News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="us" ApiKey={this.ApiKey} language="en" category="entertainment"/></>}/>
            {/* <Route path="/general" element={<><News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="us" ApiKey={this.ApiKey} language="en" category="general"/></>}/> */}
            <Route path="/health" element={<><News setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="us" ApiKey={this.ApiKey} language="en" category="health"/></>}/>
            <Route path="/science" element={<><News setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="us" ApiKey={this.ApiKey} language="en" category="science"/></>}/>
            <Route path="/sports" element={<><News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="us" ApiKey={this.ApiKey} language="en" category="sports"/></>}/>
            <Route path="/technology" element={<><News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="us" ApiKey={this.ApiKey} language="en" category="technology"/></>}/>
          </Routes>
        </Router>
      </div>
    );
  }
}
