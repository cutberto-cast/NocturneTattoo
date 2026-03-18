import Footer from "../../components/Footer";
import Link from "next/link";
import styles from "./Privacidad.module.css";

export const metadata = {
  title: "Aviso de Privacidad | Black Pulse Studio",
  description: "Aviso de privacidad y descargo de responsabilidad del estudio prototipo.",
};

export default function Privacidad() {
  return (
    <main className={styles.mainContainer}>
      <section className={styles.contentSection}>
        <div className="container">
          <Link href="/" className={styles.backButton}>
            ← Volver al Inicio
          </Link>
          <h1 className={styles.title}>Aviso de Privacidad</h1>
          
          <div className={styles.contentBox}>
            <p className={styles.date}>Última actualización: Marzo 2026</p>
            
            <h2 className={styles.subtitle}>1. Naturaleza del Proyecto</h2>
            <p className={styles.text}>
              Esta página web es un prototipo desarrollado estrictamente con fines de demostración para un portafolio profesional. "Black Pulse Studio" es una entidad ficticia creada para demostrar habilidades de desarrollo web, diseño UI/UX y conceptualización de marca.
            </p>
            
            <h2 className={styles.subtitle}>2. Contenido e Imágenes Generadas por IA</h2>
            <p className={styles.text}>
              Todo el contenido visual de este sitio, incluyendo pero no limitado a: diseños de tatuajes, fotografías de artistas, imágenes del estudio, de procesos y videos de fondo, han sido generados mediante el uso de herramientas de Inteligencia Artificial (IA). 
            </p>
            <p className={styles.text}>
              Las personas, tatuajes y espacios mostrados no existen en la realidad y cualquier parecido con personas vivas o muertas, o con estudios de tatuaje reales, es pura coincidencia.
            </p>

            <h2 className={styles.subtitle}>3. Recopilación de Datos</h2>
            <p className={styles.text}>
              Dado que este sitio es un entorno de pruebas, no se realiza ninguna recopilación real, almacenamiento o procesamiento de datos personales de los visitantes. Los botones de contacto, formularios de agendamiento y redes sociales son elementos de diseño inactivos o simulados.
            </p>

            <h2 className={styles.subtitle}>4. Créditos de Desarrollo</h2>
            <p className={styles.text}>
              Este prototipo web ha sido conceptualizado y desarrollado por AXCAP. Para más información sobre proyectos similares o contacto profesional, por favor dirígete a <a href="https://www.axcap.shop" target="_blank" rel="noopener noreferrer" className={styles.link}>www.axcap.shop</a>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
