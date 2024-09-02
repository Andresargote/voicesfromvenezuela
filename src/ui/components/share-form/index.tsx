'use client';
import { useState } from 'react';
import styles from '../../styles/share-form.module.css';
import Balancer from 'react-wrap-balancer';
import { addTestimonial } from '@/src/actions/action';

export function ShareForm() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!message) {
        alert('Por favor, escribe un testimonio antes de enviar.');
        return;
      }

      if (message.length < 10) {
        alert('Por favor, escribe un testimonio más largo.');
        return;
      }

      if (message.length > 800) {
        alert('Por favor, escribe un testimonio más corto, de menos de 800 caracteres.');
        return;
      }

      await addTestimonial(message);
      alert('¡Gracias por compartir tu testimonio! Será revisado y publicado pronto.');
      setMessage('');
    } catch (error) {
      console.error(error);
      alert('Ha ocurrido un error al enviar tu testimonio. Por favor, intenta de nuevo.');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form_warning}>
        <p>
          <Balancer>
            <strong>¡Atención!</strong> Por favor, evita compartir información personal
            que pueda identificarte.
          </Balancer>
        </p>
      </div>
      <textarea
        value={message}
        placeholder='Comparte tu testimonio'
        onChange={(v) => {
          setMessage(v.target.value);
        }}
      ></textarea>
      <button type='submit'>Enviar</button>
      <p>
        <Balancer>
          Cuando envíes tu testimonio, este seguirá un proceso en cuatro pasos: primero,
          será revisado y aprobado por nuestros moderadores. Luego, corregiremos cualquier
          error ortográfico sin alterar el mensaje original. Después, traduciremos el
          testimonio a varios idiomas para asegurar que se mantenga preciso y claro.{' '}
          <strong>
            Ten en cuenta que tu testimonio es 100% anónimo durante todo el proceso.
          </strong>
        </Balancer>
      </p>
    </form>
  );
}
