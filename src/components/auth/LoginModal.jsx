
export default function Login({ closeModal }) {
    return <>
        <div id="main">
            {closeModal && (
                <button 
                    onClick={closeModal} 
                    style={{ position: 'absolute', top: '20px', left: '20px', cursor: 'pointer', padding: '8px 16px' }}
                >
                    ← Back to Home
                </button>
            )}
            <h1 id="title">Welcome back!</h1>

            <div id="username">
                <h4>Username</h4>
                <input type="text" placeholder="Enter your username" />
            </div>
            <div id="password">
                <h4>Password</h4>
                <input type="password" placeholder="Enter your Password" />
            </div>
        </div>

        <style>{`
        body{
        min-height:100vh;
        width:100vw;
        display:flex;
        justify-content:center;
        align-items:center;
        background-size:cover;
        background-position:center;
        }
        #main{
        height:60vh;
        width:80vw;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        }
        
        
        `}
        </style>
    </>
}