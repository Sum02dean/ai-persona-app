import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
const IndexPage = () => {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter(); // Initialize useRouter
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Redirect the user to the new URL
    router.push(`/create-image-from-name/${encodeURIComponent(inputValue.replace(/ /g, '-'))}`);
  };

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h1>Enter a name to view or create a persona</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange} 
          placeholder="Enter a first and last name..." 
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default IndexPage;
