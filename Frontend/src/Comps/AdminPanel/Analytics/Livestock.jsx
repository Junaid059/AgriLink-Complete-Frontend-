// import React, { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import axios from 'axios';

// function Livestock() {
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [livestock, setLivestock] = useState('goat');
//   const [livestockData, setLivestockData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSearchClick = () => {
//     if (searchQuery.trim() === '') return; 
//     setLivestock(searchQuery); 
//     setSearchQuery('');
//   };

//   useEffect(() => {
//     const fetchLivestock=async()=>{
//       try{
//         setLoading(true);
//         const response = await axios.get(`http://localhost:3000/farmGhar/listings?searchString=goat`,{timeout:30000});
//         if(response.status===200){
//           setLivestockData(response.data);
//         }
//       }
//       catch(err){
//         console.error(err);
//       }
//     };
//     fetchLivestock();
//   }, [livestock]);

//   return (
//     <div className="space-y-8 p-4">
//       <div className="flex flex-row justify-between items-center gap-x-4">
//         <Input placeholder="Search Livestock" value={searchQuery} onChange={handleSearch} />
//         <Button onClick={handleSearchClick} disabled={loading}>
//           {loading ? 'Searching...' : 'Search'}
//         </Button>
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Image</TableHead>
//               <TableHead>Category</TableHead>
//               <TableHead>Age</TableHead>
//               <TableHead>Description</TableHead>
//               <TableHead>Price</TableHead>
//               <TableHead>City</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {livestockData.length>0 ? livestockData.map((record, index) => (
//               <TableRow key={index}>
//                 <TableCell><img src={record.img[0]}/></TableCell>
//                 <TableCell>{record.category}</TableCell>
//                 <TableCell>{record.age}</TableCell>
//                 <TableCell>{record.description}</TableCell>
//                 <TableCell>{record.price}</TableCell>
//                 <TableCell>{record.district}</TableCell>
//               </TableRow>
//             )) : <TableRow><TableCell colSpan={6}>No data found</TableCell></TableRow>}

//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }

// export default Livestock;



import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import axios from 'axios';

function Livestock() {
  const [livestockData, setLivestockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchLivestock = async (query) => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`http://localhost:3000/farmGhar/listings?searchString=goat`,
        { timeout: 30000 });
      
      if (response.status === 200 && response.data) {
        setLivestockData(response.data);
      }
    } catch (err) {
      setError('Failed to fetch livestock data. Please try again.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLivestock('goat');
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() === '') return;
    setCurrentPage(1); // Reset to first page on new search
    fetchLivestock(searchQuery.trim());
  };

  // Handle "Enter" key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = livestockData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(livestockData.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="space-y-8 p-4">
      <div className="flex flex-row justify-between items-center gap-x-4">
        <Input
          placeholder="Search Livestock"
          value={searchQuery}
          onChange={handleSearch}
          onKeyPress={handleKeyPress}
          className="max-w-sm"
        />
        <Button onClick={handleSearchClick} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {error && (
        <div className="text-red-500 p-2 rounded bg-red-50">
          {error}
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>City</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : currentItems.length > 0 ? (
              currentItems.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img 
                      src={record.img[0]} 
                      alt={record.category}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>{record.category}</TableCell>
                  <TableCell>{record.age}</TableCell>
                  <TableCell>{record.description}</TableCell>
                  <TableCell>{record.price}</TableCell>
                  <TableCell>{record.district}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {livestockData.length > 0 && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index + 1}
              variant={currentPage === index + 1 ? "default" : "outline"}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          
          <Button
            variant="outline"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default Livestock;