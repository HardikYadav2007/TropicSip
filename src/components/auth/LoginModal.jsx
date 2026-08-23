import fruitbg from '../../assets/fruit.jpg'
export default function Login({ closeModal }) {
    return <>
        <div id="main">
            {/* {closeModal && (
                <button 
                    className="btn btn-secondary"
                    onClick={closeModal} 
                    style={{ position: 'absolute', top: '20px', left: '20px', cursor: 'pointer', padding: '6px 14px', fontSize: '0.85rem' }}
                >
                    ← Back to Home
                </button>
            )} */}
            <div id="message">
                <h1 id="title">Welcome back!</h1>
                <p>Welcome back User,Please login to continue shopping.</p>
            </div>

            <div id="credentials">
                <div id="username">
                <h4>Username</h4>
                <input type="text" placeholder="Enter your username" />
                </div>
                <div id="password">
                <h4>Password</h4>
                <input type="password" placeholder="Enter your Password" />
                </div>
            </div>
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
                
                filter:blur(4px);
                z-index:-1;
                }
                #main{
                height:70vh;
                width:60vw;
                z-index:1;
                display:flex;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                border-radius:15px;
                }
                #main{
                background:#FFFFF0;
                }
                #title{
                    position:absolute;
                    top:10%;
                    margin:0;
                    font-size:2rem;
                    
                }
                
                #message{
                    width:35%;
                    height:100%;
                    background:#FF7F50;


                }
                #credentials{
                    width:65%;
                    height:100%;
                }
                input{
                border:none;
                }
        
                h4{
                font-size:2rem;
                }
        
        
        `}
        </style>
    </>
}