import { createStore } from "vuex"; // Importing createStore function from Vuex to create a new store
import axios from "axios"; // Importing axios for making HTTP requests

// Utility function to update the localStorage with the cart data
function updateLocalStorage(cart){
    localStorage.setItem('cart', JSON.stringify(cart))
}

export default createStore({
    state: {
        products: [],
        selectedProduct: null,
        cart: [],
    },

    getters: {
        // Getter to compute the quantity of a specific product in the cart
        productQuantity: state => product => {
            // Find an item in the cart with a matching id
            const item = state.cart.find(i => i.id === product.id)
    
            // If found, return its quantity; otherwise, return null
            if (item) return item.quantity
            else return null
        },
      
        // Getter to return the entire cart
        cartItems: state => {
            return state.cart
        },
  
        // Getter to calculate the total cost of items in the cart
        cartTotal: state => {
            // Use reduce to compute the total cost
            return state.cart.reduce((total, item) => total + item.quantity * item.product_price, 0)
        }
    },

    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products;
        },

        SET_SELECTED_PRODUCT(state, product) {
            state.selectedProduct = product;
        },

        // Mutation to add a product to the cart
        addToCart(state, product){
            // Find an item in the cart with a matching id
            let item = state.cart.find(i => i.id === product.id)
      
            // If found, increment its quantity; otherwise, add a new item with quantity 1
            if (item){
              item.quantity++
            }else{
              state.cart.push({...product, quantity: 1})
            }
      
            // Update localStorage with the updated cart data
            updateLocalStorage(state.cart)
        },
  
        // Mutation to remove a product from the cart
        removeFromCart(state, product){
            // Find an item in the cart with a matching id
            let item = state.cart.find(i => i.id === product.id)
    
            // If found, decrement its quantity; if quantity reaches 1, remove the item
            if (item){
                if(item.quantity > 1){
                    item.quantity--
                }else{
                    state.cart = state.cart.filter(i => i.id !== product.id)
                }
            }
    
            // Update localStorage with the updated cart data
            updateLocalStorage(state.cart)
        },

        //Mutation to delete product from cart
        deleteFromCart(state, product) {
            // Find an item in the cart with a matching id
            const item = state.cart.find(i => i.id === product.id)
        
            // If the item is found in the cart, remove it from the cart
            if (item) {
                state.cart = state.cart.filter(i => i.id !== product.id)
            }
        
            // Update the local storage with the updated cart data
            updateLocalStorage(state.cart);
        },
  
        // Mutation to update the cart state from data stored in localStorage
        updateCartFromLocalStorage(state){
            // Retrieve the cart data from localStorage
            const cart = localStorage.getItem('cart')
    
            // If cart data exists in localStorage, parse and set it as the new cart state
            if(cart){
                state.cart = JSON.parse(cart)
            }
        }
    },

    actions: {
        async fetchProducts({ commit }) {
            const response = await axios.get(
              "http://localhost/OnlineStoreVueJsPhp/api/products/read.php"
            );
            commit("SET_PRODUCTS", response.data.data);
        },

        async fetchProductById({ commit }, id) {
            const response = await axios.get(
              `http://localhost/OnlineStoreVueJsPhp/api/products/read.php?id=${id}`
            );
            commit("SET_SELECTED_PRODUCT", response.data.data);
        },
    },
});

