<template>
    <div class="card h-100 shadow-sm border-0">
        <img class="card-img-top" :src="'/src/assets/images/productImages/' + product.product_image" alt="">
        <div class="card-body">
            <h3 class="card-title">{{ product.product_name }}</h3>
            <h5 class="card-title">${{ product.product_price.toFixed(2)}}</h5>
            <p class="card-text">{{ truncateText(product.product_description, 20) }}</p>
            <p class="card-text text-muted" style="font-size: 13px;">{{ product.product_category }}</p>
            <button class="btn btn-secondary btn-sm" @click="$emit('view-product', product)">View Product</button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    product: Object
})

const emit = defineEmits(['view-product']);

const truncateText = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...';
    } else {
        return text;
    }
}
</script>