import React, { useEffect, useState } from "react";

import {ChevronRight,ChevronLeft} from "lucide-react"


const slides = [
    {
        image:
            "https://images.unsplash.com/photo-1511370235399-1802cae1d32f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1474&q=80",
        heading: (
            <>
                Discover your <span className="text-gold">Passion</span>
            </>
        )
    },
    {
        image:
            "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        heading: (
            <>
                Show your <span className="text-gold">Style</span>
            </>
        )
    },
    {
        image:
            "https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        heading: (
            <>
                Live your <span className="text-gold">Dream</span>
            </>
        )
    },
    {
        image:
            "https://images.unsplash.com/photo-1444881421460-d838c3b98f95?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",
        text: (
            <>
                <p>Because time flies,</p>
                <p>
                    But the <span className="text-gold">memories</span> last forever.
                </p>
            </>
        )
    }
];

function Corousel() {
    const [index, setIndex] = useState(0);

    const next = () => {
        setIndex(i => (i + 1) % slides.length);
    };
    const prev = () => {
        setIndex(i => (i - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        // Move to the next slide every five seconds and stop the timer on unmount.
        const timer = setTimeout(() => {
            setIndex(currentIndex => (currentIndex + 1) % slides.length);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative h-125 overflow-hidden font-playfair">
            {slides.map((slide, i) => (
                <div
                    key={i}
                    className={
                        "absolute inset-0 transition-opacity duration-700 " +
                        (i === index ? "opacity-100" : "pointer-events-none opacity-0")
                    }
                >
                    <img
                        className="h-full w-full object-cover"
                        src={slide.image}
                        alt=""
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 text-center text-white">
                        {slide.heading && (
                            <h1 className="text-5xl font-normal drop-shadow-[1px_1px_2px_black] sm:text-7xl">
                                {slide.heading}
                            </h1>
                        )}
                        {slide.text && (
                            <div className="text-2xl drop-shadow-[2px_2px_2px_black] sm:text-3xl">
                                {slide.text}
                            </div>
                        )}
                    </div>
                </div>
            ))}

            <button
                onClick={prev}
                aria-label="Previous slide"
                className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
            >
                <span > <ChevronLeft size={30} /> </span>
            </button>
            <button
                onClick={next}
                aria-label="Next slide"
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-black/30 p-2 text-white  hover:bg-black/50"
            >
                <span > <ChevronRight size={30} /> </span>
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        aria-label={"Go to slide " + (i + 1)}
                        onClick={() => setIndex(i)}
                        className={
                            "h-2 w-2 cursor-pointer rounded-full " +
                            (i === index ? "bg-white" : "bg-white/40")
                        }
                    />
                ))}
            </div>
        </div>
    );
}

export default Corousel;
