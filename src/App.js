import React, { useState } from 'react';

// styles
import './App.scss';

//components
import CanvasEditor from './Components/Canvas-Editor';
import ImgResults from './Components/Img-Results';
import SearchBar from './Components/Search-Bar';

function App() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To track errors
  const [noResults, setNoResults] = useState(false); // To track if no results are found

  console.log(images.length)

  return (
    <div className="App">
      {!selectedImage ? (
        <div className='search-body'>
          <h1 style={{ textAlign: "center" }}>
            <span className='heading'>Image Captioning Tool</span>
            <span className='details'><b>Nasir Aftab</b><b>nasiraftab123@gmail.com</b></span>
          </h1>
          <SearchBar
            setImages={setImages}
            SetIsLoading={setIsLoading}
            SetError={setError}
            SetNoResults={setNoResults}
            IsLoading={isLoading}
          />
          <h3
            style={{
              display: images.length !== 0 && 'none'
            }}
            className='before-search-text'
          >Search Images to Create Crafts</h3>
          <ImgResults
            images={images} onSelectImage={setSelectedImage}
            IsLoading={isLoading}
          />

          {/* Display errors */}
          {error && <p className="error-message">{error}</p>}

          {/* Display "No results found" note */}
          {
            noResults && !isLoading && (
              <p className="no-results-message">No results found. Try a different query!</p>
            )
          }

        </div>
      ) : (
        <CanvasEditor
          image={selectedImage}
          onBack={() => setSelectedImage(null)} // Back to search
        />
      )}
    </div>
  );
}

export default App;
