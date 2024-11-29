import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Upload, X } from 'lucide-react';

function DiagnosisForm({ onSubmit }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [cropType, setCropType] = useState('');
  const [location, setLocation] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    setUploading(false);
    onSubmit({ file, cropType, location });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-700">Image Upload Interface</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="image" className="text-green-700">
              Crop Image
            </Label>
            <div className="grid gap-4">
              <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Label
                  htmlFor="image"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Upload className="w-8 h-8 mb-2 text-green-500" />
                  <span className="text-sm text-gray-600">Upload Picture</span>
                </Label>
              </div>
              {preview && (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              {uploading && (
                <div className="w-16 h-16 mx-auto">
                  <CircularProgressbar
                    value={progress}
                    text={`${progress}%`}
                    styles={buildStyles({
                      textColor: '#4caf50',
                      pathColor: '#4caf50',
                      trailColor: '#e0e0e0',
                    })}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="crop-type" className="text-green-700">
              Crop Type
            </Label>
            <Input
              id="crop-type"
              placeholder="Enter crop type"
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-green-700">
              Select Location
            </Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="north">North Region</SelectItem>
                <SelectItem value="south">South Region</SelectItem>
                <SelectItem value="east">East Region</SelectItem>
                <SelectItem value="west">West Region</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            disabled={!file || uploading}
          >
            {uploading ? 'Analyzing...' : 'Submit for Diagnosis'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default DiagnosisForm;
