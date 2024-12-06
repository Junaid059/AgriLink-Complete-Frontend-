import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { Leaf } from 'lucide-react';

function FormPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subscribe: false,
    gender: '',
    country: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    toast.success('Form submitted! Thank you for your submission.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-lg border-green-200">
          <CardHeader className="bg-green-500 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold flex items-center justify-center">
              <Leaf className="mr-2" />
              Form
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Label htmlFor="name" className="text-green-700">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 border-green-300 focus:ring-green-500 focus:border-green-500"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Label htmlFor="email" className="text-green-700">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 border-green-300 focus:ring-green-500 focus:border-green-500"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id="subscribe"
                  name="subscribe"
                  checked={formData.subscribe}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, subscribe: checked }))
                  }
                  className="text-green-500 focus:ring-green-500"
                />
                <Label htmlFor="subscribe" className="text-green-700">
                  Subscribe to newsletter
                </Label>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Label className="text-green-700">Gender</Label>
                <RadioGroup
                  name="gender"
                  value={formData.gender}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, gender: value }))
                  }
                  className="mt-2 space-y-2"
                >
                  {['male', 'female', 'other'].map((gender) => (
                    <div key={gender} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={gender}
                        id={gender}
                        className="text-green-500 focus:ring-green-500"
                      />
                      <Label
                        htmlFor={gender}
                        className="capitalize text-green-700"
                      >
                        {gender}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Label htmlFor="country" className="text-green-700">
                  Country
                </Label>
                <Select
                  name="country"
                  value={formData.country}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, country: value }))
                  }
                >
                  <SelectTrigger className="mt-1 border-green-300 focus:ring-green-500 focus:border-green-500">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      'United States',
                      'United Kingdom',
                      'Canada',
                      'Australia',
                    ].map((country) => (
                      <SelectItem
                        key={country.toLowerCase()}
                        value={country.toLowerCase()}
                      >
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Label htmlFor="message" className="text-green-700">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 border-green-300 focus:ring-green-500 focus:border-green-500"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out transform hover:scale-105"
                >
                  Submit
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default FormPage;
