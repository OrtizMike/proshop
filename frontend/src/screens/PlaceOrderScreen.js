import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector((state) => state.cart)
    const {address, city, postalCode, country} = cart.shippingAddress

    //Calculate prices
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)

    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10 // Free shipping for orders over $100
    cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2)) // 15% tax
    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)

    const orderCreate = useSelector((state) => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if(success) {
            navigate(`/order/${order._id}`)
        }
    }, [success, order, navigate])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }

  return (
    <>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address:</strong>
                            {address}, {city}, {postalCode}, {country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method:</strong>
                            {cart.paymentMethod}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? (
                            <Message>Your cart is empty</Message>
                        ) : (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                {item.name}
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = ${item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-grid'>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item className='d-grid'>
                            <Button
                                type='button'
                                className='btn-block'
                                onClick={placeOrderHandler}
                                >
                                Place Order
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default PlaceOrderScreen