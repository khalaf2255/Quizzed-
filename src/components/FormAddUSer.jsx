import React from 'react'
import { useForm } from 'react-hook-form'
import { addUsers } from '../services/apiUser'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export default function FormAddUSer({ user }) {

    // const { id: userId, ...restData } = user;

    const isEditStatus = Boolean(user?.id)

    const { register, handleSubmit } = useForm({
        defaultValues: isEditStatus ? { ...user } : {}
    })

    const queryClieny = useQueryClient()

    const { mutate: addUserMutat, error, isLoading: isAdding } = useMutation({
        mutationFn:  addUsers,
        onSuccess: () => {

            toast.success("User Successfully add")
            queryClieny.invalidateQueries({
                queryKey: ['owner']
            })
        },

        onError: (err) => {
            toast.error(err.message)
        },
    })
    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: ({ newData, id }) => addUsers(newData, id),
        onSuccess: () => {

            toast.success("User Successfully add")
            queryClieny.invalidateQueries({
                queryKey: ['owner']
            })
        },

        onError: (err) => {
            toast.error(err.message)
        },
    })


    function onSubmit(data) {
        const image = typeof data.image === 'string' ? data.image : data.image[0]
console.log(data.image);
console.log(data.image[0]);
        if (!isEditStatus) {
            addUserMutat({ ...data, image  }) 
        } else {
            updateUser({ newData: { ...data, image  }, id: user.id })
        }
    }
    function onErr(err) { 
        console.log(err);
    }
    return (
        <div className='patent'>
            <form onSubmit={handleSubmit(onSubmit, onErr)}>
                <div>
                    <label htmlFor="name">Username</label>
                    <input type="text" id='name' {...register('name')} />
                </div>
                <div>
                    <label htmlFor="name">email</label>
                    <input type="email" id='email' {...register('email')} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="text" id='password' {...register('password')} />
                </div>
                <div>
                    <label htmlFor="status">Status</label>
                    <input type="number" id='status' {...register('status')} />
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input type="file" id='image' {...register('image')} />
                </div>
                <button>Add</button>
            </form>
        </div>
    )
}
