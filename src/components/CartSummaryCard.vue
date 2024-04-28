<template>
    <div v-if="cartTotal != 0.00" class="card cartHasItem">
        <div class="card-header">
            <h6>Cart Total</h6>
        </div>
        <div class="card-body">
            <h5 class="card-title">${{ cartTotal }}</h5>
            <p class="card-text">Proceed to checkout and make payment.</p>
            <button class="btn btn-dark">Checkout</button>
        </div>
    </div>
    <div v-else class="card cartHasNoItem">
        <div class="card-header">
            <h6>Cart</h6>
        </div>
        <div class="card-body">
            <p class="card-text">Your cart is empty.</p>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from "vuex";
import { formatPrice } from '@/utils/formatters';

const store = useStore();

onMounted(() => {
    store.commit('updateCartFromLocalStorage');//to ensure that the cart data is loaded from localStorage when the component is mounted
});

const cartTotal = computed(() => formatPrice(store.getters.cartTotal));

</script>

<style>

</style>