"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react"; // Using Twitter as placeholder for TikTok if Lucide doesn't have it, or standard SVG. We'll use custom SVG for TikTok
import styles from "./Proyectos.module.css";
import { useEffect } from "react";
import gsap from "gsap";

const PROJECTS = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    url: `/images/gallery/tattoo/des${(i % 12) + 1}.jpg`, // Cycling through available images
    title: `Proyecto ${i + 1}`,
    style: ["Blackwork", "Geometría", "Fine Line", "Realismo", "Minimalista"][i % 5],
}));

export default function ProyectosPage() {

    useEffect(() => {
        gsap.fromTo(
            `.${styles.projectCard}`,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <Link href="/" className={styles.backLink}>
                    &larr; Volver al Inicio
                </Link>
                <h1 className={styles.title}>Todos los Proyectos</h1>

                <div className={styles.socials}>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                        <Facebook size={24} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                        <Instagram size={24} />
                    </a>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.589 6.686a4.793 4.793 0 0 1-3.975-4.685h-3.65v13.34c0 2.186-1.782 3.968-3.968 3.968-2.186 0-3.968-1.782-3.968-3.968 0-2.185 1.782-3.968 3.968-3.968a3.95 3.95 0 0 1 1.714.394v-3.834a7.614 7.614 0 0 0-1.714-.196C4.43 7.737 1 11.168 1 15.333c0 4.166 3.43 7.597 7.596 7.597 4.166 0 7.596-3.431 7.596-7.597V9.882a8.436 8.436 0 0 0 5.432 1.986V8.21c-1.353 0-2.607-.503-3.565-1.34Z" />
                        </svg>
                    </a>
                </div>
            </header>

            <div className={styles.grid}>
                {PROJECTS.map((project) => (
                    <div key={project.id} className={styles.projectCard}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={project.url}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.info}>
                            <h3 className={styles.projectTitle}>{project.title}</h3>
                            <p className={styles.projectStyle}>{project.style}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
