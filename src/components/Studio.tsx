"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./Studio.module.css";

const STUDIO_IMAGES = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    url: `/images/gallery/estudio/des${i + 1}.webp`,
    alt: `Estudio interior ${i + 1}`,
}));

export default function Studio() {
    const row1Ref = useRef<HTMLDivElement>(null);
    const row2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!row1Ref.current || !row2Ref.current) return;

        // Infinite marquee animation using GSAP
        // Row 1 goes left
        gsap.to(row1Ref.current, {
            xPercent: -50,
            ease: "none",
            duration: 20,
            repeat: -1
        });

        // Row 2 goes right (starts at -50% and moves to 0)
        gsap.fromTo(row2Ref.current,
            { xPercent: -50 },
            {
                xPercent: 0,
                ease: "none",
                duration: 25, // Slightly different speed for organic feel
                repeat: -1
            }
        );
    }, []);

    // Split into 2 rows and duplicate for seamless looping
    const row1Images = [...STUDIO_IMAGES.slice(0, 6), ...STUDIO_IMAGES.slice(0, 6)];
    const row2Images = [...STUDIO_IMAGES.slice(6, 12), ...STUDIO_IMAGES.slice(6, 12)];

    return (
        <section id="estudio" className={styles.studioSection}>
            <div className={styles.header}>
                <h2 className={styles.title}>El Estudio</h2>
                <p className={styles.subtitle}>Donde el arte oscuro cobra vida</p>
            </div>

            <div className={styles.marqueeContainer}>
                {/* Row 1 */}
                <div className={styles.marqueeTrack} ref={row1Ref}>
                    {row1Images.map((img, idx) => (
                        <div key={`${img.id}-${idx}-r1`} className={styles.imageBox}>
                            <Image
                                src={img.url}
                                alt={img.alt}
                                fill
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className={styles.img}
                            />
                        </div>
                    ))}
                </div>

                {/* Row 2 */}
                <div className={styles.marqueeTrack} ref={row2Ref}>
                    {row2Images.map((img, idx) => (
                        <div key={`${img.id}-${idx}-r2`} className={styles.imageBox}>
                            <Image
                                src={img.url}
                                alt={img.alt}
                                fill
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className={styles.img}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
