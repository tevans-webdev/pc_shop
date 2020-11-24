import bc from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@shit.com',
    password: bc.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'Dick Shitson',
    email: 'dick@balls.com',
    password: bc.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: 'Anita Handi',
    email: 'anitahandjob@handys.com',
    password: bc.hashSync('123456', 10),
    isAdmin: false
  }
]

export default users
