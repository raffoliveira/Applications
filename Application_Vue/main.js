var app = new Vue({
    el: '#app',
    data: {
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
                variantQuantity: 0
            }
        ],
        cart: 0,
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        deleteToCart() {
            if (this.cart <= 0) {
                this.cart = 0
            }
            else {
                this.cart -= 1
            }
        },
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
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
        }

    }
})