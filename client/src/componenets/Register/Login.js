import React, { useRef, useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import './Login.css'
import axios from '../../api/axios';
import { Link, useNavigate, useLocation  } from 'react-router-dom';


const LOGIN_URL = './auth'

const Login = ({isLoggedIn, setIsLoggedIn}) => {
    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({user, pwd}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data))
            //console.log(JSON.stringify(response))
            const accessToken = response?.data.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
            setIsLoggedIn(true)
            navigate(from, { replace: true });
        } catch(err) {
            if (!err?.response) {
                setErrMsg('No Server Response')
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed!')
            }
            errRef.current.focus();
        }
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    return (
        <>
        {success ? (
            <section className='login'>
                <h1>You are logged in!</h1>
                <br/>
                <p>
                    <Link to="/">Go to Home</Link> <br/>
                    <Link to="/Dashboard">Go to Workout Programs</Link> <br/>
                    <Link to="/Exercices">Go to Exercices</Link>
                </p>
            </section>
        ) : (
            <section className='login'>
            <p ref={errRef} className={errMsg? "errmsg" : "offScreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input 
                    type="text" 
                    id="username"
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <label htmlFor='password'>Password:</label>
                <input 
                    type="password" 
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
                <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist">Trust This Device</label>
                </div>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                {/*put router link here*/}
                <Link to="/Register">Sign Up</Link>
                </span>
            </p>
        </section>
        )}
        
        </>
    )
}

export default Login
