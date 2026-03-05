"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Artists.module.css";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const ARTISTS = [
    {
        name: "Mike",
        specialty: "Blackwork & Dark Realism",
        image: "/images/gallery/artistas/des1.jpg",
    },
    {
        name: "Elena",
        specialty: "Minimalist & Dotwork",
        image: "/images/gallery/artistas/des2.jpg",
    },
    {
        name: "Marco",
        specialty: "Fine Line & Sacred Geometry",
        image: "/images/gallery/artistas/des3.jpg",
    },
];

const DISPLAY_ARTISTS = [...ARTISTS, ...ARTISTS, ...ARTISTS, ...ARTISTS, ...ARTISTS, ...ARTISTS];

export default function Artists() {
    const containerRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const scrollPosRef = useRef(0);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        let animationId: number;

        const scroll = () => {
            if (!isPaused) {
                scrollPosRef.current += 1.5; // Scroll speed
                // Reset scroll for seamless endless loop
                if (scrollPosRef.current >= grid.scrollWidth / 2) {
                    scrollPosRef.current = 1;
                }
                grid.scrollLeft = scrollPosRef.current;
            }
            animationId = requestAnimationFrame(scroll);
        };
        animationId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationId);
    }, [isPaused]);

    const handleScroll = () => {
        const grid = gridRef.current;
        if (!grid) return;

        scrollPosRef.current = grid.scrollLeft;

        const centerLine = window.innerWidth / 2;
        const children = Array.from(grid.children) as HTMLElement[];
        let minDistance = Infinity;
        let closestIndex = 0;

        children.forEach((child, index) => {
            const rect = child.getBoundingClientRect();
            const childCenter = rect.left + rect.width / 2;
            const distance = Math.abs(centerLine - childCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });
        setActiveIndex(closestIndex);
    };

    useGSAP(() => {
        if (!containerRef.current) return;

        gsap.fromTo(
            `.${styles.card}`,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: `.${styles.grid}`,
                    start: "top 80%",
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section className={styles.artistsSection} ref={containerRef}>
            <div className="container">
                <h2 className={styles.title}>Residentes</h2>
                <div
                    className={styles.grid}
                    ref={gridRef}
                    onScroll={handleScroll}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    {DISPLAY_ARTISTS.map((artist, idx) => (
                        <div key={idx} className={`${styles.card} ${activeIndex === idx ? styles.activeCard : ''}`}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={artist.image}
                                    alt={artist.name}
                                    fill
                                    className={styles.image}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                            <div className={styles.infoOverlay}>
                                <h3 className={styles.name}>{artist.name}</h3>
                                <p className={styles.specialty}>{artist.specialty}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
