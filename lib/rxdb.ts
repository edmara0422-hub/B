'use client'

import { createRxDatabase } from 'rxdb'
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory'

let dbPromise: any = null

export async function getDatabase() {
  if (typeof window === 'undefined') return null

  if (!dbPromise) {
    dbPromise = (async () => {
      try {
        const db = await createRxDatabase({
          name: 'ipb_strategic_db',
          storage: getRxStorageMemory(),
        })

        await db.addCollections({
          dossier: {
            schema: {
              title: 'dossier schema',
              version: 0,
              primaryKey: 'id',
              type: 'object',
              properties: {
                id: { type: 'string', maxLength: 100 },
                title: { type: 'string' },
                ocean: { type: 'string' },
                copy: { type: 'string' },
                ebitda: { type: 'number' },
                ltvCac: { type: 'number' },
                tdbd: { type: 'number' },
                sequestroAmigdala: { type: 'number' },
                friccaoPersonagem: { type: 'number' },
                custoDopaminergico: { type: 'number' },
                verdict: { type: 'string' },
                updatedAt: { type: 'number' }
              },
              required: ['id']
            }
          }
        })

        // Warm up / Load the initial cached dossier from localStorage into memory
        try {
          const cached = localStorage.getItem('ipb_strategic_dossier_cache')
          if (cached) {
            const parsed = JSON.parse(cached)
            await db.dossier.upsert(parsed)
          }
        } catch (err) {
          console.warn("Could not load initial localStorage cache into RxDB:", err)
        }

        return db
      } catch (err) {
        console.error("Failed to initialize RxDB database:", err)
        return null
      }
    })()
  }

  return dbPromise
}

/**
 * Saves a strategic dossier into the local database and synchronizes with storage cache.
 */
export async function saveStrategicDossier(data: {
  title: string
  ocean: string
  copy: string
  ebitda: number
  ltvCac: number
  tdbd: number
  sequestroAmigdala: number
  friccaoPersonagem: number
  custoDopaminergico: number
  verdict: string
}) {
  if (typeof window === 'undefined') return

  try {
    const db = await getDatabase()
    if (!db) return

    const record = {
      id: 'active_calibration',
      ...data,
      updatedAt: Date.now()
    }

    // Upsert into RxDB memory collection
    await db.dossier.upsert(record)

    // Synchronize to localStorage disk for persistence across page reloads
    localStorage.setItem('ipb_strategic_dossier_cache', JSON.stringify(record))
  } catch (err) {
    console.error("Failed to save dossier to RxDB:", err)
  }
}

/**
 * Loads the active strategic dossier from the local-first database cache.
 */
export async function loadStrategicDossier() {
  if (typeof window === 'undefined') return null

  try {
    const db = await getDatabase()
    if (!db) {
      // Fallback directly to localStorage if db initialization is pending
      const cached = localStorage.getItem('ipb_strategic_dossier_cache')
      return cached ? JSON.parse(cached) : null
    }

    const doc = await db.dossier.findOne('active_calibration').exec()
    if (doc) {
      return doc.toJSON()
    }

    // Fallback if not populated in memory yet
    const cached = localStorage.getItem('ipb_strategic_dossier_cache')
    return cached ? JSON.parse(cached) : null
  } catch (err) {
    console.error("Failed to read dossier from RxDB:", err)
    return null
  }
}
