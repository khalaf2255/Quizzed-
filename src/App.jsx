import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Users from './pages/Users'
import About from './pages/About'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    element: <AppLayout />, path: '/', children: [
      { path: 'users', element: <Users /> },
      { path: 'about', element: <About /> },
    ]
  }
])



export default function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>

      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </QueryClientProvider>
  )
}
