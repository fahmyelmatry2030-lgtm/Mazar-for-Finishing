import { create } from 'zustand'
import {
  fetchProjects, addProjectFS, updateProjectFS,
  fetchClients, addClientFS,
  fetchQuotes, addQuoteFS, updateQuoteFS,
  fetchWebContent, saveWebContentFS
} from '../services/firestoreService'

export const useStore = create((set, get) => ({

  // ── Auth handled by Firebase onAuthStateChanged in App.jsx ────────────────

  // ── Loading state ─────────────────────────────────────────────────────────
  loading: true,
  dataLoaded: false,

  // ── Initialize: Load all data from Firestore ──────────────────────────────
  initializeData: async () => {
    if (get().dataLoaded) return
    set({ loading: true })
    try {
      const [projects, clients, quotes, webContent] = await Promise.all([
        fetchProjects(),
        fetchClients(),
        fetchQuotes(),
        fetchWebContent(),
      ])
      set({ projects, clients, quotes, webContent, loading: false, dataLoaded: true })
    } catch (err) {
      console.error('Firebase init error:', err)
      set({ loading: false, dataLoaded: true })
    }
  },

  // ── Projects ──────────────────────────────────────────────────────────────
  projects: [],
  addProject: async (project) => {
    const id = await addProjectFS(project)
    set(state => ({ projects: [...state.projects, { ...project, id }] }))
  },
  updateProjectStatus: async (id, newStatus) => {
    await updateProjectFS(id, { status: newStatus })
    set(state => ({
      projects: state.projects.map(p => p.id === id ? { ...p, status: newStatus } : p)
    }))
  },

  // ── Clients ───────────────────────────────────────────────────────────────
  clients: [],
  addClient: async (client) => {
    const id = await addClientFS(client)
    set(state => ({ clients: [...state.clients, { ...client, id }] }))
  },

  // ── Quotations ────────────────────────────────────────────────────────────
  quotes: [],
  addQuote: async (quote) => {
    const id = await addQuoteFS(quote)
    set(state => ({ quotes: [{ ...quote, id }, ...state.quotes] }))
  },
  updateQuoteStatus: async (id, status) => {
    await updateQuoteFS(id, { status })
    set(state => ({
      quotes: state.quotes.map(q => q.id === id ? { ...q, status } : q)
    }))
  },

  // ── CMS Web Content ───────────────────────────────────────────────────────
  webContent: {
    hero: { subtitle: '', titleHighlight: '', titleNormal: '', description: '' },
    services: [],
    portfolio: []
  },
  updateHero: async (heroData) => {
    const newContent = { ...get().webContent, hero: heroData }
    await saveWebContentFS({ hero: heroData })
    set({ webContent: newContent })
  },
  addPortfolioItem: async (item) => {
    const newPortfolio = [
      { ...item, id: Date.now() },
      ...get().webContent.portfolio
    ]
    const newContent = { ...get().webContent, portfolio: newPortfolio }
    await saveWebContentFS({ portfolio: newPortfolio })
    set({ webContent: newContent })
  },

}))
