import React, { Component } from "react";
import "./csstransition_ex2.css";

export default class CssTransitionEx2 extends Component {
  render() {
    return (
      <div>
        <section id="skew">
          <h3> The skew() method</h3>
          <p>skews an element along the X and Y-axis by the given angle.</p>

          <div className="square" />
        </section>

        <section id="scale">
          <h3> The scale() method</h3>
          <p>increases or decreases the size of an element.</p>

          <div className="square">
            <div />
          </div>
        </section>

        <section id="rotate">
          <h3> The rotate() method</h3>
          <p>
            rotates an element clockwise or counter-clockwise according to a
            given degree.
          </p>

          <div className="square" />
        </section>

        <section id="translate">
          <h3> The translate() method</h3>
          <p>
            moves an element from its current position. This div element is
            moved 900 pixels to the right.
          </p>

          <div className="square" />
        </section>
      </div>
    );
  }
}
