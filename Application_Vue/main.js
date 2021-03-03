Vue.component("product-details", {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>`
    ,

})

Vue.component("product", {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">

            <div class="product-image">
                <img v-bind:src="image" v-bind:alt="altText">
            </div>

            <div class="product-info">
                <h1>{{title}}</h1>
                <p v-if="inventory >= 10">In Stock</p>
                <p v-else-if="inventory > 0 && inventory < 10">Almost sold out</p>
                <p v-else :class="{pStyle: inventory === 0}">Out Stock</p>
                <p>{{description}}</p>
                <p>More products like this, click <a v-bind:href="linkImage" target="blank">here</a>.</p>
                <p v-if="sale"><strong>On SALE</strong></p>
                <p v-else><strong>Out SALE</strong></p>

                <p>Shipping: {{shipping}}</p>


                <h4>ID: {{id}}</h4>

                <h4>Materials</h4>

                <product-details :details="details"></product-details>

                <h4>Sizes</h4>

                <ul>
                    <li v-for="size in sizes">{{size}}</li>
                </ul>

                <h4>Quantity: </h4>

                <div v-for="(variant , index) in variants" key="variant.variantID" class="color-box"
                    :style="{backgroundColor: variant.variantColor}" @mouseover="updateProduct(index)">
                </div>

                <button v-on:click="addToCart" :disabled="inventory===0" :class="{disabledButton: inventory === 0}">Add
                    to Cart</button>
                <button v-on:click="deleteToCart">Delete to Cart</button>

                <product-review @review-submitted="addReview"></product-review>
            
                <div>
                    <h2>Reviews</h2>
                    <p v-if="!reviews.length">There are no reviews yet.</p>
                    <ul>
                        <li v-for="review in reviews">
                        <p>{{review.name}}</p>
                        <p>Rating: {{review.rating}}</p>
                        <p>Review: {{review.review}}</p>
                        <p>Recommend: {{review.recommend}}</p>
                        </li> 
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            brand: "Vue Mastery",
            product: 'Socks',
            selectedVariant: 0,
            description: 'A pair of warm, fuzzy socks.',
            altText: 'A pair of socks',
            linkImage: 'https://www.happysocks.com/gl/',
            sale: false,
            details: ["80% cotton", "20% polyester", "Gender-natural"],
            sizes: ["P", "M", "G", "GG", "XG"],
            variants: [
                {
                    variantID: 2234,
                    variantColor: "green",
                    variantImage: './images/vmSocks-green-onWhite.jpg',
                    variantQuantity: 20
                },
                {
                    variantID: 2235,
                    variantColor: "blue",
                    variantImage: './images/vmSocks-blue-onWhite.jpg',
                    variantQuantity: 20
                }
            ],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit("add-to-cart", this.variants[this.selectedVariant].variantID)
        },
        deleteToCart() {
            this.$emit("delete-to-cart", this.variants[this.selectedVariant].variantID)
        },
        updateProduct(index) {
            this.selectedVariant = index
            // console.log(index)
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        id() {
            return this.variants[this.selectedVariant].variantID
        },
        inventory() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    }
})

Vue.component("product-review", {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <p v-if="errors.length">
                <b> Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{error}}</li>
                </ul>
            </p>
        
            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name"></input>
            </p>
            <p>
                <label for="review">Review:</label>
                <textarea id="review" v-model="review" ></textarea>
            </p>
            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>

            <p>Would you recommend this product?</p>

            <label>
                Yes
                <input type="radio" value="Yes" v-model="recommend">
            </label>
            <label>
                No
                <input type="radio" value="No" v-model="recommend">
            </label>

            <p>
                <input type="submit" value="Submit"></input>
            </p>
        </form>

    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating && this.recommend) {

                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                this.$emit("review-submitted", productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            }
            else {
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
                if (!this.recommend) this.errors.push("Recommend required.")
            }
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: [],
    },
    methods: {
        updateAddCart(id) {
            this.cart.push(id)
        },
        updateDeleteCart(id) {
            for (var i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }

        }
    }

})