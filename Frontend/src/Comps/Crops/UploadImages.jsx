import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export function UploadImages() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-700">Upload Images</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="flex flex-col items-center">
            <Upload className="w-8 h-8 mb-2 text-green-500" />
            <span className="text-sm text-gray-600">Upload Picture</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-green-700">Label:</Label>
          <RadioGroup defaultValue="healthy">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="healthy" id="healthy" />
              <Label htmlFor="healthy">Healthy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unhealthy" id="unhealthy" />
              <Label htmlFor="unhealthy">Unhealthy</Label>
            </div>
          </RadioGroup>
        </div>

        <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
          Upload Image
        </Button>
      </CardContent>
    </Card>
  );
}

export default UploadImages;
