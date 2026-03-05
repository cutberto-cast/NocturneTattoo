"use client";

import { useRef } from "react";
import { ShieldCheck, Crosshair, Droplets, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Process.module.css";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const PROCESS_DATA = [
    {
        icon: <ShieldCheck size={32} strokeWidth={1} />,
        title: "Esterilización Grado Médico",
        text: "Utilizamos autoclaves de última generación y materiales 100% desechables para garantizar un entorno estéril libre de riesgos cruzados.",
    },
    {
        icon: <Crosshair size={32} strokeWidth={1} />,
        title: "Precisión Técnica",
        text: "Máquinas rotativas silenciosas y calibración perfecta para minimizar trauma en la piel y asegurar una cicatrización óptima e indolora.",
    },
    {
        icon: <Droplets size={32} strokeWidth={1} />,
        title: "Tintas Premium Veganas",
        text: "Seleccionamos pigmentos europeos de alta pureza, sin metales pesados, diseñados para mantener la intensidad y profundidad a lo largo del tiempo.",
    },
    {
        icon: <Sparkles size={32} strokeWidth={1} />,
        title: "Curaduría Artística",
        text: "Cada diseño es adaptado a la anatomía del cliente, asegurando un tatuaje que fluya perfectamente con el cuerpo y envejezca con gracia.",
    },
];

export default function Process() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        let mm = gsap.matchMedia();

        // Desktop Animations
        mm.add("(min-width: 1025px)", () => {
            gsap.fromTo(
                `.${styles.desktopView} .${styles.item}`,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: `.${styles.desktopView} .${styles.grid}`,
                        start: "top 85%",
                    }
                }
            );
        });

        // Mobile Animations
        mm.add("(max-width: 1024px)", () => {
            const items = gsap.utils.toArray(`.${styles.step}`);

            items.forEach((item: any) => {
                gsap.fromTo(
                    item,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                        },
                    }
                );
            });

            gsap.fromTo(
                `.${styles.timeline}`,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                        end: "bottom 20%",
                        scrub: true,
                    },
                }
            );
        });

        return () => mm.revert();
    }, { scope: containerRef });

    return (
        <section className={styles.processSection} ref={containerRef}>

            {/* DESKTOP VIEW */}
            <div className={styles.desktopView}>
                <picture className={styles.bgWrapper}>
                    <img
                        src="/images/protocolo-bg.png"
                        alt="Process Background"
                        className={styles.bgImage}
                    />
                </picture>

                <div className={`container ${styles.contentContainer}`}>
                    <h2 className={styles.title}>Protocolo</h2>

                    <div className={styles.grid}>
                        <div className={styles.centerSpace}></div>

                        <div className={`${styles.item} ${styles.itemLeft}`}>
                            <div className={styles.itemContent}>
                                <div className={styles.iconWrapper}>
                                    {PROCESS_DATA[0].icon}
                                </div>
                                <h3 className={styles.itemTitle}>{PROCESS_DATA[0].title}</h3>
                                <p className={styles.itemText}>{PROCESS_DATA[0].text}</p>
                            </div>
                        </div>

                        <div className={`${styles.item} ${styles.itemRight}`}>
                            <div className={styles.itemContent}>
                                <div className={styles.iconWrapper}>
                                    {PROCESS_DATA[1].icon}
                                </div>
                                <h3 className={styles.itemTitle}>{PROCESS_DATA[1].title}</h3>
                                <p className={styles.itemText}>{PROCESS_DATA[1].text}</p>
                            </div>
                        </div>

                        <div className={`${styles.item} ${styles.itemLeft}`}>
                            <div className={styles.itemContent}>
                                <div className={styles.iconWrapper}>
                                    {PROCESS_DATA[2].icon}
                                </div>
                                <h3 className={styles.itemTitle}>{PROCESS_DATA[2].title}</h3>
                                <p className={styles.itemText}>{PROCESS_DATA[2].text}</p>
                            </div>
                        </div>

                        <div className={`${styles.item} ${styles.itemRight}`}>
                            <div className={styles.itemContent}>
                                <div className={styles.iconWrapper}>
                                    {PROCESS_DATA[3].icon}
                                </div>
                                <h3 className={styles.itemTitle}>{PROCESS_DATA[3].title}</h3>
                                <p className={styles.itemText}>{PROCESS_DATA[3].text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE VIEW */}
            <div className={styles.mobileView}>
                <img
                    src="/images/protocolo-mobile.png"
                    className={styles.mobileBg}
                    alt="Tattoo ritual background"
                />
                <div className={styles.mobileOverlay} />

                <div className={styles.mobileContent}>
                    <h2 className={styles.mobileTitle}>Protocolo</h2>

                    <div className={styles.timelineWrapper}>
                        <div className={styles.timeline} />

                        {PROCESS_DATA.map((step, i) => (
                            <div
                                key={i}
                                className={`${styles.step} ${i % 2 === 0 ? styles.left : styles.right}`}
                            >
                                <div className={styles.node}>{step.icon}</div>
                                <div className={styles.card}>
                                    <h3>{step.title}</h3>
                                    <p>{step.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
}