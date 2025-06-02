import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const woocommerce = new WooCommerceRestApi({
    url: process.env.BACKEND_URL || '',
    consumerKey: process.env.CONSUMER_KEY || '',
    consumerSecret: process.env.CONSUMER_SECRET || '',
    version: "wc/v3"
});

export default woocommerce;