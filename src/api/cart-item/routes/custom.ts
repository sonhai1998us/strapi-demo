module.exports = {
    routes: [
        {
            method: "POST",
            path:"/test",
            handler: "cart-item.testController"
        },
        {
            method: "PUT",
            path:"/put-cart_items",
            handler: "cart-item.putCartItemsController"
        }
    ]
}