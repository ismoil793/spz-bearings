import * as acions from "../actionTypes";
import {fetchProductCategories} from '../../api/categories';

export const fetchSetProductCategories = () => {
  return dispatch => {
    fetchProductCategories()
      .then(response => {
        const categories = response.data.data, tempArr = [];
        
        categories.forEach(category => {
          tempArr.push({ id: category.id, name: category.name, slug: category.slug })
          if(category.childs.length) {
            category.childs.forEach(child => {
              tempArr.push({ id: child.id, name: child.name, parentId: category.id, slug: child.slug })
            })
          }
        })
        dispatch(setProductCategories(categories, tempArr));
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export const setProductCategories = (productCatogories, flattenedCategories) => ({
  type: acions.FETCH_SET_PRODUCT_CATEGORIES,
  productCatogories: productCatogories, 
  flattenedCategories: flattenedCategories, 
});

export const resetProductCategories = () => ({
  type: acions.RESET_PRODUCT_CATEGORIES
});