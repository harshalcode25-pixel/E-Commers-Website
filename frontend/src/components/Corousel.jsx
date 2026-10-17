import React, { useEffect, useRef, useState } from "react";

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

// Copies at each end let the carousel slide smoothly in either direction.
const carouselSlides = [slides[slides.length - 1], ...slides, slides[0]];

function Corousel() {
    const [index, setIndex] = useState(1);
    const [animate, setAnimate] = useState(true);
    const moving = useRef(false);
    const activeSlide = (index - 1 + slides.length) % slides.length;

    const moveSlide = (direction) => {
        if (moving.current) return;
        moving.current = true;
        setAnimate(true);
        setIndex(current => current + direction);
    };

    const next = () => {
        moveSlide(1);
    };
    const prev = () => {
        moveSlide(-1);
    };

    const goToSlide = (slideIndex) => {
        if (moving.current || slideIndex === activeSlide) return;
        moving.current = true;
        setAnimate(true);
        setIndex(slideIndex + 1);
    };

    const handleSlideEnd = (event) => {
        if (event.target !== event.currentTarget || event.propertyName !== "transform") return;

        // Switch from the copy to the identical real slide without animation.
        if (index === slides.length + 1) {
            setAnimate(false);
            setIndex(1);
        } else if (index === 0) {
            setAnimate(false);
            setIndex(slides.length);
        }
        moving.current = false;
    };

    useEffect(() => {
        // Move to the next slide every four seconds.
        const timer = setInterval(() => {
            if (moving.current) return;
            moving.current = true;
            setAnimate(true);
            setIndex(currentIndex => currentIndex + 1);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative aspect-video w-full min-w-0 max-w-full overflow-hidden font-playfair sm:aspect-auto sm:h-96 lg:h-125">
            <div
                className={"absolute inset-0 flex " + (animate ? "transition-transform duration-700 ease-in-out motion-reduce:duration-1" : "transition-none")}
                style={{ transform: `translateX(-${index * 100}%)` }}
                onTransitionEnd={handleSlideEnd}
            >
                {carouselSlides.map((slide, i) => (
                <div
                    key={i}
                    aria-hidden={i !== index}
                    className="relative h-full w-full shrink-0"
                >
                    <img
                        className="h-full w-full object-cover"
                        src={slide.image}
                        alt=""
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 px-14 text-center text-white sm:px-16">
                        {slide.heading && (
                            <h1 className="text-[clamp(1.5rem,6vw,2rem)] leading-tight font-normal drop-shadow-[1px_1px_2px_black] sm:text-5xl lg:text-7xl">
                                {slide.heading}
                            </h1>
                        )}
                        {slide.text && (
                            <div className="text-[clamp(0.875rem,4vw,1.25rem)] drop-shadow-[2px_2px_2px_black] sm:text-3xl">
                                {slide.text}
                            </div>
                        )}
                    </div>
                </div>
                ))}
            </div>

            <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
            >
                <span > <ChevronLeft size={30} /> </span>
            </button>
            <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-black/30 p-2 text-white  hover:bg-black/50"
            >
                <span > <ChevronRight size={30} /> </span>
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {slides.map((_, i) => (
                    <button
                        type="button"
                        key={i}
                        aria-label={"Go to slide " + (i + 1)}
                        aria-current={i === activeSlide ? "true" : undefined}
                        onClick={() => goToSlide(i)}
                        className={
                            "h-2 w-2 cursor-pointer rounded-full " +
                            (i === activeSlide ? "bg-white" : "bg-white/40")
                        }
                    />
                ))}
            </div>
        </div>
    );
}

export default Corousel;
