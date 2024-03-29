import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => {
      return p.price;
    });
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      all_products: [...action.payload],
      filter_products: [...action.payload],
      filter: {
        ...state.filters,
        maxPrice,
        price: maxPrice,
      },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    let tempProduct = [...state.filter_products];
    if (state.sort === "price(lowest)") {
      tempProduct = tempProduct.sort((a, b) => a.price - b.price);
    }
    if (state.sort === "price(highest)") {
      tempProduct = tempProduct.sort((a, b) => b.price - a.price);
    }
    if (state.sort === "name(A-Z)") {
      tempProduct = tempProduct.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (state.sort == "name(Z-A)") {
      tempProduct = tempProduct.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filter_products: tempProduct };
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    localStorage.setItem([name], value)
    return { ...state, filter: { ...state.filter, [name]: value } };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,

      filter: {
        ...state.filter,
        company: "all",
        text: "",
        category: "all",

        price: state.filter.maxPrice,

        shipping: false,
        color: "all",
      },
    };
   
  }
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state
    let tempProduct = [...action.payload]
    const { color, price, company, category, shipping, text } = state.filter
    
    console.log(tempProduct);
    // filtering
    if (text) {
      tempProduct = tempProduct.filter((product) => {
        return product.name.toLowerCase().startsWith(text)
      })
    }
     if(category !== 'all') {
      tempProduct = tempProduct.filter((product)=>product.category === category)
    }
     if (company !== 'all') {
      tempProduct= tempProduct.filter((product)=>product.company === company)
    }
      if (color !== 'all') {
      tempProduct = tempProduct.filter((product) => {
        return product.colors.find((product)=>product===color)
      })
    } 
     if (shipping) {
      tempProduct= tempProduct.filter((product)=> product.shipping === true)
    }
    // else {
    //   // tempProduct=[...action.payload]
    // }
    return { ...state, filter_products: tempProduct }
    
   }
  // return state
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
