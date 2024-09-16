'use client';
import { useState } from 'react';
import styles from '../../styles/share-form.module.css';
import Balancer from 'react-wrap-balancer';
import { addTestimonial } from '@/src/actions/action';

export function ShareForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    testimonial: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!form.testimonial) {
        alert('Por favor, escribe un testimonio antes de enviar.');
        return;
      }

      if (form.testimonial.length < 10) {
        alert('Por favor, escribe un testimonio más largo.');
        return;
      }

      if (form.testimonial.length > 800) {
        alert('Por favor, escribe un testimonio más corto, de menos de 800 caracteres.');
        return;
      }

      await addTestimonial({
        message: form.testimonial,
        date: form.date,
      });
      alert('¡Gracias por compartir tu testimonio! Será revisado y publicado pronto.');
      setForm({
        date: new Date().toISOString().split('T')[0],
        testimonial: '',
      });
    } catch (error) {
      console.error(error);
      alert('Ha ocurrido un error al enviar tu testimonio. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
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
      <label htmlFor='date'>Fecha</label>
      <input
        type='date'
        id='date'
        max={new Date().toISOString().split('T')[0]}
        min='2024-07-28'
        value={form.date}
        onChange={(e) => {
          setForm({
            ...form,
            date: e.target.value,
          });
        }}
      />

      <label htmlFor='testimonial'>Testimonio</label>
      <textarea
        id='testimonial'
        value={form.testimonial}
        placeholder='Comparte tu testimonio'
        onChange={(event) => {
          setForm({
            ...form,
            testimonial: event.target.value,
          });
        }}
      />

      <button type='submit' disabled={isLoading}>
        {isLoading ? 'Enviando...' : 'Enviar'}
      </button>
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
