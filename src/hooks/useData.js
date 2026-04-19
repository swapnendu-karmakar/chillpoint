import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { MENU_ITEMS, SAMPLE_REVIEWS, CATEGORIES as FALLBACK_CATEGORIES } from '../data/menuData'

// -------------------------------------------------------
// useCategories — fetches categories from Supabase
// -------------------------------------------------------
export function useCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [useLocal, setUseLocal] = useState(false)

  useEffect(() => { fetchCategories() }, [])

  async function fetchCategories() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: true })
      if (error) throw error
      setCategories(data || [])
    } catch (err) {
      console.warn('Supabase categories unavailable, using local:', err.message)
      setCategories(FALLBACK_CATEGORIES)
      setUseLocal(true)
    } finally {
      setLoading(false)
    }
  }

  async function addCategory(cat) {
    if (useLocal) {
      setCategories(prev => [...prev, cat])
      return { error: null }
    }
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([cat])
        .select()
      if (error) throw error
      setCategories(prev => [...prev, data[0]])
      return { error: null }
    } catch (err) {
      return { error: err }
    }
  }

  async function deleteCategory(id) {
    if (useLocal) {
      setCategories(prev => prev.filter(c => c.id !== id))
      return { error: null }
    }
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)
      if (error) throw error
      setCategories(prev => prev.filter(c => c.id !== id))
      return { error: null }
    } catch (err) {
      return { error: err }
    }
  }

  return { categories, loading, addCategory, deleteCategory, refetch: fetchCategories }
}

// -------------------------------------------------------
// useAdmin — PBKDF2 password verify & change via admin_config
// Auto-migrates plaintext passwords to hashed on first login
// -------------------------------------------------------
export function useAdmin() {
  async function verifyPassword(input) {
    try {
      const { data, error } = await supabase
        .from('admin_config')
        .select('value')
        .eq('id', 'admin_password')
        .single()
      if (error) throw error

      const { isHashed, verifyPassword: cryptoVerify, hashPassword } = await import('../lib/crypto.js')

      // ── Auto-migration: plaintext → PBKDF2 hash ──
      if (!isHashed(data.value)) {
        const isCorrect = input === data.value
        if (isCorrect) {
          const { hash, salt } = await hashPassword(input)
          await supabase
            .from('admin_config')
            .update({ value: JSON.stringify({ hash, salt }), updated_at: new Date().toISOString() })
            .eq('id', 'admin_password')
        }
        return isCorrect
      }

      // ── Normal path: verify against stored PBKDF2 hash ──
      const stored = JSON.parse(data.value)
      return await cryptoVerify(input, stored)
    } catch {
      return input === 'chillpoint2024'
    }
  }

  async function changePassword(newPw) {
    try {
      const { hashPassword } = await import('../lib/crypto.js')
      const { hash, salt } = await hashPassword(newPw)
      const { error } = await supabase
        .from('admin_config')
        .update({ value: JSON.stringify({ hash, salt }), updated_at: new Date().toISOString() })
        .eq('id', 'admin_password')
      if (error) throw error
      return { error: null }
    } catch (err) {
      return { error: err }
    }
  }

  return { verifyPassword, changePassword }
}

// -------------------------------------------------------
// useMenu — fetch and fully manage menu items
// -------------------------------------------------------
export function useMenu() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [useLocal, setUseLocal] = useState(false)

  useEffect(() => { fetchMenuItems() }, [])

  async function fetchMenuItems() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('category', { ascending: true })
      if (error) throw error
      setItems(data || [])
    } catch (err) {
      console.warn('Supabase not configured, using local data:', err.message)
      setItems(MENU_ITEMS)
      setUseLocal(true)
    } finally {
      setLoading(false)
    }
  }

  async function toggleAvailability(id, currentStatus) {
    if (useLocal) {
      setItems(prev => prev.map(item => item.id === id ? { ...item, is_available: !currentStatus } : item))
      return
    }
    try {
      const { error } = await supabase
        .from('menu_items')
        .update({ is_available: !currentStatus })
        .eq('id', id)
      if (error) throw error
      setItems(prev => prev.map(item => item.id === id ? { ...item, is_available: !currentStatus } : item))
    } catch (err) {
      console.error('Error toggling availability:', err)
    }
  }

  async function addMenuItem(item) {
    if (useLocal) {
      const newItem = { ...item, id: Date.now(), is_veg: true }
      setItems(prev => [...prev, newItem])
      return { data: newItem, error: null }
    }
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .insert([item])
        .select()
      if (error) throw error
      setItems(prev => [...prev, data[0]])
      return { data: data[0], error: null }
    } catch (err) {
      return { data: null, error: err }
    }
  }

  async function updateMenuItem(id, updates) {
    if (useLocal) {
      setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item))
      return { error: null }
    }
    try {
      const { error } = await supabase
        .from('menu_items')
        .update(updates)
        .eq('id', id)
      if (error) throw error
      setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item))
      return { error: null }
    } catch (err) {
      console.error('Error updating item:', err)
      return { error: err }
    }
  }

  async function deleteMenuItem(id) {
    if (useLocal) {
      setItems(prev => prev.filter(item => item.id !== id))
      return
    }
    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id)
      if (error) throw error
      setItems(prev => prev.filter(item => item.id !== id))
    } catch (err) {
      console.error('Error deleting item:', err)
    }
  }

  return { items, loading, toggleAvailability, addMenuItem, updateMenuItem, deleteMenuItem, refetch: fetchMenuItems }
}

// -------------------------------------------------------
// useReviews — fetch and submit reviews
// -------------------------------------------------------
export function useReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [useLocal, setUseLocal] = useState(false)

  useEffect(() => { fetchReviews() }, [])

  async function fetchReviews() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      setReviews(data || [])
    } catch (err) {
      console.warn('Using sample reviews:', err.message)
      setReviews(SAMPLE_REVIEWS)
      setUseLocal(true)
    } finally {
      setLoading(false)
    }
  }

  async function submitReview(review) {
    if (useLocal) {
      const newReview = { ...review, id: Date.now(), created_at: new Date().toISOString() }
      setReviews(prev => [newReview, ...prev])
      return { error: null }
    }
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([review])
        .select()
      if (error) throw error
      setReviews(prev => [data[0], ...prev])
      return { error: null }
    } catch (err) {
      return { error: err }
    }
  }

  return { reviews, loading, submitReview }
}