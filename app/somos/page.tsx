'use client'

import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

const App = () => {
  return <div>
    <PdfViewer pdfUrl='/terminos.pdf' />
  </div>
};

// Establecer la URL del worker de PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfViewerProps {
  pdfUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    if (pageNumber < numPages!) {
      changePage(1);
    }
  };

  return (
    <div>
      <div>
        <button disabled={pageNumber <= 1} onClick={previousPage}>
          Anterior
        </button>
        <button disabled={pageNumber >= numPages!} onClick={nextPage}>
          Siguiente
        </button>
      </div>
      <div>
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {numPages && (
            <Page pageNumber={pageNumber} />
          )}
        </Document>
      </div>
    </div>
  );
};



export default App;