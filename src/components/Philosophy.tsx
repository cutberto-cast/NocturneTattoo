"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Philosophy.module.css";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Philosophy() {
    const containerRef = useRef<HTMLElement>(null);
    const elementsRef = useRef<HTMLElement[]>([]);

    useGSAP(() => {
        elementsRef.current.forEach((el) => {
            gsap.fromTo(
                el,
                {
                    autoAlpha: 0,
                    y: 50,
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });
    }, { scope: containerRef });

    const addToRefs = (el: HTMLElement | null) => {
        if (el && !elementsRef.current.includes(el)) {
            elementsRef.current.push(el);
        }
    };

    return (
        <section className={styles.philosophy} ref={containerRef}>
            <div className={styles.container}>
                <p className={styles.label} ref={addToRefs}>Manifiesto</p>

                {/* Nueva Tarjeta Cyberpunk Premium */}
                <div className={styles.cyberCard} ref={addToRefs}>
                    {/* Capas de animación (Fondo y Brillo) */}
                    <div className={styles.glowLayer}></div>
                    <div className={styles.borderLayer}></div>

                    {/* Contenido protegido de la animación */}
                    <div className={styles.cyberContent}>
                        <h2 className={styles.manifesto}>
                            No somos un estudio comercial. Somos una galería de arte donde el lienzo respira.
                        </h2>
                        <p className={styles.paragraph}>
                            En Black Pulse Studio, curamos cada pieza con rigor técnico y limpieza clínica.
                            Creemos en la perfección del trazo, la armonía del espacio y la permanencia de la tinta.
                            Cada sesión es una experiencia estética diseñada para quienes entienden el tatuaje como la forma suprema del arte contemporáneo.
                        </p>
                    </div>
                </div>

                <div className={styles.signature} ref={addToRefs}>
                    Studio Director
                </div>
            </div>
        </section>
    );
}