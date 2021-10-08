import "./heading.less";
import React, { Component } from "react";

const Heading = ({ value, textAlign = "center", style, headStyle={} }) => {
  return (
    <div className="heading" style={{textAlign, ...style}}>
      <h2 style={{...headStyle}} >{value} </h2>
      <div style={{marginLeft: textAlign=='left' ? 0: 'auto'}} className="bottom-line"></div>
    </div>
  );
};


export default Heading