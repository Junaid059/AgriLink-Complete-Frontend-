import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Upload, Tags, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function ProfilePage() {
  const stats = {
    uploaded: 15,
    labeled: 45,
    validated: 30,
  };

  const history = [
    {
      date: '2024-01-15',
      type: 'Diagnosis',
      crop: 'Wheat',
      result: 'Healthy',
    },
    {
      date: '2024-01-10',
      type: 'Diagnosis',
      crop: 'Tomato',
      result: 'Leaf Blight',
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-green-700">Farmer Profile</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">Images Uploaded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {stats.uploaded}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">Images Labeled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {stats.labeled}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">Labels Validated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {stats.validated}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">
              Dataset Contributions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/contribute?tab=upload">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                <Upload className="w-4 h-4 mr-2" />
                Contribute Images
              </Button>
            </Link>
            <Link href="/contribute?tab=label">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                <Tags className="w-4 h-4 mr-2" />
                Label Images
              </Button>
            </Link>
            <Link href="/contribute?tab=validate">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                <CheckCircle className="w-4 h-4 mr-2" />
                Validate Labels
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">Diagnostic History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <div className="font-medium text-green-700">
                      {item.crop}
                    </div>
                    <div className="text-sm text-gray-600">{item.date}</div>
                  </div>
                  <Badge
                    className={
                      item.result === 'Healthy'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }
                  >
                    {item.result}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ProfilePage;
