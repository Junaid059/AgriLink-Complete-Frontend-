import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Calendar, Bell, Download } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CalendarDays,
  Droplet,
  Thermometer,
  Cloud,
  AlertTriangle,
  Sprout,
  Info,
  ListChecks,
} from 'lucide-react';
import { Check, X, ChevronUp, ChevronDown } from 'lucide-react';

import CropCalendar from './components/CropCalendar';
import FarmerCalenderService from './services/FarmerCalenderService';
import { set } from 'date-fns';

function FarmerCalendar() {
  const [data, setData] = useState();
  const [countries, setCountries] = useState();
  const [regions, setRegions] = useState();
  const [crops, setCrops] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedRegion, setSelectedRegion] = useState();
  const [selectedCrop, setSelectedCrop] = useState();
  const [enteredCity, setEnteredCity] = useState('');
  const [sowingPeriod, setSowingPeriod] = useState([]);
  const [harvestPeriod, setHarvestPeriod] = useState([]);
  const [forecast, setForecast] = useState();
  const [endangered, setEndangered] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [activities, setActivities] = useState(null);
  const [farmingCalendar, setFarmingCalendar] = useState(null);
  const [activityAlerts, setActivityAlerts] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showRecEnd, setShowRecEnd] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [showFarmingCalendar, setShowFarmingCalendar] = useState(false);
  const [showActivityAlerts, setShowActivityAlerts] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await FarmerCalenderService.getData();
      setData(response.data);
      console.log('Data:', response.data);

      const countries = response.data.map((item) => item['Country Name']);
      const uniqueCountries = [...new Set(countries)];
      setCountries(uniqueCountries);
      console.log('Countries:', uniqueCountries);

      // const regions = response.data.map((item) => item['AgroEcological Zone']);
      // const uniqueRegions = [...new Set(regions)];
      // setRegions(uniqueRegions);
      // console.log('Regions:', uniqueRegions);

      // const crops = response.data.map((item) => item['Crop']);
      // const uniqueCrops = [...new Set(crops)];
      // setCrops(uniqueCrops);
      // console.log('Crops:', uniqueCrops);
    }

    fetchData();
  }, []);

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setSelectedRegion(null);
    setSelectedCrop(null);
    setShowCalendar(false);
    setForecast(null);

    // Filter regions and crops based on selected country
    const countryData = data.filter((item) => item['Country Name'] === value);
    const filteredRegions = [
      ...new Set(countryData.map((item) => item['AgroEcological Zone'])),
    ];
    const filteredCrops = [...new Set(countryData.map((item) => item['Crop']))];

    setRegions(filteredRegions);
    setCrops(filteredCrops);
  };

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
    setSelectedCrop(null);
    setShowCalendar(false);
    setForecast(null);

    // Filter crops based on selected country and region
    const filteredCrops = [
      ...new Set(
        data
          .filter(
            (item) =>
              item['Country Name'] === selectedCountry &&
              item['AgroEcological Zone'] === value
          )
          .map((item) => item['Crop'])
      ),
    ];

    setCrops(filteredCrops);
  };

  const handleCropChange = (value) => {
    setSelectedCrop(value);
    setShowCalendar(false);
    setForecast(null);

    // If crop is selected first, filter possible regions
    if (!selectedRegion) {
      const filteredRegions = [
        ...new Set(
          data
            .filter(
              (item) =>
                (!selectedCountry ||
                  item['Country Name'] === selectedCountry) &&
                item['Crop'] === value
            )
            .map((item) => item['AgroEcological Zone'])
        ),
      ];

      setRegions(filteredRegions);
    }
  };

  const findSowingMonths = () => {
    const cropData = data.find(
      (item) =>
        item['Country Name'] === selectedCountry &&
        item['AgroEcological Zone'] === selectedRegion &&
        item['Crop'] === selectedCrop
    );

    if (cropData) {
      setSowingPeriod({
        start: Number(cropData['Early Sowing'].Month) - 1,
        end: Number(cropData['Later Sowing'].Month) - 1,
      });
    }
  };

  const findHarvestMonths = () => {
    const cropData = data.find(
      (item) =>
        item['Country Name'] === selectedCountry &&
        item['AgroEcological Zone'] === selectedRegion &&
        item['Crop'] === selectedCrop
    );

    if (cropData) {
      setHarvestPeriod({
        start: Number(cropData['Early harvest'].Month) - 1,
        end: Number(cropData['Late harvest'].Month) - 1,
      });
    }
  };

  const viewCalendar = () => {
    setShowActivities(false);
    setShowRecEnd(false);
    setShowFarmingCalendar(false);
    setShowActivityAlerts(false);

    findHarvestMonths();
    findSowingMonths();
    setShowCalendar(true);
  };

  const getForecast = async () => {
    // Get forecast for the entered city
    const response = await FarmerCalenderService.getWeatherData(enteredCity);
    setForecast(response.data);
    console.log('Forecast:', response.data);

    return response.data;
  };

  const parseTemperatures = (forecast) => {
    console.log('Forecast:', forecast);
    if (!forecast?.forecast?.forecastday) return [];

    let temparatures = forecast.forecast.forecastday.map((day) => ({
      avgTemp: day.day.mintemp_c,
    }));

    // make tempartures array
    temparatures = temparatures.map((temp) => temp.avgTemp);

    console.log('Temparatures:', temparatures);

    return temparatures;
  };

  const getStartDate = (forecast) => {
    console.log('Forecast:', forecast);
    if (!forecast?.forecast?.forecastday) return [];

    console.log('Forecast date:', forecast.forecast.forecastday[0].date);
    return forecast.forecast.forecastday[0].date;
  };

  const getCurrentWeather = (forecast) => {
    if (!forecast?.current) return null;

    return {
      temperature: forecast.current.temp_c,
      humidity: forecast.current.humidity,
      precipitation: forecast.current.precip_mm,
    };
  };

  const viewRecEnd = async () => {
    setShowCalendar(false);
    setShowActivities(false);
    setShowFarmingCalendar(false);
    setShowActivityAlerts(false);

    const forecastData = await getForecast();
    const temperatures = parseTemperatures(forecastData);
    const startDate = getStartDate(forecastData);

    const endangeredResponse = await FarmerCalenderService.getEndangeredCrops(
      temperatures,
      selectedCountry,
      selectedRegion,
      startDate
    );
    setEndangered(endangeredResponse.data.endangeredCrops);

    const recommendedResponse = await FarmerCalenderService.getRecommendedCrops(
      temperatures,
      selectedCountry,
      selectedRegion,
      startDate
    );
    console.log('Recommended:', recommendedResponse.data.recommendations);
    setRecommended(recommendedResponse.data.recommendations);
    setShowRecEnd(true);
  };

  const viewCropActivities = async () => {
    setShowCalendar(false);
    setShowRecEnd(false);
    setShowFarmingCalendar(false);
    setShowActivityAlerts(false);

    const forecastData = await getForecast();
    const currentWeather = getCurrentWeather(forecastData);

    const response = await FarmerCalenderService.getCropActivities({
      country: selectedCountry,
      crop: selectedCrop,
      region: selectedRegion,
      currentWeather,
    });

    setActivities(response.data);
    setShowActivities(true);
  };

  const viewFarmingCalendar = async () => {
    setShowCalendar(false);
    setShowRecEnd(false);
    setShowActivities(false);
    setShowActivityAlerts(false);

    const forecastData = await getForecast();
    const weatherForecast = parseTemperatures(forecastData);

    const response = await FarmerCalenderService.getFarmingCalendar({
      country: selectedCountry,
      crop: selectedCrop,
      region: selectedRegion,
      weatherForecast,
    });

    setFarmingCalendar(response.data);
    setShowFarmingCalendar(true);
  };

  const viewActivityAlerts = async () => {
    setShowCalendar(false);
    setShowRecEnd(false);
    setShowActivities(false);
    setShowFarmingCalendar(false);

    const forecastData = await getForecast();
    const weatherForecast = parseTemperatures(forecastData);

    const response = await FarmerCalenderService.getActivityAlerts({
      country: selectedCountry,
      crop: selectedCrop,
      region: selectedRegion,
      weatherForecast,
    });

    setActivityAlerts(response.data);
    setShowActivityAlerts(true);
  };

  const getRiskColor = (riskLevel) => {
    if (riskLevel >= 0.7) return 'text-red-500';
    if (riskLevel >= 0.4) return 'text-yellow-500';
    return 'text-blue-500';
  };

  const getBgColor = (riskLevel) => {
    if (riskLevel >= 0.7) return 'bg-red-50';
    if (riskLevel >= 0.4) return 'bg-yellow-50';
    return 'bg-blue-50';
  };

  const getRiskVariant = (riskLevel) => {
    if (riskLevel >= 0.7) return 'destructive';
    if (riskLevel >= 0.4) return 'warning';
    return 'secondary';
  };

  const RecommendedEndangeredDisplay = () => (
    <div className="grid gap-6 md:grid-cols-2 mt-6">
      <Card className="border-t-4 border-t-green-500">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Check className="w-6 h-6 text-green-500" />
            <CardTitle>Recommended Crops</CardTitle>
          </div>
          <CardDescription>
            Optimal crops for current conditions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommended?.map((crop, index) => (
              <div key={index} className="bg-slate-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Sprout className="w-5 h-5 text-green-500" />
                    <span className="font-medium">{crop.crop}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      Suitability:
                    </span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${crop.suitability * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {(crop.suitability * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-t-4 border-t-red-500">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <CardTitle>Endangered Crops</CardTitle>
          </div>
          <CardDescription>
            Critical risk assessment and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {endangered?.map((crop, index) => (
            <div
              className={`rounded-lg ${getBgColor(
                crop.riskLevel
              )} p-6 space-y-6 mt-5`}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AlertTriangle
                    className={`w-5 h-5 ${getRiskColor(crop.riskLevel)}`}
                  />
                  <span className="font-semibold text-lg">{crop.crop}</span>
                </div>
                <Badge variant={getRiskVariant(crop.riskLevel)}>
                  Risk Level: {(crop.riskLevel * 100).toFixed(0)}%
                </Badge>
              </div>

              {/* Temperature Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-5 h-5 text-orange-500" />
                  <h3 className="font-semibold">Temperature Analysis</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">
                      Current Conditions
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Average:</span>
                        <span>{crop.details.temperature.current.avg}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Min:</span>
                        <span>{crop.details.temperature.current.min}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Max:</span>
                        <span>{crop.details.temperature.current.max}°C</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Ideal Range</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Minimum:</span>
                        <span>
                          {crop.details.temperature.ideal.min.min}-
                          {crop.details.temperature.ideal.min.max}°C
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Optimal:</span>
                        <span>
                          {crop.details.temperature.ideal.optimal.min}-
                          {crop.details.temperature.ideal.optimal.max}°C
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Maximum:</span>
                        <span>
                          {crop.details.temperature.ideal.max.min}-
                          {crop.details.temperature.ideal.max.max}°C
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Risk Factors</h4>
                    <div className="space-y-2">
                      {crop.details.risks.details.map((risk, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                          <span className="text-sm text-muted-foreground">
                            {risk}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <ListChecks className="w-5 h-5 text-green-500" />
                  <h3 className="font-semibold">Recommendations</h3>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <ul className="space-y-2">
                    {crop.details.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-sm text-green-600">
                            {index + 1}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {rec}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex items-start space-x-2 bg-blue-50 p-4 rounded-lg">
                <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                <div className="space-y-2">
                  <h3 className="font-medium">Additional Information</h3>
                  <p className="text-sm text-muted-foreground">
                    {crop.details.additionalInfo}
                  </p>
                </div>
              </div>

              {/* Sowing Dates */}
              <div className="flex items-center justify-between bg-green-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CalendarDays className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Sowing Period</span>
                </div>
                <div className="flex space-x-4">
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Early:{' '}
                    </span>
                    <span className="font-medium">
                      {crop.details.sowingDates.early}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Late:{' '}
                    </span>
                    <span className="font-medium">
                      {crop.details.sowingDates.late}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const ActivitiesDisplay = () => (
    <div className="space-y-6 mt-6">
      <Card className="border-t-4 border-t-blue-500">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Sprout className="w-6 h-6 text-blue-500" />
            <CardTitle>Crop Activities Management</CardTitle>
          </div>
          <CardDescription>
            Comprehensive schedule for optimal crop maintenance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Droplet className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-lg">Irrigation Schedule</h3>
              </div>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activities?.irrigation.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {item.date}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === 'Required'
                                ? 'destructive'
                                : 'secondary'
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {item.reason}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sprout className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold text-lg">
                  Fertilization Schedule
                </h3>
              </div>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="font-semibold">
                        Growth Stage
                      </TableHead>
                      <TableHead className="font-semibold">
                        Recommended Date
                      </TableHead>
                      <TableHead className="font-semibold">Nutrients</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activities?.fertilization.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {item.stage}
                        </TableCell>
                        <TableCell>{item.recommendedDate}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50">
                            {item.nutrientFocus}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="font-semibold text-lg">Pesticide Schedule</h3>
              </div>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="font-semibold">Stage</TableHead>
                      <TableHead className="font-semibold">
                        Days After Sowing
                      </TableHead>
                      <TableHead className="font-semibold">
                        Recommended Date
                      </TableHead>
                      <TableHead className="font-semibold">
                        Risk Factor
                      </TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activities?.pesticide.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {item.stage}
                        </TableCell>
                        <TableCell>{item.daysAfterSowing} days</TableCell>
                        <TableCell>{item.recommendedDate}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {item.riskFactor}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              item.status === 'Recommended'
                                ? 'bg-green-50 text-green-700'
                                : 'bg-red-50 text-red-700'
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const FarmingCalendarDisplay = () => (
    <Card className="mt-6 border-t-4 border-t-green-500">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <CalendarDays className="w-6 h-6 text-green-500" />
          <CardTitle>Smart Farming Calendar</CardTitle>
        </div>
        <CardDescription>
          Weather-optimized farming schedule and conditions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Sprout className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-lg">Crop Information</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Crop:</span>
                  <span className="font-medium">
                    {farmingCalendar?.cropDetails.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Region:</span>
                  <span className="font-medium">
                    {farmingCalendar?.cropDetails.region}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <CalendarDays className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-lg">Sowing Schedule</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Early Sowing:</span>
                  <Badge variant="secondary">
                    {farmingCalendar?.sowingPeriod.early}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Late Sowing:</span>
                  <Badge variant="secondary">
                    {farmingCalendar?.sowingPeriod.late}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Thermometer className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold text-lg">
                  Temperature Requirements
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Minimum:</span>
                  <Badge variant="outline" className="bg-blue-50">
                    {farmingCalendar?.weatherIntegration.temperatureRange.min}°C
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Optimal:</span>
                  <Badge variant="outline" className="bg-green-50">
                    {
                      farmingCalendar?.weatherIntegration.temperatureRange
                        .optimal
                    }
                    °C
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Maximum:</span>
                  <Badge variant="outline" className="bg-red-50">
                    {farmingCalendar?.weatherIntegration.temperatureRange.max}°C
                  </Badge>
                </div>
              </div>
            </div>

            <div className="bg-cyan-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Cloud className="w-5 h-5 text-cyan-600" />
                <h3 className="font-semibold text-lg">
                  Precipitation Requirements
                </h3>
              </div>
              <p className="text-muted-foreground">
                {farmingCalendar?.weatherIntegration.precipitationRequirement}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ActivityAlertsDisplay = () => (
    <Card className="mt-6 border-t-4 border-t-red-500">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          <CardTitle>Critical Farming Alerts</CardTitle>
        </div>
        <CardDescription>
          Time-sensitive alerts and recommendations for your crops
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activityAlerts?.map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                alert.severity === 'High'
                  ? 'bg-red-50 border-red-200'
                  : alert.severity === 'Medium'
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <AlertTriangle
                    className={`w-5 h-5 ${
                      alert.severity === 'High'
                        ? 'text-red-500'
                        : alert.severity === 'Medium'
                        ? 'text-yellow-500'
                        : 'text-blue-500'
                    }`}
                  />
                  <h4 className="font-semibold">{alert.type}</h4>
                </div>
                <Badge
                  variant={
                    alert.severity === 'High'
                      ? 'destructive'
                      : alert.severity === 'Medium'
                      ? 'warning'
                      : 'secondary'
                  }
                >
                  {alert.severity} Priority
                </Badge>
              </div>
              <p className="text-muted-foreground mb-2">{alert.message}</p>
              <div className="bg-white p-3 rounded-md">
                <p className="text-sm font-medium">Recommendation:</p>
                <p className="text-sm text-muted-foreground">
                  {alert.recommendation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Farming Calendar</h1>

          <div className="text-sm text-muted-foreground">
            Providing crop recommendations based on region and weather forecast
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Country</label>
              <Select
                onValueChange={handleCountryChange}
                value={selectedCountry}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries?.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Select Region</label>
              <Select
                disabled={!selectedCountry}
                onValueChange={handleRegionChange}
                value={selectedRegion}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  {regions?.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Select Crop</label>
              <Select
                disabled={!selectedRegion}
                onValueChange={handleCropChange}
                value={selectedCrop}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops?.map((crop) => (
                    <SelectItem key={crop} value={crop}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Enter City</label>
              <Input
                type="text"
                placeholder="Enter City"
                value={enteredCity}
                onChange={(e) => setEnteredCity(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <Button
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              disabled={!selectedCrop}
              onClick={viewCalendar}
            >
              <Calendar className="w-4 h-4" />
              <span>Calendar</span>
            </Button>

            <Button
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              disabled={!selectedRegion || !enteredCity}
              onClick={viewRecEnd}
            >
              <Bell className="w-4 h-4" />
              <span>Recommended / Endangered</span>
            </Button>

            <Button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              disabled={!selectedCrop || !enteredCity}
              onClick={viewCropActivities}
            >
              <Download className="w-4 h-4" />
              <span>Crop Activities</span>
            </Button>

            <Button
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              disabled={!selectedCrop || !enteredCity}
              onClick={viewFarmingCalendar}
            >
              <Download className="w-4 h-4" />
              <span>Farming Calendar</span>
            </Button>

            <Button
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
              disabled={!selectedCrop || !enteredCity}
              onClick={viewActivityAlerts}
            >
              <Download className="w-4 h-4" />
              <span>Activity Alerts</span>
            </Button>
          </div>

          {showCalendar && selectedCrop && (
            <CropCalendar
              region={selectedRegion}
              crop={selectedCrop}
              sowingPeriod={sowingPeriod}
              harvestPeriod={harvestPeriod}
            />
          )}

          {showRecEnd && <RecommendedEndangeredDisplay />}
          {showActivities && <ActivitiesDisplay />}
          {showFarmingCalendar && <FarmingCalendarDisplay />}
          {showActivityAlerts && <ActivityAlertsDisplay />}
        </div>
      </main>
    </div>
  );
}

export default FarmerCalendar;
