import * as acions from "../actionTypes";
import { fetchAssemblyFeatures } from '../api';

export const fetchSetAssemblyFeatures = () => {
  return dispatch => {
    fetchAssemblyFeatures()
      .then(response => {
        const features = response.data.data, tempArr = [];
        
        features.forEach(feature => {
          tempArr.push({ id: feature.id, name: feature.name })
        })
        dispatch(setAssemblyFeatures(tempArr));
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export const setAssemblyFeatures = (assemblyFeatures) => ({
  type: acions.FETCH_SET_ASSEMBLY_FEATURES,
  assemblyFeatures: assemblyFeatures, 
});

export const resetAssemblyFeatures = () => ({
  type: acions.RESET_ASSEMBLY_FEATURES
});