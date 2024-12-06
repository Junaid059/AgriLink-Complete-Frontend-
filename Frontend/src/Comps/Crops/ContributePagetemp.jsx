import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDropzone } from 'react-dropzone';

function ContributePage() {
  // States for file upload and labeling process
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [labels, setLabels] = useState({});
  const [validatedLabels, setValidatedLabels] = useState([]);

  // Handle file upload with react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
    },
  });

  // Handle labeling of images
  const handleLabeling = (file, label) => {
    setLabels({ ...labels, [file.name]: label });
  };

  // Handle validation of labeled images
  const handleValidation = () => {
    // This can be expanded based on validation rules
    setValidatedLabels(Object.keys(labels));
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-green-700">
        Contribute to Dataset
      </h1>

      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList>
          <TabsTrigger
            value="upload"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            Upload Images
          </TabsTrigger>
          <TabsTrigger
            value="label"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            Label Images
          </TabsTrigger>
          <TabsTrigger
            value="validate"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            Validate Labels
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <div
            {...getRootProps()}
            className="border-2 border-dashed p-4 text-center"
          >
            <input {...getInputProps()} />
            <p className="text-lg">
              Drag & drop some images here, or click to select files
            </p>
            {uploadedFiles.length > 0 && (
              <div className="mt-4">
                <h2 className="font-bold">Uploaded Files:</h2>
                <ul>
                  {uploadedFiles.map((file, index) => (
                    <li key={index} className="text-sm">
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="label">
          <div className="space-y-4">
            {uploadedFiles.length === 0 ? (
              <p className="text-red-500">No images uploaded yet.</p>
            ) : (
              uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="h-24"
                  />
                  <input
                    type="text"
                    placeholder="Enter label"
                    className="border p-2"
                    onChange={(e) => handleLabeling(file, e.target.value)}
                  />
                </div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="validate">
          <div>
            <h3 className="font-bold">Validated Images:</h3>
            <button
              onClick={handleValidation}
              className="bg-green-500 text-white p-2 rounded"
            >
              Validate Labels
            </button>
            <ul className="mt-4">
              {validatedLabels.length === 0 ? (
                <p>No labels validated yet.</p>
              ) : (
                validatedLabels.map((fileName, index) => (
                  <li key={index} className="text-sm">
                    {fileName}: {labels[fileName]}
                  </li>
                ))
              )}
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ContributePage;
