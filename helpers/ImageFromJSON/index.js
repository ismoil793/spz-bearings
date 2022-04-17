import React from 'react';
import keys from "../../api-spz/constants";

const ImageFromJSON = ({str, index}) => {
   const parsedJson = JSON.parse(str || null)
   let url = ""
   if (Array.isArray(parsedJson) && parsedJson[index]) {
      url = parsedJson[index].name
   }
   if (!url) return null
   const hasMultiplePictures = !!parsedJson[1]?.name
   return <div className={hasMultiplePictures ? 'col-lg-6' : 'col-lg-12'}>
      <img className="img-fluid" src={`${keys.BASE_URL}/${url}`} alt=""/>
   </div>
};

export default ImageFromJSON;