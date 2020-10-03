<template>
    <div id="home">
        <Slideshow v-if="featured_products && featured_products.length" :products="featured_products" :cart="[]" />
        <div class="container" v-if="categoriesWithProducts && categoriesWithProducts.length">
            <div v-for="category in categoriesWithProducts.slice(0, 3)" :key="category.id" style="margin: 50px auto;">
                <div class="container">
                    <div class="columns">
                        <div class="column is-10">
                            <h2 class="subtitle is-4">Products in @{{ category.name }}</h2>
                        </div>
                        <div class="column is-2">
                            <router-link v-if="productsInCategory(category.id).length > 3" :to="{name: 'category', params: {id: category.id}}">See all</router-link>
                        </div>
                    </div>
                </div>
                <br>

                <div class="container">
                    <div class="columns is-multiline">
                        <div class="column is-4" v-for="product in productsInCategory(category.id).slice(0, 3)" :key="product.id">
                            <Product :product="product" />
                        </div>
                    </div>
                </div>
                <br><hr><br>
            </div>
        </div>
    </div>
</template>

<script>
const Product = () => import('../components/Product')
const Slideshow = () => import('../components/Slideshow')
export default {
    name: 'home',
    components: {
        Product,
        Slideshow
    },

    beforeCreate() {
      this.$root.setTitle('Home')
      this.$store.dispatch('Product/get_featured_products')
    },

    computed: {
      categories() {
        return this.$store.getters['Category/categories']
      },

      featured_products () {
        return this.$store.getters['Product/featured_products']
      },

      products () {
        return this.$store.getters['Product/products']
      },

      categoriesWithProducts() {
        let rtn = this.categories.filter(category => this.productsInCategory(category.id).length > 0)
        console.log(rtn)
        return rtn
      }
    },

    methods: {
      productsInCategory(category_id) {
        return this.products.filter(product => product.category.id == category_id)
      },

    }
}
</script>
