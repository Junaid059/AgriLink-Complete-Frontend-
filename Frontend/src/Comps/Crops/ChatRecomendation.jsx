import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ChatRecommendation = () => {
  const [crop, setCrop] = useState('');
  const [disease, setDisease] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // your api call

    const mockRecommendation = `For ${crop} affected by ${disease}, it's recommended to start with cultural practices such as crop rotation and sanitation. Remove and destroy infected plant parts. Apply appropriate fungicides if the disease is fungal, or use insecticides for pest-related issues. Ensure proper irrigation and avoid overhead watering. Monitor the crop regularly and act quickly if symptoms reappear.`;
    setRecommendation(mockRecommendation);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-green-800">Chat Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter crop name"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Enter disease name"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Get Recommendation
          </Button>
        </form>
        {recommendation && (
          <div className="mt-4 p-4 bg-green-100 rounded-md">
            <h3 className="font-semibold mb-2 text-green-700">
              Recommendation:
            </h3>
            <p className="text-green-800">{recommendation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatRecommendation;
