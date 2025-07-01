import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configuration du worker - version exacte pour compatibilité
pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

const App = () => {
    const [numPages, setNumPages] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setLoading(false);
        setError(null);
    }

    function onDocumentLoadError(error) {
        console.error('Erreur de chargement PDF:', error);
        setError('Impossible de charger le PDF');
        setLoading(false);
    }

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Mon PDF dans la page web</h1>
            
            {loading && <p>Chargement du PDF...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <Document
                file="/dart.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={<p>Chargement en cours...</p>}
                error={<p>Erreur lors du chargement du PDF</p>}
                noData={<p>Aucun PDF trouvé</p>}
            >
                {numPages && Array.from(new Array(numPages), (el, index) => (
                    <div key={`page_${index + 1}`} style={{ marginBottom: '20px' }}>
                        <Page
                            pageNumber={index + 1}
                            width={600}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    </div>
                ))}
            </Document>

            {numPages && (
                <p style={{ marginTop: '20px', fontWeight: 'bold' }}>
                    Total: {numPages} pages
                </p>
            )}
        </div>
    );
};

export default App;