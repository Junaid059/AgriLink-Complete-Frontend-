import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';

function Blog() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* Hero Section */}
      <div className="relative h-[300px] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=300&width=1200')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative flex h-full items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Our Blog</h1>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2">
          {/* Blog Posts */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-0">
                <img
                  alt="Farm hay bales"
                  className="h-[200px] w-full object-cover"
                  src="/placeholder.svg?height=200&width=400"
                />
              </CardContent>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500">Agriculture</Badge>
                  <span className="text-sm text-gray-500">March 15, 2024</span>
                </div>
                <h2 className="text-2xl font-bold">
                  Bringing Food Production Back To Cities
                </h2>
                <p className="text-gray-600">
                  Urban farming initiatives are revolutionizing how we think
                  about food production in metropolitan areas...
                </p>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="link"
                  className="text-green-600 hover:text-green-700"
                >
                  Read More
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardContent className="p-0">
                <img
                  alt="Smart irrigation"
                  className="h-[200px] w-full object-cover"
                  src="/placeholder.svg?height=200&width=400"
                />
              </CardContent>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500">Technology</Badge>
                  <span className="text-sm text-gray-500">March 12, 2024</span>
                </div>
                <h2 className="text-2xl font-bold">
                  The Future of Farming: Smart Irrigation Solutions
                </h2>
                <p className="text-gray-600">
                  Modern irrigation technologies are helping farmers optimize
                  water usage and improve crop yields...
                </p>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="link"
                  className="text-green-600 hover:text-green-700"
                >
                  Read More
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input className="pl-8" placeholder="Search..." type="search" />
              </div>
            </CardContent>
          </Card>

          {/* Latest Posts */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Latest Posts</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <img
                    alt={`Latest post ${i}`}
                    className="h-16 w-16 rounded-md object-cover"
                    src="/placeholder.svg?height=64&width=64"
                  />
                  <div>
                    <h3 className="font-semibold">
                      Sustainable Farming Practices
                    </h3>
                    <p className="text-sm text-gray-500">March 10, 2024</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Categories</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  'Agriculture',
                  'Technology',
                  'Sustainability',
                  'Urban Farming',
                ].map((category) => (
                  <li key={category}>
                    <Button
                      variant="link"
                      className="text-gray-600 hover:text-green-700"
                    >
                      {category}
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Tags</h2>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {[
                'Farming',
                'Technology',
                'Irrigation',
                'Sustainable',
                'Urban',
              ].map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer hover:bg-gray-200"
                >
                  {tag}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Blog;
