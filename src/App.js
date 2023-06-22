import './App.css';
import React, { Component } from 'react'
import Navbar from './Component/Navbar';
import News from './Component/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  state={
    progress:0
  }

  setProgress= (progress)=>{
    this.setState({progress:progress});
  }
  render() {
    return (
      <div>
      <Router>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
      />
      <Routes>
        {/* Key are used to uniquely identify news component and rerender it  */}
    <Route exact path="/sports" element={<News setProgress={this.setProgress}   key="sports" country="in"category="sports"  title="Sports"/>}/>
    <Route exact path="/" element={<News setProgress={this.setProgress} key="general" country="in"category="general" title="Monkey News"/>}/>
    <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" country="in"category="business" title="Business"/>}/>
    <Route exact path="/general" element={<News setProgress={this.setProgress}key="general" country="in"category="general" title="General"/>}/>
    <Route exact path="/health" element={<News setProgress={this.setProgress}key="health" country="in"category="health" title="Health"/>}/>
    <Route exact path="/science" element={<News setProgress={this.setProgress}key="science" country="in"category="science" title="Science"/>}/>
    <Route exact path="/technology" element={ <News setProgress={this.setProgress} key="technology" country="in"category="technology" title="Technology"/>}/>
    <Route exact path="/entertainment" element={<News setProgress={this.setProgress}key="entertainment" country="in"category="entertainment" title="Entertainment"/>}/>
      </Routes>
      </Router>
      </div>
    )
  }
}
