import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import ChatWindow from './ChatWindow';
import ConfirmModal from './ConfirmModal';
import StarRating from './StarRating';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    feedback: '',
    rating: 0,
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

    try {
      const response = await fetch('http://127.0.0.1:3000/add-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedback: formData.feedback,
          category: formData.category,
          rating: formData.rating,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback. Please try again later.');
      }

      const data = await response.json();
      console.log('Feedback submitted successfully:', data);

      // Show confirmation modal
      setIsSubmitting(false);
      setShowConfirmModal(true);
    } catch (error) {
      console.error('Error submitting feedback:', error.message);
      alert('Error submitting feedback: ' + error.message); // You can customize the error display
      setIsSubmitting(false);
    }
  };

  const confirmSubmission = () => {
    setIsSubmitted(true);
    setShowConfirmModal(false);
    console.log('Feedback submitted:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header></Header>
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
        className="fixed bottom-20 right-10 bg-green-600 text-white hover:bg-green-700"
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
