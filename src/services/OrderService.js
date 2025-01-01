const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel");
const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user, isPaid, paidAt } = newOrder
        try {
            const promises = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate({
                    _id: order.product,
                    countInStock: { $gte: order.amount }
                },
                    {
                        $inc: {
                            countInStock: -order.amount,
                            selled: +order.amount
                        }
                    },

                    { new: true }
                )
                if (productData) {
                    const createdOrder = await Order.create({
                        orderItems,
                        shippingAddress: {
                            fullName,
                            address,
                            city,
                            phone,
                        },
                        paymentMethod,
                        itemsPrice,
                        shippingPrice,
                        totalPrice,
                        user: user,
                        isPaid, 
                        paidAt
                    })
                    if (createdOrder) {
                        return {
                            status: 'Ok',
                            message: 'SUCCESS',
                        }
                    }
                } else {
                    return {
                        status: 'Ok',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results.filter((item) => item.id)
            if (newData.length) {
                resolve({
                    status: 'ERR',
                    message: `San pham voi id${newData.join(',')} khong du hang`
                })
            }
            resolve({
                status: 'Ok',
                message: 'Success'
            })
        } catch (e) {
            reject(e)

        }
    })
}
const getOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id
            })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Sucess',
                data: order,
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getOrderDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id
            })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Sucess',
                data: order,
            })
        } catch (e) {
            reject(e)
        }
    })
}
const cancelOrderDetails = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = []
            const promises = data.map(async (order) => {
                const productData = await Product.findOneAndUpdate({
                    _id: order.product,
                    selled: { $gte: order.amount }
                },
                    {
                        $inc: {
                            countInStock: +order.amount,
                            selled: -order.amount
                        }
                    },

                    { new: true }
                )
                if (productData) {
                    order = await Order.findByIdAndDelete(id)
                    if (order === null) {
                        resolve({
                            status: 'ERR',
                            message: 'The order is not defined'
                        })
                    }
                } else {
                    return {
                        status: 'Ok',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results.filter((item) => item.id)
            if (newData.length) {
                resolve({
                    status: 'ERR',
                    message: `San pham voi id${newData.join(',')} khong tồn tại`
                })
            }
            resolve({
                status: 'Ok',
                message: 'Success',
                data: order
            })

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createOrder,
    getOrderDetails,
    getOrderDetail,
    cancelOrderDetails





}