import React, { Component } from "react";
import jsPdf from "jspdf";
import domtoimage from "dom-to-image";

export default class ExportToPDFButton extends Component {
  constructor() {
    super();
    this.export = this.export.bind(this);
  }

  export() {
    const pages = Array.from(document.querySelectorAll(this.props.pageClass));

    const promises = pages.map(p => {
      return domtoimage
        .toPng(p)
        .then(function(dataUrl) {
          return dataUrl;
        })
        .catch(err => console.log("Error at Dom-To-Image promises", err));
    });

    Promise.all(promises)
      .then(dataUrls => {
        let doc = new jsPdf("p", "px", "a4", false);
        dataUrls.map((image, index) => {
          doc.addImage(image, "PNG", 0, 0, 450, 630);

          if (index + 1 < dataUrls.length) {
            doc.addPage("a4");
          }

          return 0;
        });
        doc.save("export.pdf");
      })
      .catch(err => console.log("Error at jsPdf promises", err));
  }

  render() {
    return (
      <button onClick={this.export} className="downloadBtn">
        DESCARGAR
      </button>
    );
  }
}
