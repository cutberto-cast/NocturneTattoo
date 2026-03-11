"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Footer.module.css";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        gsap.fromTo(
            `.${styles.column}`,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: `.${styles.agendaGrid}`,
                    start: "top 90%",
                }
            }
        );
    }, { scope: containerRef });

    return (
        <footer id="visitanos" className={styles.footerSection} ref={containerRef}>
            <div className="container">

                {/* Agenda Section inside footer context */}
                <div className={styles.agendaGrid}>
                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Horarios</h4>
                        <div className={styles.infoText}>
                            Lunes a Sábado<br />
                            <span className={styles.highlight}>11:00 — 20:00</span><br />
                            Domingo<br />
                            <span className={styles.highlight}>Con Cita Previa</span>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Ubicación</h4>
                        <div className={styles.infoText}>
                            Avenida Principal 1234, Paseo del Arte<br />
                            Ciudad Cosmopolita, C.P. 10000<br />
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Contacto</h4>
                        <div className={styles.infoText}>
                            Agendamiento vía WhatsApp<br />
                            Tiempo estimado de respuesta:<br />
                            <span className={styles.highlight}>2 - 4 Horas Hábiles</span>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <div className={styles.logo}>Black Pulse</div>

                    <div className={styles.socials}>
                        <a href="#" className={styles.socialLink}>Instagram</a>
                        <a href="#" className={styles.socialLink}>WhatsApp</a>
                        <a href="#" className={styles.socialLink}>Dirección</a>
                    </div>

                    <div className={styles.copyright}>
                        © {new Date().getFullYear()} Black Pulse Studio. Ink as Permanent Art.
                    </div>
                </div>

            </div>
        </footer>
    );
}
