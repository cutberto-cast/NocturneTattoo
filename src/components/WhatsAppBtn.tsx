"use client";

import { useEffect, useState } from "react";
import styles from "./WhatsAppBtn.module.css";
import gsap from "gsap";

export default function WhatsAppBtn() {
    const [mounted, setMounted] = useState(false);
    const message = "Hola, quiero agendar una cita en Black Ritual Studio.";
    const phone = "1234567890"; // Reemplazar con el número real
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    useEffect(() => {
        setMounted(true);
        gsap.fromTo(
            `#whatsapp-btn`,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 2 }
        );
    }, []);

    if (!mounted) return null;

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'none' }}>
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
                        <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                    </filter>
                </defs>
            </svg>

            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.blobBtn}
                id="whatsapp-btn"
            >
                Agendar
                <span className={styles.blobBtnInner}>
                    <span className={styles.blobBtnBlobs}>
                        <span className={styles.blobBtnBlob}></span>
                        <span className={styles.blobBtnBlob}></span>
                        <span className={styles.blobBtnBlob}></span>
                        <span className={styles.blobBtnBlob}></span>
                    </span>
                </span>
            </a>
        </>
    );
}
