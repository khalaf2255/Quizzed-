import React, { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

import { addUsers, getUsers } from '../services/apiUser'
import UserItem from '../components/UserItem';
import FormAddUSer from '../components/FormAddUSer';

export default function Users() {
  const [showForm, setshowForm] = useState(false)

  const { data: users, error: err, isLoading } = useQuery({
    queryKey: ['owner'],
    queryFn: getUsers
  })




  if (isLoading) return <h1>loading...</h1>
  return (
    <div>
      <div className='item' style={{ background: 'gray' }}>
        <p>image</p>
        <p>name</p>
        <p>email</p>
        <p>password</p>
        <p>status</p>
        <p>contsols</p>
      </div>
      {users?.map(user => <UserItem key={user.id} user={user} />)}
      <button onClick={() => setshowForm(showForm => !showForm)}>Add User</button>
      {showForm && <FormAddUSer  />}
    </div>
  )
}
