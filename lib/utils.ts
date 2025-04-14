/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @/lib/utils.ts

import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combine des classes CSS avec clsx et les merge avec tailwind-merge
 * pour éviter les conflits entre les classes Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formate une date en français
 */
export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

/**
 * Convertit des octets en format lisible (Ko, Mo, Go, etc.)
 */
export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Octets"

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Octets", "Ko", "Mo", "Go", "To", "Po", "Eo", "Zo", "Yo"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

/**
 * Retarde l'exécution d'une fonction (pour les tests ou les debounces)
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Vérifie si l'environnement est en développement
 */
export const isDev = process.env.NODE_ENV === "development"

/**
 * Vérifie si l'environnement est en production
 */
export const isProd = process.env.NODE_ENV === "production"

/**
 * Extrait les erreurs depuis une réponse API ou une erreur
 */
export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  if (typeof error === "string") return error
  if (error && typeof error === "object" && "message" in error) 
    return String(error.message)
  return "Une erreur inconnue est survenue"
}

/**
 * Crée un objet URLSearchParams à partir d'un objet
 */
export function createQueryString(params: Record<string, string | number | boolean>) {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    searchParams.set(key, String(value))
  })
  return searchParams.toString()
}

/**
 * Valide une adresse email
 */
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * Capitalize la première lettre d'une chaîne
 */
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Génère un ID unique
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 9)
}

/**
 * Formate un nombre avec des séparateurs de milliers
 */
export function formatNumber(num: number) {
  return new Intl.NumberFormat("fr-FR").format(num)
}

/**
 * Filtre les propriétés undefined d'un objet
 */
export function filterUndefined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined)
  ) as Partial<T>
}

/**
 * Deep merge deux objets
 */
export function deepMerge<T extends object, U extends object>(target: T, source: U): T & U {
  const output = { ...target } as any
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (
        typeof source[key] === "object" &&
        source[key] !== null &&
        !Array.isArray(source[key])
      ) {
        output[key] = deepMerge(output[key] || {}, source[key])
      } else {
        output[key] = source[key]
      }
    }
  }
  return output
}