// Import necessary modules from your libraries
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, ArrowRight } from 'lucide-react';
// import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <img
          src="/placeholder.svg"
          alt="Agriculture background"
          width={1920}
          height={600}
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">
              Agriculture & Eco Farming
            </h1>
            <Button className="bg-green-600 hover:bg-green-700">
              Discover More
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "We're using a new technology", icon: 'tech' },
            { title: 'Good to export organic services', icon: 'organic' },
            { title: 'Reforming in the modern', icon: 'eco' },
          ].map((feature) => (
            <Card
              key={feature.title}
              className="p-6 bg-white shadow-lg text-center"
            >
              <img
                src="/placeholder.svg"
                alt={feature.icon}
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            </Card>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-full overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Farm landscape"
                width={400}
                height={400}
                className="w-full"
              />
            </div>
            <div className="absolute -bottom-10 -right-10">
              <img
                src="/placeholder.svg"
                alt="Farming detail"
                width={200}
                height={200}
                className="rounded-full border-4 border-white"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Agriculture & Organic Product Farm
            </h2>
            <p className="text-gray-600 mb-6">
              AgriCo is the largest global organic farm that delivers organic
              produce and food directly from our fields to your home.
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <p className="text-sm">Growing Fresh vegetables</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <p className="text-sm">Tips for growing fresh fruits</p>
              </div>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              Discover More
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Fresh Fruits', image: 'fruits' },
            { name: 'Products', image: 'products' },
            { name: 'Vegetables', image: 'vegetables' },
            { name: 'Products', image: 'products' },
          ].map((product) => (
            <div key={product.name} className="relative group">
              <img
                src="/placeholder.svg"
                alt={product.name}
                width={300}
                height={300}
                className="rounded-lg w-full object-cover aspect-square"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="outline"
                  className="absolute bottom-4 left-4 text-white border-white hover:bg-white hover:text-black"
                >
                  {product.name}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Section */}
      <section className="relative h-[400px] mt-20">
        <img
          src="/placeholder.svg"
          alt="Agriculture video background"
          width={1920}
          height={400}
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h2 className="text-4xl font-bold mb-4">
              Agriculture Matters to the Future of Development
            </h2>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black"
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Video
            </Button>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">
              Today's Market Agriculture
            </h3>
            <p className="text-gray-600 mb-4">
              Learn about the latest trends and developments in agricultural
              markets.
            </p>
            <Button variant="outline" className="flex items-center">
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Why Choose Agrico</h3>
            <p className="text-gray-600 mb-4">
              Discover the benefits of choosing our organic farming solutions.
            </p>
            <Button variant="outline" className="flex items-center">
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <img
              key={item}
              src="/placeholder.svg"
              alt={`Gallery image ${item}`}
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-full"
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">About Us</h4>
              <p className="text-gray-400">
                Leading the way in sustainable and organic farming practices.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="#about" className="text-gray-400 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="#services"
                    className="text-gray-400 hover:text-white"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="#contact"
                    className="text-gray-400 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact Info</h4>
              <p className="text-gray-400">Phone: +123 456 789</p>
              <p className="text-gray-400">Email: info@agrico.com</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
