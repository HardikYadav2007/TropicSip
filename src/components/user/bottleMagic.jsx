import React, { useState, useRef } from 'react';
import image1 from "../../assets/1-fruit-bottle.png";
import image2 from "../../assets/2-fruit-bottle.png";
import image3 from "../../assets/3-fruit-bottle.png";
import image4 from "../../assets/4-fruit-bottle.png";
const BottleMagic = () => {
    const [activeJuiceId, setActiveJuiceId] = useState(1);
    const [juiceImage, setJuiceImage] = useState({
        src: image1,
        alt: 'Orange Juice',
    });
    const [isRotating, setIsRotating] = useState(false);
    const [isTextFading, setIsTextFading] = useState(false);

    const juiceImageRef = useRef(null);
    const timeoutRef = useRef(null);
    const textTimeoutRef = useRef(null);

    const juices = [
        {
            id: 1,
            src: image1,
            alt: 'Orange Juice',
            heading: 'Orange Juice',
            text: 'Orange juice is a liquid extracted from orange fruits. It is a popular breakfast drink known for its sweet and tangy taste. Rich in Vitamin C, it also contains potassium and antioxidants. Orange juice can be consumed fresh, store-bought, or as a base for various beverages and recipes. It is valued for its refreshing qualities and potential health benefits.',
            gradient: 'linear-gradient(135deg, #FFE5C4 0%, #FF9E43 100%)',
        },
        {
            id: 2,
            src: image2,
            alt: 'Strawberry Juice',
            heading: 'Strawberry Juice',
            text: 'Strawberry juice is a refreshing beverage made from fresh strawberries. It has a vibrant red color and a delightful sweet-tart flavor. Rich in vitamins, antioxidants, and fiber, strawberry juice is a healthy choice for hydration. It can be enjoyed on its own, mixed with other fruits, or used in various recipes and drinks.',
            gradient: 'linear-gradient(135deg, #FFD3D6 0%, #FF5370 100%)',
        },
        {
            id: 3,
            src: image3,
            alt: 'Kiwi Juice',
            heading: 'Kiwi Juice',
            text: 'Kiwi juice is a vibrant and nutritious beverage made from fresh kiwi fruits. It has a unique tangy-sweet flavor with a refreshing quality. Packed with Vitamin C, antioxidants, and dietary fiber, kiwi juice supports digestion and immune health. It can be enjoyed chilled on its own or mixed with other fruit juices for added flavor.',
            gradient: 'linear-gradient(135deg, #E3F8C9 0%, #7CB342 100%)',
        },
        {
            id: 4,
            src: image4,
            alt: 'Plum Juice',
            heading: 'Plum Juice',
            text: 'Plum juice is a rich, flavorful beverage made from fresh plums, offering a delightful balance of sweet and tart notes. Known for its deep purple hue, it is packed with antioxidants, fiber, and essential vitamins, supporting digestive health and overall well-being. Traditionally enjoyed chilled, plum juice serves as a refreshing drink on its own or a versatile ingredient in culinary creations.',
            gradient: 'linear-gradient(135deg, #E9F5DB 0%, #558B2F 100%)',
        },
    ];

    const currentJuice = juices.find((j) => j.id === activeJuiceId) || juices[0];

    const handleJuiceClick = (selectedId) => {
        if (selectedId === activeJuiceId && !isRotating) return;

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (textTimeoutRef.current) clearTimeout(textTimeoutRef.current);

        setIsTextFading(true);
        setIsRotating(false);

        requestAnimationFrame(() => {
            if (juiceImageRef.current) {
                void juiceImageRef.current.offsetWidth;
            }
            setIsRotating(true);
        });

        timeoutRef.current = setTimeout(() => {
            const selectedJuice = juices.find((j) => j.id === selectedId) || juices[0];
            setActiveJuiceId(selectedId);
            setJuiceImage({
                src: selectedJuice.src,
                alt: selectedJuice.alt,
            });
            setIsTextFading(false);
        }, 1500);
    };

    return (
        <>
            <h1 style={{ fontSize: "4rem", marginTop: "50px", color: "#2c3e50", marginLeft20px }}>Our Primordial Drinks</h1>
            <div className="main" style={{ background: currentJuice.gradient }}>
                <div className="content">
                    <div className={`text_wrapper ${isTextFading ? 'fading' : ''}`}>
                        <h1>{currentJuice.heading}</h1>
                        <p>{currentJuice.text}</p>
                    </div>
                    <div className="four_juice">
                        {juices.map((juice) => (
                            <div
                                key={juice.id}
                                className={`four_juice_button ${juice.id === activeJuiceId ? 'active' : ''}`}
                                id={String(juice.id)}
                                onClick={() => handleJuiceClick(juice.id)}
                            >
                                <img src={juice.src} alt={juice.alt} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="image_container">
                    <div className="image">
                        <img
                            ref={juiceImageRef}
                            src={juiceImage.src}
                            alt={juiceImage.alt}
                            id="juiceImage"
                            className={isRotating ? 'rotating' : ''}
                        />
                    </div>
                </div>
            </div>
            <style>{`
            .main {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                height: 100vh;
                padding: 20px 50px;
                overflow: hidden;
                transition: background 1.2s ease-in-out;
            }

            .content {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 50%;
                height: 100%;
                gap: 30px;
            }

            .text_wrapper {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                max-width: 100%;
                transition: opacity 0.4s ease, transform 0.4s ease;
                opacity: 1;
                transform: translateY(0);
            }

            .text_wrapper.fading {
                opacity: 0;
                transform: translateY(12px);
            }

            .text_wrapper h1 {
                font-size: 3.2rem;
                font-weight: 800;
                color: #2c3e50;
                margin-bottom: 16px;
                letter-spacing: -0.5px;
                text-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            }

            .text_wrapper p {
                width: 100%;
                font-size: 1.05rem;
                line-height: 1.7;
                color: #4a5568;
                font-weight: 400;
                margin: 0;
            }

            .four_juice {
                display: flex;
                flex-direction: row;
                justify-content: center;
                gap: 20px;
                width: 100%;
                margin-top: 10px;
            }

            .four_juice_button {
                width: 120px;
                height: 160px;
                background: rgba(255, 255, 255, 0.35);
                backdrop-filter: blur(10px);
                border: 2px solid rgba(255, 255, 255, 0.6);
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
            }

            .four_juice_button:hover {
                transform: translateY(-6px) scale(1.05);
                background: rgba(255, 255, 255, 0.55);
                border-color: rgba(255, 255, 255, 0.9);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            }

            .four_juice_button.active {
                border-color: #ffffff;
                background: rgba(255, 255, 255, 0.85);
                transform: scale(1.08);
                box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
            }

            .four_juice_button img {
                width: 65%;
                height: auto;
                filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
            }

            .image_container {
                width: 50%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }

            .image {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                left: 50px;
                top: -150px;
            }

            .image img {
                width: 420px;
                height: auto;
                transform: rotate(-60deg);
                transform-origin: bottom center;
                position: absolute;
            }

            .rotating {
                animation: rotateAnimation 2s linear;
            }

            @keyframes rotateAnimation {
                0% {
                    transform: rotate(-60deg);
                }
                20% {
                    transform: rotate(-120deg);
                }
                40% {
                    transform: rotate(-180deg);
                }
                60% {
                    transform: rotate(-270deg);
                }
                80% {
                    transform: rotate(-360deg);
                }
                100% {
                    transform: rotate(-420deg);
                }
            }

            `}</style>
        </>
    );
};
export default BottleMagic;