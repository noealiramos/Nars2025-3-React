import PropTypes from "prop-types";
import {useEffect,useState} from "react";
import "./ALbumCarousel.css"


export default function ALbumCarousel({isOpen, almbum, onClose}){

    return (
        <div className="carousel-modal-overlay" onClick={onClose}>
            <div className ="carousel-modal" >
                {/*header del modal */}
                <div className ="carousel-header">
                    <div className="carousel-album-info">
                        <h2 className="carousel-album-title">
                        <span className ="carousel-play-icon">🛸</span>
                        {album.title}
                        </h2>
                        <p className="carousel-album-description">{album.description}</p>

                    </div>
                </div>
            </div>
        </div>
    );

}