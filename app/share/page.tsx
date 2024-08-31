import Balancer from 'react-wrap-balancer';
import styles from '../page.module.css';
import Link from 'next/link';

export default function Share() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.header_container}>
            <h1 className={styles.header_title}>
              <Link href='/'>Voices from Venezuela</Link>
            </h1>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <form className={styles.form}>
            <div className={styles.form_warning}>
              <p>
                <Balancer>
                  <strong>¡Atención!</strong> Por favor, evita compartir información
                  personal que pueda identificarte.
                </Balancer>
              </p>
            </div>
            <textarea placeholder='Comparte tu testimonio'></textarea>
            <button>Enviar</button>
            <p>
              <Balancer>
                Cuando envíes tu testimonio, este seguirá un proceso en cuatro pasos:
                primero, será revisado y aprobado por nuestros moderadores. Luego,
                corregiremos cualquier error ortográfico sin alterar el mensaje original.
                Después, traduciremos el testimonio a varios idiomas para asegurar que se
                mantenga preciso y claro.{' '}
                <strong>
                  Ten en cuenta que tu testimonio es 100% anónimo durante todo el proceso.
                </strong>
              </Balancer>
            </p>
          </form>
        </div>
      </main>
    </>
  );
}
