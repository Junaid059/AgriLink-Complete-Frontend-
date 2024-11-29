import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Download, AlertTriangle } from 'lucide-react';

function DatasetPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-green-700">Dataset Download</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-green-700">Crop Disease Dataset</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose">
            <p>
              This dataset contains crowd-sourced images of various crops with
              their health status labels (healthy/diseased). The images have
              been validated by multiple users to ensure label quality.
            </p>

            <h3 className="text-green-700">Dataset Details</h3>
            <ul>
              <li>Total Images: 10,000+</li>
              <li>Validated Labels: 8,000+</li>
              <li>Crop Types: 20+</li>
              <li>Format: ZIP archive containing images and CSV annotations</li>
            </ul>

            <h3 className="text-green-700">Use Cases</h3>
            <ul>
              <li>
                Training machine learning models for crop disease detection
              </li>
              <li>Agricultural research and analysis</li>
              <li>Educational purposes</li>
            </ul>
          </div>

          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Disclaimer</AlertTitle>
            <AlertDescription>
              This dataset is provided under the Creative Commons Attribution
              4.0 International License. By downloading this dataset, you agree
              to attribute the source and contribute any improvements back to
              the community.
            </AlertDescription>
          </Alert>

          <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
            <Download className="w-4 h-4 mr-2" />
            Download Dataset (2.3 GB)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default DatasetPage;
