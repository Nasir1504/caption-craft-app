import React, { useState } from 'react';

// styles
import './App.scss';

//imgs
import logoImg from '../src/assets/logo-img.png'

//components
import CanvasEditor from './Components/canvas-editor-comp/Canvas-Editor';
import ImgResults from './Components/img-results-comp/Img-Results';
import SearchBar from './Components/search-bar-comp/Search-Bar';


function App() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To track errors
  const [noResults, setNoResults] = useState(false); // To track if no results are found

  console.log(images.length)

  return (
    <div className="App">
      {
        !selectedImage ? (
          <div className='search-body'>

            <h1 style={{ textAlign: "center" }}>
              <span className='heading'><img className='logo-img' alt='' src={logoImg} /> Image Captioning Tool</span>
              <span className='details'><b>Nasir Aftab</b><b>nasiraftab123@gmail.com</b></span>
            </h1>

            <SearchBar
              setImages={setImages}
              SetIsLoading={setIsLoading}
              SetError={setError}
              SetNoResults={setNoResults}
              IsLoading={isLoading}
            />

            <img
              style={{
                display: images.length !== 0 && 'none'
              }}
              className='water-mark'
              alt=''
              src={logoImg}
            />

            <ImgResults
              images={images} onSelectImage={setSelectedImage}
              IsLoading={isLoading}
            />

            {/* Display errors */}
            {error && <p className="error-message">{error}</p>}

            {/* Display "No results found" note */}
            {
              noResults && !isLoading ? (
                <p className="no-results-message">No results found. Try a different query!</p>
              ) : (
                images.length === 0 && <p className="no-results-message">Search Images to Create Crafts</p>
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
