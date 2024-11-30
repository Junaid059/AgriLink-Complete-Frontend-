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
import Header from '../UserHeader';
import Footer from '../Footer';

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

      <Footer></Footer>

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
