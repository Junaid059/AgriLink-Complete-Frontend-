import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

function LabelImages() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-700">Label Images</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <img
          src="/placeholder.svg?height=300&width=600"
          alt="Crop"
          className="w-full h-64 object-cover rounded-lg"
        />

        <div className="space-y-2">
          <Label className="text-green-700">Select Health Status</Label>
          <RadioGroup defaultValue="healthy">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="healthy" id="label-healthy" />
              <Label htmlFor="label-healthy">Healthy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unhealthy" id="label-unhealthy" />
              <Label htmlFor="label-unhealthy">Unhealthy</Label>
            </div>
          </RadioGroup>
        </div>

        <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
          Next Image
        </Button>
      </CardContent>
    </Card>
  );
}

export default LabelImages;
