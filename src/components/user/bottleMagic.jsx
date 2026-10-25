import React, { useState, useRef } from 'react';
import image1 from "../../assets/1-fruit-bottle.png";
import image2 from "../../assets/2-fruit-bottle.png";
import image3 from "../../assets/3-fruit-bottle.png";
import image4 from "../../assets/4-fruit-bottle.png";
import './bottleMagic.css';
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
        }, 1100);
    };

    return (
        <>
            <h1 style={{ fontSize: "4rem", marginTop: "50px", color: "var(--text-dark)", marginLeft: "20px" }}>Our Primordial Drinks</h1>
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
        </>
    );
};
export default BottleMagic;