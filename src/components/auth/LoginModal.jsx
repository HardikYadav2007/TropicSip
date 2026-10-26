import fruitbg from '../../assets/fruit.jpg'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function Login({ closeModal }) {
    const { login, signupUser } = useAuth();
    const [view, setView] = useState("Login");

    // Login Form State
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Signup Form State
    const [signupData, setSignupData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleLoginSubmit = (e) => {
        if (e) e.preventDefault();
        setError("");

        if (!username.trim() || !password.trim()) {
            setError("Please enter both username/email and password.");
            return;
        }

        const res = login(username, password);
        if (res.success) {
            if (closeModal) closeModal();
        } else {
            setError(res.error || "Invalid username or password.");
        }
    };

    const handleSignupSubmit = (e) => {
        if (e) e.preventDefault();
        setError("");

        if (!signupData.username.trim() || !signupData.email.trim() || !signupData.password.trim()) {
            setError("Please fill in all required fields.");
            return;
        }

        if (signupData.password !== signupData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const res = signupUser({
            name: signupData.name,
            username: signupData.username,
            email: signupData.email,
            password: signupData.password
        });

        if (res.success) {
            if (closeModal) closeModal();
        } else {
            setError(res.error || "Failed to create account.");
        }
    };

    return <>
        <div id="main">
            {closeModal && (
                <button
                    className="btn btn-secondary"
                    onClick={closeModal}
                    style={{ position: 'absolute', top: '20px', left: '20px', cursor: 'pointer', padding: '6px 14px', fontSize: '0.85rem', zIndex: 10 }}
                >
                    ← Back to Home
                </button>
            )}
            
            {view === "Login" ? (
                <>
                    <div id="message">
                        <h1 id="title">Welcome back!</h1>
                        <p>Welcome back! Enter credentials to access Customer or Admin portal.</p>
                    </div>

                    <div id="credentials">
                        {error && (
                            <div className="login-error-alert">
                                ⚠️ {error}
                            </div>
                        )}

                        <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                            <div id="username">
                                <p>Username or Email</p>
                                <input 
                                    type="text" 
                                    placeholder="Enter 'admin' or username" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <div id="password">
                                <p>Password</p>
                                <input 
                                    type="password" 
                                    placeholder="Enter your Password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className='butn'>LOGIN</button>
                        </form>

                        <div id="newAccount">
                            <h5>New to TropicSip? <span onClick={() => { setView("Signup"); setError(""); }}>Create Account</span></h5>
                        </div>
                    </div>
                </>
            )
                :
                (<>
                    <div id="message">
                        <h1 id="title">Hello User!</h1>
                        <p>Create your account and dive into wholesale shopping with us.</p>
                    </div>

                    <div id="credentials">
                        {error && (
                            <div className="login-error-alert">
                                ⚠️ {error}
                            </div>
                        )}

                        <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                            <div id="username">
                                <p>Full Name</p>
                                <input 
                                    type="text" 
                                    placeholder="Enter your name" 
                                    value={signupData.name}
                                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                />
                            </div>
                            <div id="username">
                                <p>Username</p>
                                <input 
                                    type="text" 
                                    placeholder="Choose a username" 
                                    value={signupData.username}
                                    onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                                />
                            </div>
                            <div id='email'>
                                <p>Email</p>
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    value={signupData.email}
                                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                />
                            </div>
                            <div id="password">
                                <p>Password</p>
                                <input 
                                    type="password" 
                                    placeholder="Enter your Password" 
                                    value={signupData.password}
                                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                />
                            </div>
                            <div id="confirmPassword">
                                <p>Confirm Password</p>
                                <input 
                                    type="password" 
                                    placeholder="Confirm your Password" 
                                    value={signupData.confirmPassword}
                                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                                />
                            </div>
                            <button type="submit" className='butn'>CREATE ACCOUNT</button>
                        </form>

                        <div id="oldAccount">
                            <h5>Already have an account? <span onClick={() => { setView("Login"); setError(""); }} >Login</span></h5>
                        </div>
                    </div>
                </>)
            }

        </div>


        <style>{`
        body, #root{
                min-height:90vh;
                width:90vw;
                display:flex;
                justify-content:center;
                align-items:center;
                }
                body::before{
                content:"";
                position:absolute;
                top:0;
                bottom:0;
                right:0;
                left:0;
                background-image:url('${fruitbg}');
                background-size:cover;
                background-position:center;
                
                // filter:blur(4px);
                filter:brightness(0.3);
                z-index:-1;
                }
                #main{
                height:70vh;
                width:50vw;
                z-index:1;
                display:flex;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                border-radius:15px;
                box-shadow: 0 0 30px 15px rgba(0,0,0,0.5);
                background:#FFFFF0;
                }

                #title{
                    margin:0 0 10px 0;
                    font-size:2rem;
                    word-wrap:break-word;
                    
                }
                
                #message{
                    width:40%;
                    height:100%;
                    background:linear-gradient(to right bottom,#ff6b35,#ffa200);
                    display:flex;
                    flex-direction:column;
                    padding:40px 30px;
                    box-sizing:border-box;
                    align-items:center;
                    justify-content:center;
                    text-align:center;
                    flex-wrap:wrap;
                    border-radius:15px;
                }
                #credentials{
                    width:60%;
                    max-height:100%;
                    display:flex;
                    flex-direction:column;
                    padding:20px 20px;
                    overflow:auto;
                    gap:15px;
                    
                }
                input{
                    border:3px solid #FF7F50;
                    border-radius:5px;
                    height:40px;
                    width:80%;
                    padding:10px 20px;
                }
        
                p{
                    font-size:1.5rem;
                }
        
                #newAccount,#oldAccount{
                    margin-top:auto;
                    text-align:center;
                }
                .butn{
                    padding:10px 30px;
                    border-radius:5px;
                    margin:20px auto;
                    background:linear-gradient(to right bottom,#ff6b35,#ffa200);
                    border:none;
                    font-weight: 600;
                    font-size: 1rem;
                    transition:all 0.3s ease-in-out;
                }
                .butn:hover{
                    translate:0 -3px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    background-color: #FF4500;
                }
                span{
                color:#FF4500;
                cursor:pointer;
                }

                .login-error-alert {
                    background-color: #fee2e2;
                    border: 1px solid #ef4444;
                    color: #b91c1c;
                    padding: 8px 14px;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    font-weight: 500;
                    margin-bottom: 5px;
                }
        `}
        </style>
    </>
}