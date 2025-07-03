import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userRegister = useSelector(state => state.userRegister)

    const { loading, error, userInfo } = userRegister

    console.log(error)
    // Redirect
    const params = useParams()

    const redirect = params.search ? params.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [dispatch, userInfo, redirect, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }
  return (
    <FormContainer>
        <h1>Sign Up</h1>
        { message && <Message variant='danger'>{message}</Message> }
        { error && <Message variant='danger'>{error}</Message> }
        { loading && <Loader /> }
        <Form onSubmit={e => {submitHandler(e)}}>
            <Form.Group controlId='email'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Button className='my-3' type='submit' variant='primary'>
                Register
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Have an account? <Link to={ redirect ? `/login?redirect=${redirect}` : '/login' }>Login</Link>
            </Col>
        </Row>
    </FormContainer> )
}

export default RegisterScreen