import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Orvez User',
        email: 'admin@orvez.com.mx',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'John@orvez.com.mx',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Jane Doe',
        email: 'Jane@orvez.com.mx',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users;