import React from "react";

//styles
import './img-results.scss';

// imgs
import loadingGif from '../../assets/loading-gif.gif';

const ImgResults = ({ images, onSelectImage, IsLoading }) => {

    return (
        <div className="img-results-main-container" >
            {
                IsLoading ? <img className="loading-gif" src={loadingGif} alt="" /> :

                    images.map((image) => {

                        // console.log(image.alt_description)

                        return (

                            <div
                                className="img-container"
                                key={image.id} style={{ textAlign: "center" }}>
                                <img
                                    className="search-results"
                                    src={image.urls.small}
                                    alt={image.alt_description}
                                />
                                <button

                                    className="add-caption-btn"
                                    onClick={() => onSelectImage(image.urls.full)}

                                >
                                    Add Captions
                                </button>
                                <p className="description">
                                    <span className="blur-span" />
                                    <span className="text-span">
                                        {image.alt_description}
                                    </span>
                                </p>
                            </div>
                        )
                    }
                    )}
        </div >
    );
};

export default ImgResults;
