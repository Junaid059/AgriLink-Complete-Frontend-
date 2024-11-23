import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mail, MapPin, Phone, Loader2 } from 'lucide-react';
import StarRating from './StarRating';
import ChatWindow from './ChatWindow';
import ConfirmModal from './ConfirmModal';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    feedback: '',
    rating: 0,
    experience: '',
    improvements: '',
    wouldRecommend: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showChatWindow, setShowChatWindow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setShowConfirmModal(true);
  };

  const confirmSubmission = () => {
    setIsSubmitted(true);
    setShowConfirmModal(false);
    console.log('Feedback submitted:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-xl font-bold text-green-600 hover:text-green-700 transition-colors"
            >
              AgriLink
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'MarketPlace', path: '/marketplace' },
                { name: 'News', path: '/news' },
                { name: 'Blog', path: '/blogs' },
                { name: 'Contact', path: '/contact' },
                { name: 'Feedback', path: '/feedback' },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="text-sm hover:text-green-600 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-3xl font-semibold text-center text-green-600 mb-8">
              Comprehensive Feedback Form
            </h2>
            {isSubmitted ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-green-600 mb-4">
                  Thank You for Your Feedback!
                </h3>
                <p className="text-gray-600 mb-8">
                  Your input is valuable to us and will help improve our
                  services.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  Submit Another Response
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Label htmlFor="category">Feedback Category</Label>
                  <Select
                    name="category"
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="customer-support">
                        Customer Support
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="feedback">Your Feedback</Label>
                  <Textarea
                    id="feedback"
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    placeholder="Please provide your detailed feedback here..."
                    rows={6}
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Label>Rate Your Overall Experience</Label>
                  <StarRating
                    rating={formData.rating}
                    onRatingChange={(rating) =>
                      setFormData((prev) => ({ ...prev, rating }))
                    }
                  />
                </div>

                <div className="space-y-4">
                  <Label>How would you describe your experience?</Label>
                  <RadioGroup
                    name="experience"
                    value={formData.experience}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, experience: value }))
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="excellent" id="excellent" />
                      <Label htmlFor="excellent">Excellent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="good" id="good" />
                      <Label htmlFor="good">Good</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="average" id="average" />
                      <Label htmlFor="average">Average</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="poor" id="poor" />
                      <Label htmlFor="poor">Poor</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="improvements">What could we improve?</Label>
                  <Textarea
                    id="improvements"
                    name="improvements"
                    value={formData.improvements}
                    onChange={handleChange}
                    placeholder="Please suggest any improvements..."
                    rows={4}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="wouldRecommend"
                    checked={formData.wouldRecommend}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev }))
                    }
                  />
                  <Label htmlFor="wouldRecommend">
                    I would recommend AgriLink to others
                  </Label>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="bg-green-600 text-white hover:bg-green-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Feedback'
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setFormData({
                        name: '',
                        email: '',
                        category: '',
                        feedback: '',
                        rating: 0,
                        experience: '',
                        improvements: '',
                        wouldRecommend: false,
                      })
                    }
                  >
                    Clear Form
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <span className="text-green-500">AgriLink</span>
            </h2>
            <p className="mt-4 text-sm text-gray-400">
              There are many variations of passages of Lorem Ipsum available,
              but the majority suffered.
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
            </div>
          </div>

          {/* Explore Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* News Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">News</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  <h4 className="font-semibold text-sm">
                    Bringing Food Production Back To Cities
                  </h4>
                  <span className="text-xs text-green-500">July 5, 2022</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  <h4 className="font-semibold text-sm">
                    The Future of Farming, Smart Irrigation Solutions
                  </h4>
                  <span className="text-xs text-green-500">July 5, 2022</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center">
                <Phone className="h-6 w-6 text-green-500 mr-3" />
                666 888 0000
              </li>
              <li className="flex items-center">
                <Mail className="h-6 w-6 text-green-500 mr-3" />
                needhelp@company.com
              </li>
              <li className="flex items-center">
                <MapPin className="h-6 w-6 text-green-500 mr-3" />
                80 Brooklyn Golden Street Line, New York, USA
              </li>
            </ul>
            <form className="mt-4">
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-l-md focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white text-sm rounded-r-md hover:bg-green-600"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-sm text-gray-500 text-center">
          <p>
            © All Copyright 2024 by Shawonetc Themes |{' '}
            <a href="#" className="hover:text-white">
              Terms of Use
            </a>{' '}
            |{' '}
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
          </p>
        </div>
      </footer>

      <Button
        className="fixed bottom-4 right-4 bg-green-600 text-white hover:bg-green-700"
        onClick={() => setShowChatWindow(true)}
      >
        Need Help?
      </Button>

      {showChatWindow && (
        <ChatWindow onClose={() => setShowChatWindow(false)} />
      )}

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmSubmission}
        title="Confirm Submission"
        message="Are you sure you want to submit this feedback?"
      />
    </div>
  );
};

export default FeedbackForm;
