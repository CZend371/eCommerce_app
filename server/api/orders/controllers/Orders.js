'use strict';
const stripe = require("stripe")("sk_test_CRuIAWSyjyaUQHkodFrYg7Jo00moMoym6Z");

/**
 * Read the documentation () to implement custom controller functions
 */

module.exports = {
    create: async ctx => {
        const {
            address,
            amount,
            brews,
            postalCode,
            token,
            city
        } = ctx.request.body;

        // Send charge to Stripe
        const charge = await stripe.charges.create({
            amount: amount * 100,
            currency: "usd",
            description: `Order ${new Date(Date.now())} - User ${ctx.state.user._id}`,
            source: token
        });
        // send to db
        const orders = await strapi.services.orders.add({
            user: ctx.state.user._id,
            address,
            amount,
            brews,
            postalCode,
            city
        });

        return orders;
    }
};
