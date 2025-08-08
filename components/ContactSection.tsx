'use client'

import Reveal from '@/components/motion/Reveal'
import MagneticButton from '@/components/ui/MagneticButton'
import { useFormState, useFormStatus } from 'react-dom'
import { sendContact, type ContactState } from '@/app/actions/sendContact'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <MagneticButton
      disabled={pending}
      className="bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white px-4 py-2 text-sm font-medium rounded-md"
    >
      {pending ? 'Sending…' : 'Send message'}
    </MagneticButton>
  )
}

const initialState: ContactState = { ok: false }

export default function ContactSection() {
  const [state, formAction] = useFormState(sendContact, initialState)

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
      <Reveal>
        <p className="text-sm uppercase tracking-widest text-neutral-300">Contact</p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Let’s work together</h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="mt-3 text-neutral-300 max-w-2xl">
          Tell me about your project or say hi. I usually reply within 1–2 business days.
        </p>
      </Reveal>

      {/* Success banner */}
      {state.ok && state.message && (
        <div className="mt-6 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-neutral-200">
          {state.message}
        </div>
      )}

      <Reveal delay={0.18}>
        <form action={formAction} className="mt-6 grid gap-4 max-w-xl">
          {/* Honeypot (hidden) */}
          <input
            type="text"
            name="website"
            autoComplete="off"
            tabIndex={-1}
            className="hidden"
            aria-hidden="true"
          />

          <div>
            <label htmlFor="name" className="block text-sm text-neutral-300">Name</label>
            <input
              id="name"
              name="name"
              required
              className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-neutral-400 focus:border-white/20"
              placeholder="Your name"
            />
            {state.errors?.name && (
              <p className="mt-1 text-xs text-red-300">{state.errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-neutral-300">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-neutral-400 focus:border-white/20"
              placeholder="you@domain.com"
            />
            {state.errors?.email && (
              <p className="mt-1 text-xs text-red-300">{state.errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm text-neutral-300">Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-neutral-400 focus:border-white/20"
              placeholder="What are you building and how can I help?"
            />
            {state.errors?.message && (
              <p className="mt-1 text-xs text-red-300">{state.errors.message}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <SubmitButton />
            <span className="text-xs text-neutral-400">
              I’ll never share your info. This form has basic spam protection.
            </span>
          </div>
        </form>
      </Reveal>
    </section>
  )
}
