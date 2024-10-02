'use client';
import { useState } from 'react';
import styles from '../../styles/share-form.module.css';
import Balancer from 'react-wrap-balancer';
import { addTestimonial } from '@/src/actions/action';
import { TestimonialCategory } from '@/src/utils/types';
import Image from 'next/image';

export function ShareForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<{
    date: string;
    testimonial: string;
    category: string;
    image: {
      url: string;
      file: File | null;
    };
  }>({
    date: new Date().toISOString().split('T')[0],
    testimonial: '',
    category: '',
    image: {
      url: '',
      file: null,
    },
  });

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = e.target.files?.[0] ?? null;

    reader.onload = function () {
      setForm({
        ...form,
        image: {
          file: file,
          url: reader.result as string,
        },
      });
    };

    reader.readAsDataURL(file as Blob);
  };

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
        category: form.category as TestimonialCategory,
      });
      alert('¡Gracias por compartir tu testimonio! Será revisado y publicado pronto.');
      setForm({
        date: new Date().toISOString().split('T')[0],
        testimonial: '',
        category: '',
        image: {
          url: '',
          file: null,
        },
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

      <label htmlFor='image'>Imagen</label>
      <div className={styles.upload}>
        <button
          role='button'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            const image = document.getElementById('image');
            image?.click();
          }}
          className='p-3 rounded-lg bg-neutral-100'
        >
          Sube una imagen
        </button>
        <input
          id='image'
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleUploadImage}
        />
      </div>
      {form.image.file && (
        <div>
          <Image
            src={form.image.url}
            alt='Imagen'
            className={styles.image}
            width={272}
            height={272}
          />
          <button
            className={styles.remove}
            role='button'
            type='button'
            onClick={() => {
              setForm({
                ...form,
                image: {
                  url: '',
                  file: null,
                },
              });
            }}
          >
            Remover imagen
          </button>
        </div>
      )}

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

      <label htmlFor='category'>Categoría</label>
      <select
        id='category'
        value={form.category}
        onChange={(event) => {
          setForm({
            ...form,
            category: event.target.value,
          });
        }}
      >
        <option value=''>Selecciona una categoría</option>
        <option value={TestimonialCategory.MIGRATION_EXILE}>Migración y exilio</option>
        <option value={TestimonialCategory.REPRESSION_VIOLENCE}>
          Represión y violencia
        </option>
        <option value={TestimonialCategory.LIVING_CONDITIONS}>Condiciones de vida</option>
        <option value={TestimonialCategory.FAMILY_SEPARATION}>Separación familiar</option>
        <option value={TestimonialCategory.HEALTH_ISSUES}>Problemas de salud</option>
        <option value={TestimonialCategory.HOPELESSNESS_FUTURE}>
          Sin esperanza y futuro
        </option>
      </select>

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
