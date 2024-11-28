import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import Header from '../Header';
import Footer from '../Footer';

function SubsidyRegulations() {
  const [activeTab, setActiveTab] = useState('subsidies');
  const [expanded, setExpanded] = useState(null);
  const [showFormIndex, setShowFormIndex] = useState(null); // Tracks which subsidy form to show

  const subsidies = [
    {
      title: 'Organic Farming Subsidy',
      description: 'Support of up to $5000 for organic farming initiatives...',
      fullDescription:
        'Support of up to $5000 for organic farming initiatives to promote sustainable practices.',
      deadline: '2024-05-01',
      amount: '$5000',
      category: 'sustainability',
      region: 'nationwide',
    },
    {
      title: 'Irrigation System Subsidy',
      description:
        'Financial aid of up to $10000 for adopting advanced irrigation techniques...',
      fullDescription:
        'Financial aid of up to $10000 for adopting advanced irrigation techniques and equipment.',
      deadline: '2024-07-01',
      amount: '$10000',
      category: 'irrigation',
      region: 'nationwide',
    },
  ];

  const regulations = [
    {
      title: 'Pesticide Usage Regulation',
      description:
        'Guidelines for responsible and safe pesticide application...',
      fullDescription:
        'Guidelines for responsible and safe pesticide application to minimize environmental impact.',
      effectiveDate: '2024-01-01',
      category: 'pesticide',
      type: 'guideline',
    },
    {
      title: 'Land Management Policy',
      description:
        'Rules for sustainable land use, including practices to prevent soil erosion...',
      fullDescription:
        'Rules for sustainable land use, including practices to prevent soil erosion and degradation.',
      effectiveDate: '2024-02-15',
      category: 'land_management',
      type: 'policy',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            onClick={() => setActiveTab('subsidies')}
            className={`${
              activeTab === 'subsidies'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200'
            }`}
          >
            Subsidies
          </Button>
          <Button
            onClick={() => setActiveTab('regulations')}
            className={`${
              activeTab === 'regulations'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200'
            }`}
          >
            Regulations
          </Button>
        </div>

        <h1 className="text-3xl font-bold text-center mb-8">
          {activeTab === 'subsidies'
            ? 'Available Subsidies'
            : 'Latest Regulations'}
        </h1>

        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-4xl bg-white p-6 shadow-md rounded space-y-20 ">
            {activeTab === 'subsidies'
              ? subsidies.map((subsidy, index) => (
                  <Card key={index} className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      {subsidy.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {expanded === index
                        ? subsidy.fullDescription
                        : subsidy.description}{' '}
                      <span
                        className="text-green-600 cursor-pointer"
                        onClick={() =>
                          setExpanded(expanded === index ? null : index)
                        }
                      >
                        {expanded === index ? 'Show less' : 'Read more'}
                      </span>
                    </p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>Application Deadline: {subsidy.deadline}</p>
                      <p>Amount: {subsidy.amount}</p>
                      <p>Category: {subsidy.category}</p>
                      <p>Region: {subsidy.region}</p>
                    </div>
                    <div className="mt-4">
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() =>
                          setShowFormIndex(
                            showFormIndex === index ? null : index
                          )
                        }
                      >
                        {showFormIndex === index ? 'Close' : 'Apply'}
                      </Button>
                    </div>
                  </Card>
                ))
              : regulations.map((regulation, index) => (
                  <Card key={index} className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      {regulation.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {expanded === index
                        ? regulation.fullDescription
                        : regulation.description}{' '}
                      <span
                        className="text-green-600 cursor-pointer"
                        onClick={() =>
                          setExpanded(expanded === index ? null : index)
                        }
                      >
                        {expanded === index ? 'Show less' : 'Read more'}
                      </span>
                    </p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>Effective Date: {regulation.effectiveDate}</p>
                      <p>Category: {regulation.category}</p>
                      <p>Type: {regulation.type}</p>
                    </div>
                  </Card>
                ))}
          </div>

          {/* Subsidy Application Form Sidebar */}
          {showFormIndex !== null && (
            <div className="w-96 bg-white p-6 border rounded-lg shadow-lg fixed right-10 top-24">
              <h3 className="text-lg font-semibold mb-4">Apply for Subsidy</h3>
              <form className="space-y-4">
                <Input placeholder="Farmer ID" className="w-full" />
                <Select>
                  <SelectTrigger className="w-full">
                    Select Subsidy Type
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="organic_farming">
                      Organic Farming
                    </SelectItem>
                    <SelectItem value="irrigation_system">
                      Irrigation System
                    </SelectItem>
                  </SelectContent>
                </Select>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Upload CNIC Copy
                  </label>
                  <Input type="file" className="w-full" />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Upload Land Ownership Docs
                  </label>
                  <Input type="file" className="w-full" />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Submit Application
                </Button>
              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SubsidyRegulations;
