import React, { useState } from "react";

//styles
import './search-bar.scss';

import axios from "axios";

const SearchBar = ({
    setImages,
    SetIsLoading,
    SetError,
    SetNoResults,
    IsLoading
}) => {
    const [query, setQuery] = useState("");
  

    const handleSearch = async () => {
        if (!query.trim()) return; // Prevent empty search
        SetIsLoading(true);
        SetError(null); // Reset error state
        SetNoResults(false); // Reset no results state

        try {
            const API_KEY = "Ja66JikEcDCmBxr_9wGabJ0393gu8_yCTrH97IF6JgU"; // Replace with actual API key
            const response = await axios.get(`https://api.unsplash.com/search/photos`, {
                params: { query },
                headers: { Authorization: `Client-ID ${API_KEY}` },
            });

            const results = response.data.results;

            if (results.length === 0) {
                SetNoResults(true); // Mark no results found
            }

            setImages(results); // Update parent component with images
        } catch (err) {
            SetError("Something went wrong. Please try again.");
        } finally {
            SetIsLoading(false);
        }
    };

    return (
        <div className="search-bar-main-container">
            <input
                type="text"
                placeholder="Search for images..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {/* <button className="search-btn" onClick={handleSearch}>Search</button> */}
            <button
                className="search-btn"
                onClick={handleSearch}
                disabled={IsLoading || !query.trim()} // Disable during loading or empty query
            >
                Search
            </button>

        </div>
    );
};

export default SearchBar;
