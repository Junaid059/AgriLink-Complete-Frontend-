import React, { useState } from 'react';
import DiagnosisForm from './DiagnosisForm';
import DiagnosisResult from './DiagnosisResult';
import ChatRecommendation from './ChatRecomendation';

function CropDash() {
  const [diagnosisResult, setDiagnosisResult] = useState(null);

  const handleDiagnosisSubmit = (result) => {
    // setTimeout(() => {
    //   setDiagnosisResult({
    //     status: 'Unhealthy',
    //     diseases: ['Leaf Blight', 'Root Rot'],
    //     measures: [
    //       'Apply fungicide',
    //       'Improve drainage',
    //       'Reduce irrigation frequency',
    //     ],
    //     pesticides: ['Fungicide X', 'Organic Treatment Y'],
    //     weather: {
    //       condition: 'Rain expected',
    //       recommendation: 'Apply treatment within 24 hours',
    //     },
    //   });
    // }, 1500);
    setDiagnosisResult(result);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-700 mb-8">Crop Diagnosis</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <DiagnosisForm onSubmit={handleDiagnosisSubmit} />
          {diagnosisResult && <DiagnosisResult diagnosis={diagnosisResult} />}
        </div>
        <ChatRecommendation />
      </div>
    </div>
  );
}

export default CropDash;
