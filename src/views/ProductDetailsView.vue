<template>
    <div class="container mt-5 mb-5">
        <div class="mb-5">
            <RouterLink to="/products">Back to products</RouterLink>
        </div>

        <div v-if="isLoading">Loading...</div>
        <div v-else>
        <div class="row">
            <div class="col-md-4">
                <img class="img-fluid rounded-4 shadow-sm" :src="'/src/assets/images/productImages/' + selectedProduct.product_image" :alt="selectedProduct.product_image">
            </div>
            <div class="col-md-8">
                <h4>{{ selectedProduct.product_name }}</h4>
                <h1>${{ selectedProduct.product_price.toFixed(2) }}</h1>
                <p class="text-muted">{{ selectedProduct.product_category }}</p>
                <p>{{ selectedProduct.product_description }}</p>
                <button class="btn btn-dark btn-sm" @click="addToCart()">Add to cart</button> <span></span>
                <button class="btn btn-danger btn-sm" @click="removeFromCart()" v-if="productQuantity">-</button> <span></span>
                <p v-if="productQuantity" class="mt-3">Quantity: {{ productQuantity }}</p>
                <div v-if="productQuantity">
                    <RouterLink to="/cart">View cart</RouterLink>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from "vuex";
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();
const isLoading = ref(true);

onMounted(async () => {
    // Load cart data from localStorage
    store.commit('updateCartFromLocalStorage');//to ensure that the cart data is loaded from localStorage when the component is mounted

    await store.dispatch('fetchProductById', route.params.id);
    isLoading.value = false;
});

const selectedProduct = computed(() => store.state.selectedProduct);

// Define the addToCart function
const addToCart = async () => {
    await store.commit('addToCart', selectedProduct.value);
};

// Define the removeFromCart function
const removeFromCart = async () => {
    await store.commit('removeFromCart', selectedProduct.value);
};

const productQuantity = computed(() => store.getters.productQuantity(selectedProduct.value));

</script>