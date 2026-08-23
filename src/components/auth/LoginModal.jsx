import fruitbg from '../../assets/fruit.jpg'
import { useState } from 'react'
export default function Login({ closeModal }) {
    const [view, setView] = useState("Login")
    return <>
        <div id="main">
            {closeModal && (
                <button
                    className="btn btn-secondary"
                    onClick={closeModal}
                    style={{ position: 'absolute', top: '20px', left: '20px', cursor: 'pointer', padding: '6px 14px', fontSize: '0.85rem' }}
                >
                    ← Back to Home
                </button>
            )}
            
            {view === "Login" ? (
                <>
                    <div id="message">
                        <h1 id="title">Welcome back!</h1>
                        <p>Welcome back User,Please login to continue shopping.</p>
                    </div>

                    <div id="credentials">
                        <div id="username">
                            <p>Username</p>
                            <input type="text" placeholder="Enter your username" />
                        </div>
                        <div id="password">
                            <p>Password</p>
                            <input type="password" placeholder="Enter your Password" />
                        </div>
                        <button className='butn'>LOGIN</button>
                        <div id="newAccount">
                            <h5>New to TropicSip? <span onClick={() => setView("Signup")}>Create Account</span></h5>
                        </div>
                    </div>
                </>
            )
                :

                (<>
                    <div id="message">
                        <h1 id="title">Hello User!</h1>
                        <p>Create your account and dive into shopping with us.</p>
                    </div>

                    <div id="credentials">
                        <div id="username">
                            <p>Username</p>
                            <input type="text" placeholder="Enter your username" />
                        </div>
                        <div id='email'>
                            <p>Email</p>
                            <input type="email" placeholder="Enter your username" />
                        </div>
                        <div id="password">
                            <p>Password</p>
                            <input type="password" placeholder="Enter your Password" />
                        </div>
                        <div id="confirmPassword">
                            <p>Confirm Password</p>
                            <input type="password" placeholder="confirm your Password" />
                        </div>
                        <button className='butn'>CREATE ACCOUNT</button>
                        <div id="oldAccount">
                            <h5>Already have an account? <span onClick={() => setView("Login")} >Login</span></h5>
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
                    // margin-top:auto;
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
        `}
        </style>
    </>
}