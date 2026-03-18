"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Gallery.module.css";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const GALLERY_DATA = [
    {
        id: 1,
        url: "/images/gallery/tattoo/des1.webp",
        title: "Misticismo",
        style: "Blackwork",
        zone: "Brazo completo",
        artist: "Carlos Black",
    },
    {
        id: 2,
        url: "/images/gallery/tattoo/des2.webp",
        title: "Geometría Sagrada",
        style: "Dotwork",
        zone: "Espalda",
        artist: "Elena Dark",
    },
    {
        id: 3,
        url: "/images/gallery/tattoo/des3.webp",
        title: "Naturaleza Muerta",
        style: "Fine Line",
        zone: "Antebrazo",
        artist: "Ana Void",
    },
    {
        id: 4,
        url: "/images/gallery/tattoo/des4.webp",
        title: "Caos Ordenado",
        style: "Realismo Oscuro",
        zone: "Pierna",
        artist: "Carlos Black",
    },
    {
        id: 5,
        url: "/images/gallery/tattoo/des5.webp",
        title: "Ecos",
        style: "Minimalista",
        zone: "Costillas",
        artist: "Elena Dark",
    },
];

export default function Gallery() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedImage, setSelectedImage] = useState<typeof GALLERY_DATA[0] | null>(null);

    useGSAP(() => {
        if (!wrapperRef.current || !containerRef.current) return;

        gsap.fromTo(`.${styles.title}`, 
            { opacity: 0, scale: 0.95 },
            { 
                opacity: 1, 
                scale: 1, 
                duration: 1.5, 
                ease: "power3.out", 
                scrollTrigger: { 
                    trigger: `.${styles.title}`, 
                    start: "top 85%" 
                } 
            });

        gsap.to(containerRef.current, {
            x: () => -(containerRef.current!.scrollWidth - window.innerWidth) + "px",
            ease: "none",
            scrollTrigger: {
                trigger: wrapperRef.current,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                end: () => "+=" + containerRef.current!.offsetWidth,
            },
        });
    }, { scope: wrapperRef });

    return (
        <>
            <section className={styles.galleryWrapper} ref={wrapperRef}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Proyectos</h2>
                </div>
                <div className={styles.galleryContainer} ref={containerRef}>
                    {GALLERY_DATA.map((item) => (
                        <div
                            key={item.id}
                            className={styles.panel}
                            onClick={() => setSelectedImage(item)}
                        >
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={item.url}
                                    alt={item.title}
                                    fill
                                    className={styles.image}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className={styles.overlay}>
                                    <h3 className={styles.overlayTitle}>{item.title}</h3>
                                    <p className={styles.overlayInfo}>{item.style} — {item.artist}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Ver más CTA panel */}
                    <div className={`${styles.panel} ${styles.ctaPanel}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'none' }}>
                            <defs>
                                <filter id="gooGallery">
                                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="gooGallery"></feColorMatrix>
                                    <feBlend in2="gooGallery" in="SourceGraphic" result="mix"></feBlend>
                                </filter>
                            </defs>
                        </svg>

                        <div className={styles.ctaWrapper}>
                            <h3 className={styles.ctaTitle}>Ver todos los proyectos</h3>
                            <a href="/proyectos" className={styles.ctaButton}>
                                Explorar Galería Completa
                                <span className={styles.ctaButtonInner}>
                                    <span className={styles.ctaButtonBlobs}>
                                        <span className={styles.ctaButtonBlob}></span>
                                        <span className={styles.ctaButtonBlob}></span>
                                        <span className={styles.ctaButtonBlob}></span>
                                        <span className={styles.ctaButtonBlob}></span>
                                    </span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fullscreen Modal */}
            <div className={`${styles.modal} ${selectedImage ? styles.active : ""}`}>
                <button className={styles.modalClose} onClick={() => setSelectedImage(null)}>
                    ×
                </button>
                {selectedImage && (
                    <div className={styles.modalContent}>
                        <div className={styles.modalImageContainer}>
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.title}
                                className={styles.modalImage}
                            />
                        </div>
                        <div className={styles.modalInfo}>
                            <h2 className={styles.modalTitle}>{selectedImage.title}</h2>
                            <div className={styles.modalDetail}>Estilo: <span>{selectedImage.style}</span></div>
                            <div className={styles.modalDetail}>Zona: <span>{selectedImage.zone}</span></div>
                            <div className={styles.modalDetail}>Artista: <span>{selectedImage.artist}</span></div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
