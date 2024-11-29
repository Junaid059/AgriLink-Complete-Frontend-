import React, { useState } from 'react';
import DiagnosisForm from './DiagnosisForm';
import DiagnosisResult from './DiagnosisResult';

function CropDash() {
  const [diagnosisResult, setDiagnosisResult] = useState(null);

  const handleDiagnosisSubmit = (formData) => {
    // Simulate API call
    setTimeout(() => {
      setDiagnosisResult({
        status: 'Unhealthy',
        diseases: ['Leaf Blight', 'Root Rot'],
        measures: [
          'Apply fungicide',
          'Improve drainage',
          'Reduce irrigation frequency',
        ],
        pesticides: ['Fungicide X', 'Organic Treatment Y'],
        weather: {
          condition: 'Rain expected',
          recommendation: 'Apply treatment within 24 hours',
        },
      });
    }, 1500);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-green-700 mb-8">Crop Diagnosis</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <DiagnosisForm onSubmit={handleDiagnosisSubmit} />
        {diagnosisResult && <DiagnosisResult diagnosis={diagnosisResult} />}
      </div>
    </>
  );
}

export default CropDash;
