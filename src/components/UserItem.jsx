import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { deketetUsers } from '../services/apiUser';
import toast from 'react-hot-toast';
import FormAddUSer from './FormAddUSer';

export default function UserItem({ user }) {
    const [showForm, setShowForm] = useState(false)
    const queryClient = useQueryClient();
    const { mutate: deleteUser, error, isLoading } = useMutation({
        mutationFn: (id) => deketetUsers(id),
        onSuccess: () => {

            toast.success("User was deleted")
            queryClient.invalidateQueries({
                queryKey: ['owner'],

            })
        },
        onError: (err) => {

            toast.error(err.message)
        },
    })

    return (
        <>
            <div className='item'>
                <img src={user.image} alt="" />
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p> {user.password}</p>
                <p> {user.status}</p>
                <div className='controls'>
                    <button disabled={isLoading} onClick={() => deleteUser(user.id)}>Delete</button>
                    <button onClick={() => setShowForm(show => !show)}>Edit</button>
                </div>
            </div>
            {showForm && <FormAddUSer user={user} />}
        </>
    )
}
