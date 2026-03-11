"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import styles from "./Hero.module.css";

const SocialButton = ({ href, label, tooltip }: { href: string, label: string, tooltip: string }) => (
    <div className={styles.socialBtnGroup}>
        <a href={href} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
            {label}
            <span className={styles.socialBtnInner}>
                <span className={styles.socialBtnBlobs}>
                    <span className={styles.socialBtnBlob}></span>
                    <span className={styles.socialBtnBlob}></span>
                    <span className={styles.socialBtnBlob}></span>
                    <span className={styles.socialBtnBlob}></span>
                </span>
            </span>
        </a>
        <div className={styles.tooltip}>{tooltip}</div>
    </div>
);

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
            const tl = gsap.timeline();
            gsap.set(`.${styles.topNav} .${styles.navBlock}`, { opacity: 0, y: -20 });
            gsap.set(`.${styles.bottomLeft} > *`, { opacity: 0, y: 30 });
            gsap.set(`.${styles.socials} > *`, { opacity: 0, y: 30 });
            gsap.set(`.${styles.hugeText}`, { opacity: 0, scale: 0.95 });
            gsap.set(`.${styles.bgVideo}`, { opacity: 0 });

            tl.to(`.${styles.bgVideo}`, { opacity: 0.6, duration: 2, ease: "power2.inOut" })
                .to(`.${styles.hugeText}`, { opacity: 1, scale: 1, duration: 2.5, ease: "power3.out" }, "-=1.5")
                .to(`.${styles.topNav} .${styles.navBlock}`, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power2.out" }, "-=2")
                .to(`.${styles.bottomLeft} > *`, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }, "-=1.5")
                .to(`.${styles.socials} > *`, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power2.out" }, "-=1");
        });

        mm.add("(max-width: 768px)", () => {
            const tl = gsap.timeline();
            gsap.set(`.${styles.mobileCenterText}`, { opacity: 0, scale: 0.95 });
            gsap.set(`.${styles.bottomNav} .${styles.navBlock}`, { opacity: 0, y: 20 });
            gsap.set(`.${styles.socialsMobile} > *`, { opacity: 0, y: 20 });
            gsap.set(`.${styles.bgVideo}`, { opacity: 0 });

            tl.to(`.${styles.bgVideo}`, { opacity: 0.5, duration: 2, ease: "power2.inOut" })
                .to(`.${styles.mobileCenterText}`, { opacity: 1, scale: 1, duration: 2, ease: "power3.out" }, "-=1.5")
                .to(`.${styles.bottomNav} .${styles.navBlock}`, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power2.out" }, "-=1.5")
                .to(`.${styles.socialsMobile} > *`, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power2.out" }, "-=1");
        });

        return () => mm.revert();
    }, { scope: containerRef });

    return (
        <section className={styles.hero} ref={containerRef}>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'none' }}>
                <defs>
                    <filter id="gooHero">
                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="gooHero"></feColorMatrix>
                        <feBlend in2="gooHero" in="SourceGraphic" result="mix"></feBlend>
                    </filter>
                </defs>
            </svg>

            <video autoPlay loop muted playsInline className={styles.bgVideo}>
                <source src="/videohero.mp4" type="video/mp4" />
            </video>
            <div className={styles.overlay}></div>

            {/* DESKTOP LAYOUT (Hidden on mobile) */}
            <div className={styles.desktopView}>
                <div className={styles.topNav}>
                    <div className={styles.navBlock}>
                        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
                            <p>BLACK PULSE</p>
                        </Link>
                    </div>
                    <div className={styles.navBlock}>
                        <Link href="/#manifiesto" style={{ textDecoration: "none", color: "inherit" }}>
                            <p>Sobre nosotros</p>
                        </Link>
                    </div>
                    <div className={styles.navBlock}>
                        <Link href="/proyectos" style={{ textDecoration: "none", color: "inherit" }}>
                            <p>Proyectos</p>
                        </Link>
                    </div>
                    <div className={`${styles.navBlock} ${styles.navRight}`}>
                        <Link href="/#estudio" style={{ textDecoration: "none", color: "inherit" }}>
                            <p>ESTUDIO</p>
                        </Link>
                        <Link href="/#visitanos" style={{ textDecoration: "none", color: "inherit" }}>
                            <p className={styles.bookVisit}>VISITANOS</p>
                        </Link>
                    </div>
                </div>

                <div className={styles.centerContent}>
                    <h1 className={styles.hugeText}>BLACK</h1>
                    <h1 className={styles.hugeText}>PULSE</h1>
                </div>

                <div className={styles.bottomContent}>
                    <div className={styles.bottomLeft}>
                        <p className={styles.smallText}>Tinta en la penumbra</p>
                        <h2 className={styles.mediumText}>Arte nacido de la oscuridad</h2>
                        <p className={styles.descText}>
                            Bienvenido a Black Pulse,<br />
                            donde cada diseño trasciende<br />
                            más allá de la piel
                        </p>
                    </div>
                    <div className={styles.socials}>
                        <SocialButton href="#" label="FB" tooltip="Facebook" />
                        <SocialButton href="#" label="IG" tooltip="Instagram" />
                        <SocialButton href="#" label="TK" tooltip="TikTok" />
                    </div>
                </div>
            </div>

            {/* MOBILE LAYOUT (Hidden on desktop) */}
            <div className={styles.mobileView}>
                <div className={styles.mobileCenterContent}>
                    <h1 className={`${styles.hugeText} ${styles.mobileCenterText}`}>BLACK PULSE</h1>

                    <div className={styles.bottomNav}>
                        <div className={styles.navBlock}>
                            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
                                <p>INICIO</p>
                            </Link>
                        </div>
                        <div className={styles.navBlock}>
                            <Link href="/#manifiesto" style={{ textDecoration: "none", color: "inherit" }}>
                                <p>NOSOTROS</p>
                            </Link>
                        </div>
                        <div className={styles.navBlock}>
                            <Link href="/proyectos" style={{ textDecoration: "none", color: "inherit" }}>
                                <p>PROYECTOS</p>
                            </Link>
                        </div>
                        <div className={styles.navBlock}>
                            <Link href="/#estudio" style={{ textDecoration: "none", color: "inherit" }}>
                                <p>ESTUDIO</p>
                            </Link>
                        </div>
                    </div>

                    <div className={styles.socialsMobile}>
                        <SocialButton href="#" label="FB" tooltip="Facebook" />
                        <SocialButton href="#" label="IG" tooltip="Instagram" />
                        <SocialButton href="#" label="TK" tooltip="TikTok" />
                    </div>
                </div>
            </div>
        </section>
    );
}
