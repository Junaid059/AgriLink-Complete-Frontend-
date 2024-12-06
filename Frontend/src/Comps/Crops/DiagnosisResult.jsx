import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Cloud, ShoppingCart } from 'lucide-react';

function DiagnosisResult({ diagnosis }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-700">
          Diagnosis Output Interface
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-green-700">Diagnosis Status</h3>
          <div
            className={`p-2 rounded-md ${
              diagnosis.status === 'Healthy'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {diagnosis.status}
          </div>
        </div>

        {diagnosis.status === 'Unhealthy' && (
          <>
            <div className="space-y-2">
              <h3 className="font-semibold text-green-700">
                Predicted Disease(s)
              </h3>
              <div className="flex gap-2">
                
                  <Badge
                    key={diagnosis.prediction}
                    variant="outline"
                    className="text-yellow-600 border-yellow-600"
                  >
                    {diagnosis.prediction}
                  </Badge>
              
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-green-700">
                Suggestion for Corrective Measures
              </h3>
              <ul className="list-disc pl-4 space-y-1 text-gray-700">
                {diagnosis.suggestions.map((measure) => (
                  <li key={measure}>{measure}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-green-700">
                Pesticide Recommendation Section
              </h3>
              <ul className="list-disc pl-4 space-y-1 text-gray-700">
                {diagnosis.pesticides.map((pesticide) => (
                  <li key={pesticide}>{pesticide}</li>
                ))}
              </ul>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Order Pesticides
              </Button>
            </div>
          </>
        )}

        {/* <div className="space-y-2">
          <h3 className="font-semibold text-green-700">
            Weather Conditions Output
          </h3>
          <div className="p-2 rounded-md bg-blue-100 text-blue-800">
            <Cloud className="inline-block mr-2 h-4 w-4" />
            {diagnosis.weather.condition}: {diagnosis.weather.recommendation}
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
}

export default DiagnosisResult;
