import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { MENU_ITEMS, SAMPLE_REVIEWS } from '../data/menuData'

// Hook to fetch and manage menu items
export function useMenu() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [useLocal, setUseLocal] = useState(false)

  useEffect(() => {
    fetchMenuItems()
  }, [])

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
      // Fallback to local data if Supabase not configured
      console.warn('Supabase not configured, using local data:', err.message)
      setItems(MENU_ITEMS)
      setUseLocal(true)
    } finally {
      setLoading(false)
    }
  }

  async function toggleAvailability(id, currentStatus) {
    if (useLocal) {
      setItems(prev =>
        prev.map(item => item.id === id ? { ...item, is_available: !currentStatus } : item)
      )
      return
    }
    try {
      const { error } = await supabase
        .from('menu_items')
        .update({ is_available: !currentStatus })
        .eq('id', id)
      if (error) throw error
      setItems(prev =>
        prev.map(item => item.id === id ? { ...item, is_available: !currentStatus } : item)
      )
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

  return { items, loading, error, toggleAvailability, addMenuItem, deleteMenuItem, refetch: fetchMenuItems }
}

// Hook for reviews
export function useReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [useLocal, setUseLocal] = useState(false)

  useEffect(() => {
    fetchReviews()
  }, [])

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
      const newReview = {
        ...review,
        id: Date.now(),
        created_at: new Date().toISOString(),
      }
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
