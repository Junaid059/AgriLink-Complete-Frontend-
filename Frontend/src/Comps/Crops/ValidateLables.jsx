'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function ValidateLabels() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-700">Validate Labels</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <img
          src="/placeholder.svg?height=300&width=600"
          alt="Crop for validation"
          className="w-full h-64 object-cover rounded-lg"
        />

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-medium text-green-700">Label:</span>
            <Badge
              variant="outline"
              className="text-yellow-600 border-yellow-600"
            >
              Diseased
            </Badge>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="border-green-500 text-green-700 hover:bg-green-50"
            >
              <ThumbsUp className="w-5 h-5 mr-2" />
              Correct
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-red-500 text-red-700 hover:bg-red-50"
            >
              <ThumbsDown className="w-5 h-5 mr-2" />
              Incorrect
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ValidateLabels;
