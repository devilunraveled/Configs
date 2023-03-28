import { Routes, Route } from 'react-router-dom'
import { HomePage } from './components/HomePage'
import { ProfilePage } from './components/dashboard/ProfilePage'

export default function App() {
    return (
        <div className='app'>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='profile/user/admin' element={<ProfilePage />} />
            
            {/*Any stray route will be redirected to home*/}
            <Route path="*" element={ <HomePage /> } />
        </Routes>
        </div>
    )
}
