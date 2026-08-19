import heroImage from '../../assets/Hero_Image.png';
export default function Hero() {
    return (
        <section>
            <img src={heroImage} alt="Image" />
            <h1>Juices</h1>
            <p>Our signature juices are real and Raw. All our juices are made with fruit, not concentrate and are free of artificial flavours and sugar. We bring you goodness and flavour in each bottle.</p>
            <style>{`
                section {
                    display: flex;
                    flex-direction:column;
                    border: 1px solid var(--border-glass);
                    box-shadow: var(--shadow-nav);
                    width: calc(100% - 2rem);
                    top: 1rem;
                    border-radius: 20px;
                    margin: 10px auto;
                    padding:10px;
                    gap:10px;
                }
                img{
                    width:100%;
                    height: auto;
                    border-radius: 20px;
                }
                p{
                    font-size:0.85rem;
                    color:var(--text-muted);
                    width:35%;
                }
            `}
            </style>
        </section>
    );
}