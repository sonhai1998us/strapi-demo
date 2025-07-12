/**
 * topping controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::cart-item.cart-item', ({strapi}) => ({
    testController: async (ctx, next) => {
        ctx.body = "Hello World"
    },
    putCartItemsController: async (ctx, next) => {
        if(ctx.request.body.documentIds){
            const documentIds = ctx.request.body.documentIds;
            let _findCartItems = await strapi.db.query('api::cart-item.cart-item').findMany({
                where: {
                    $and: [
                        {
                            documentId: {
                                $in: documentIds,
                            }
                        },
                        {
                            publishedAt: { 
                                $notNull: true,
                            },
                        },
                    ]
                },
              });
            if(_findCartItems && _findCartItems.length > 0){
                await strapi.db.query("api::cart-item.cart-item").updateMany({
                    where: {
                        documentId: {
                            $in: documentIds,
                        },
                    },
                    data:{
                        isOrdered: true
                    }
                  });
                  
            ctx.body = "Success"
            }
        }else{
            ctx.body = "Failed"
        }
    }
}));
