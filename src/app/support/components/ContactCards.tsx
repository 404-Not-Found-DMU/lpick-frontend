'use client'

import { Phone, Mail, Clock } from 'lucide-react'
import { CONTACT_CARDS } from '../constants'

const iconMap = {
  phone: Phone,
  email: Mail,
  hours: Clock,
} as const

export function ContactCards() {
  return (
    <section className="py-6">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {CONTACT_CARDS.map((card) => {
          const Icon = iconMap[card.id as keyof typeof iconMap]
          return (
            <div
              key={card.id}
              className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow min-h-[150px] flex flex-col items-center justify-center text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30 mb-3">
                <Icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                {card.title}
              </div>
              <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                {card.id === 'phone' ? (
                  <a href={`tel:${card.value.replaceAll('-', '')}`} className="hover:underline">
                    {card.value}
                  </a>
                ) : card.id === 'email' ? (
                  <a href={`mailto:${card.value}`} className="hover:underline">
                    {card.value}
                  </a>
                ) : (
                  <span>{card.value}</span>
                )}
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500">{card.desc}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}


