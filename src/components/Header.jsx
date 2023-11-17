import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <ul>
        <Link to='/'  >Home</Link>
        <Link to='about'  >About</Link>
        <Link to='users'  >Users</Link>
    </ul>
  )
}
