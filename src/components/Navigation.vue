<template>
    <nav class="navbar is-fixed-top">
        <div class="container is-fluid">
            <div class="navbar-brand">
                <router-link class="navbar-item" :to="{name: 'home'}">
                    {{ $root.name }}
                </router-link>
                <div class="navbar-burger burger has-text-light" @click.prevent="function() {$root.navburger = !$root.navburger}" data-target="navbarExampleTransparentExample">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div id="navbarExampleTransparentExample" class="navbar-menu" :class="{'is-active': $root.navburger}">

                <div class="navbar-start">
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            Products
                        </a>
                        <div class="navbar-dropdown">
                            <router-link class="navbar-item" v-for="category in parentCategories" :key="category.id" :to="{name: 'category', params: {id: category.id}}">{{ category.name }}</router-link>
                            <div class=" nested navbar-item  dropdown" v-for="category in parentCategoriesWithSubCategories" :key="category.id">
                                    <!-- <a @click.prevent="function(){}" class="navbar-link">{{ category.name }}</a> -->
                                    <div class="dropdown-trigger">
                                        <router-link :to="{name: 'category', params: {id: category.id}}" class="navbar-item">
                                            <span>{{ category.name }}</span>
                                            <span class="icon is-small">
                                                <i class="fas fa-angle-right" aria-hidden="true"></i>
                                            </span>
                                        </router-link>
                                    </div>
                                    <div class="dropdown-menu" role="menu">
                                        <div class="dropdown-content">
                                            <router-link v-for="subcat in category.subcategories" :key="subcat.id" :to="{name: 'category', params: {id: subcat.id}}" class="navbar-item">{{ subcat.name }}</router-link>
                                        </div>
                                        <!-- <hr class="navbar-divider"> -->
                                        <!-- <router-link :to="{name: 'category', params: {id: category.id}}" class="navbar-item">{{ category.name }}</router-link> -->
                                    </div>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>

                <div class="navbar-end" v-if="$root.isLoggedIn">
                    <!-- <nav class="navbar" role="navigation" aria-label="dropdown navigation"> -->
                        <router-link class="navbar-item" :to="{name: 'cart'}">
                            <i class="fas fa-shopping-basket"></i>&nbsp;Cart&nbsp;<span class="tag">{{  $root.cart.length }}</span>
                        </router-link>
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a @click.prevent="function(){}" class="navbar-link">{{ $root.currentUser.name }}</a>
                            <div class="navbar-dropdown">
                                <router-link :to="{name: 'dashboard'}" class="navbar-item">Dashboard</router-link>
                                <router-link :to="{name: 'logout'}" class="navbar-item">Logout</router-link>
                                <!-- <a @click.prevent="$root.logout" class="navbar-item">Logout</a> -->
                            </div>
                        </div>
                    <!-- </nav> -->
                </div>
                <div class="navbar-end" v-else>
                    <router-link class="navbar-item" :to="{name: 'cart'}">
                        <i class="fas fa-shopping-basket"></i>&nbsp;Cart&nbsp;<span class="tag">{{  $root.cart.length }}</span>
                    </router-link>
                    <router-link :to="{name: 'login'}" class="navbar-item">Login</router-link>
                    <router-link :to="{name: 'register'}" class="navbar-item">Register</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        props: ['categories'],
        data() {
            return {
                //$root.navburger: false,
                // categories: null,
            }
        },
        computed: {
            parentCategories: function() {
                if (this.categories && this.categories.length) {
                    return this.categories.filter(function(category) {
                        return !category.parent && !category.subcategories.length
                    })
                }
                return null;
            },
            parentCategoriesWithSubCategories: function() {
                if (this.categories && this.categories.length) {
                    return this.categories.filter(function(category) {
                        return !category.parent && category.subcategories.length
                    })
                }
                return null;
            }
        }
    }
</script>

<style scoped>
.navbar {
    background-color: var(--app-color);
}
.navbar-item, .navbar-link {
    transition: all 320ms;
    color: var(--app-text-color);
}
.navbar-dropdown .navbar-item, .navbar-dropdown .navbar-link {
    color: initial
}
/* .navbar-item:hover, .navbar-link:hover, .navbar-item:focus, .navbar-link:focus, .router-link-exact-active, .navbar-item.has-dropdown:hover, .navbar-item.has-dropdown:focus  {
    transition: all 320ms;
    color: var(--app-text-accent-color);
    background-color: var(--app-accent-color);
} */

@media screen and (max-width: 1023px) {
    .navbar-menu {
        background-color: var(--app-color);
    }
    .navbar-item, .navbar-link, .navbar-dropdown .navbar-item, .navbar-dropdown .navbar-link {
        transition: all 320ms;
        color: var(--app-text-color);
    }
    .navbar-item:hover, .navbar-link:hover, .navbar-item:focus, .navbar-link:focus, .router-link-exact-active, .navbar-item.has-dropdown:hover, .navbar-item.has-dropdown:focus, .navbar-dropdown .navbar-item:hover, .navbar-dropdown .navbar-link:hover  {
        transition: all 320ms;
        color: var(--app-text-accent-color);
        background-color: var(--app-accent-color);
    }

}
/** Dropdown CSS */
.nested  {
    padding: 0;
}
.nested.dropdown:hover > .dropdown-menu {
  display: block;
}
.nested.dropdown .dropdown-menu {
  top: -15px;
  margin-left: 100%;
  max-height: calc(100vh - 200px);
overflow-y: auto;
}
.dropdown-trigger {
    width: -webkit-fill-available;
}
.nested.dropdown .dropdown-trigger button::after {
  content: "⦠";
}
.nested.dropdown .dropdown-trigger button {
  padding: 0px 0px;
  border: 0px;
  font-size: 14px;
  font-weight: 400;
  height: 2em;
}

</style>
