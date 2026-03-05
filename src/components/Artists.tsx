"use client";

import { useRef } from "react";
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

export default function Artists() {
    const containerRef = useRef<HTMLElement>(null);

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
                <div className={styles.grid}>
                    {ARTISTS.map((artist, idx) => (
                        <div key={idx} className={styles.card}>
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
