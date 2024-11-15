'use client';
import { useActionState } from 'react';
import { contact } from '@/actions';
import { useContactForm } from '@/hooks';
import styles from './ContactForm.module.css';

export const ContactForm = () => {
  const [state, formAction, isPending] = useActionState(contact, {
    message: '',
  });

  const { methods, onSubmit } = useContactForm({ formAction });
  const { formState } = methods;
  const { errors } = formState;

  console.log('state contactForm', state);
  console.log('isPending', isPending);

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <fieldset className={styles.fieldset}>
        <label className={styles.label}>Name</label>
        <input
          className={styles.input}
          autoComplete="username"
          type="text"
          {...methods.register('name', {
            required: { message: 'Name is required', value: true },
          })}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </fieldset>

      <fieldset className={styles.fieldset}>
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          autoComplete="username"
          type="text"
          {...methods.register('email', {
            required: { message: 'Email is required', value: true },
            pattern: {
              message: 'Email is invalid',
              value: /\S+@\S+\.\S+/,
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </fieldset>

      <fieldset className={styles.fieldset}>
        <label className={styles.label}>Message</label>
        <textarea
          className={styles.input}
          {...methods.register('message', {
            required: { message: 'Message is required', value: true },
            minLength: { message: 'Message is too short', value: 10 },
          })}
          rows={5}
          cols={3}
        />
        {errors.message && <span>{errors.message.message}</span>}
      </fieldset>

      <button className={styles.button} type="submit">
        Contact
      </button>
    </form>
  );
};
