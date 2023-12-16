// pages/create-image-from-name/[name].js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const CreateImageFromName = () => {
  const router = useRouter();
  const { name } = router.query; // Extracting the dynamic segment 'name'
  const displayName = formatName(name);

  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (name) {
      fetchImage(name);
    }
  }, [name]);

  const fetchImage = async (name) => {
    setIsLoading(true);
    try {
      const url = `/api/create-image-from-name/${name}`;

      const response = await fetch(url);
      const data = await response.json();
      setImageUrl(data.image_url); // Assuming the API returns an object with a 'url' property
    } catch (error) {
      console.error('Error fetching image:', error);
    }
    setIsLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Redirect the user to the new URL
    router.push(`/create-image-from-name/${encodeURIComponent(inputValue.replace(/ /g, '-'))}`);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h1>{displayName}</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        imageUrl && <img src={imageUrl} alt={`Image for ${displayName}`} />
      )
      }
      <p>Refresh the page to regenerate</p>
      <h1>Try Another?</h1>
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

function formatName(str) {
    const nameWithSpaces = str ? str.replace(/-/g, ' ') : '';

    return nameWithSpaces
    .split('-')
    .map(segment => segment
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
    )
    .join(' ');
  }

export default CreateImageFromName;
