import React from 'react'
import './Preloader.css'
          
export default function Preloader({ isPreloader }) {
    return (
        <div className={!isPreloader ? "preloader preloader-hidden" : "preloader"}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
}
