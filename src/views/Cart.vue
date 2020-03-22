<template>
    <div class="container" style="margin: 100px auto;">
        <div class="card">
            <div class="card-header">
                <p class="card-header-title">Cart</p>
            </div>
            <div class="card-content">
                <div class="content">
                    <!-- <br> -->
                    <div class="table-container" style="overflow-x: auto">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Product Price</th>
                                    <th>Product Category</th>
                                    <th>Quantity</th>
                                    <th>Product Total Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody v-if="$root.cart && $root.cart.length">
                                <tr v-for="(cart, idx) in $root.cart" :key="idx">
                                    <td>{{ ++idx }}</td>
                                    <td>
                                        <router-link :to="{name: 'product', params: {id: cart.product.slug}}">
                                            {{ cart.product.name }}
                                        </router-link>
                                    </td>
                                    <td>
                                        {{ cart.product.price }} USD
                                    </td>
                                    <td>
                                        <router-link :to="{name: 'category', params: {id: cart.product.category.id}}">
                                            {{ cart.product.category.name }}
                                        </router-link>
                                    </td>
                                    <td>
                                        <QuantityUpdateModule :cart="cart" />
                                    </td>
                                    <td>
                                        {{ cart.quantity * cart.product.price }} USD
                                    </td>
                                    <td><a @click.prevent="$root.removeFromCart($event, cart)">Remove</a></td>
                                </tr>
                                <tr>
                                    <td colspan="5"></td>
                                    <td class="has-text-right">
                                        <b>Grand Total</b>: 
                                    </td>
                                    <td> {{ totalPrice }} USD</td>
                                </tr>
                                <tr>
                                    <td colspan="6" class="has-text-right">
                                        <a @click.prevent="$root.deleteCart" class="button is-danger">Delete Cart</a>
                                    </td>
                                    <td>
                                        <a v-if="$root.isLoggedIn" @click.prevent="$root.placeOrder" class="button is-primary">Place Order</a>
                                        <router-link v-else :to="{name: 'login'}" class="button is-primary">Login &amp; Place Order</router-link>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <th colspan="5">No product was found!</th >
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const QuantityUpdateModule = () => import('../components/QuantityUpdateModule')

export default {
    data() {
        return {
            form: {
                handler: []
            }
        }
    },
    computed: {
        totalPrice() {
            if (this.$root.cart) {
                let price = 0
                this.$root.cart.forEach(cart => {
                    let p = cart.quantity * cart.product.price
                    price += p
                })
                return price
            }
            return 0
        }
    },
    components: {
        QuantityUpdateModule
    }
}
</script>
