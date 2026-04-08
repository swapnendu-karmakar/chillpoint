// Complete menu data for Chill Point
// These serve as fallback data when Supabase is not configured

export const CATEGORIES = [
  { id: 'chaat', label: 'Chaat', emoji: '🍛', color: 'from-orange-400 to-red-500' },
  { id: 'sandwich', label: 'Sandwich', emoji: '🥪', color: 'from-yellow-400 to-orange-400' },
  { id: 'pizza', label: 'Pizza', emoji: '🍕', color: 'from-red-400 to-rose-500' },
  { id: 'ice_slush', label: 'Ice Slush', emoji: '🧊', color: 'from-blue-400 to-cyan-400' },
  { id: 'puff', label: 'Puff', emoji: '🥐', color: 'from-amber-400 to-yellow-400' },
  { id: 'maggi', label: 'Maggi', emoji: '🍜', color: 'from-yellow-500 to-amber-500' },
  { id: 'fries', label: 'Fries', emoji: '🍟', color: 'from-yellow-400 to-orange-500' },
]

export const MENU_ITEMS = [
  // CHAAT
  { id: 1, name: 'Pani Puri', category: 'chaat', price: 20, is_available: true, is_popular: true, is_veg: true },
  { id: 2, name: 'Rava Pani Puri', category: 'chaat', price: 30, is_available: true, is_popular: false, is_veg: true },
  { id: 3, name: 'Masala Puri', category: 'chaat', price: 30, is_available: true, is_popular: true, is_veg: true },
  { id: 4, name: 'Sev Puri', category: 'chaat', price: 40, is_available: true, is_popular: false, is_veg: true },
  { id: 5, name: 'Bhel', category: 'chaat', price: 40, is_available: true, is_popular: false, is_veg: true },
  { id: 6, name: 'Chutney Puri', category: 'chaat', price: 40, is_available: true, is_popular: false, is_veg: true },
  { id: 7, name: 'Dahi Puri', category: 'chaat', price: 50, is_available: true, is_popular: true, is_veg: true },
  { id: 8, name: 'Cheese Masala Puri', category: 'chaat', price: 50, is_available: true, is_popular: false, is_veg: true },
  { id: 9, name: 'Cheese Sev Puri', category: 'chaat', price: 70, is_available: true, is_popular: false, is_veg: true },
  { id: 10, name: 'Cheese Dahi Puri', category: 'chaat', price: 70, is_available: true, is_popular: false, is_veg: true },

  // SANDWICH
  { id: 11, name: 'Bread Butter Jam', category: 'sandwich', price: 50, is_available: true, is_popular: false, is_veg: true },
  { id: 12, name: 'Bread Butter Chocolate', category: 'sandwich', price: 50, is_available: true, is_popular: false, is_veg: true },
  { id: 13, name: 'Veg Sandwich', category: 'sandwich', price: 60, is_available: true, is_popular: false, is_veg: true },
  { id: 14, name: 'Veg Cheese Sandwich', category: 'sandwich', price: 100, is_available: true, is_popular: true, is_veg: true },
  { id: 15, name: 'Veg Grill Sandwich', category: 'sandwich', price: 100, is_available: true, is_popular: true, is_veg: true },
  { id: 16, name: 'Veg Cheese Grill', category: 'sandwich', price: 110, is_available: true, is_popular: false, is_veg: true },
  { id: 17, name: 'Panini Sandwich', category: 'sandwich', price: 140, is_available: true, is_popular: true, is_veg: true },

  // ICE SLUSH
  { id: 18, name: 'Orange', category: 'ice_slush', price: 30, is_available: true, is_popular: false, is_veg: true },
  { id: 19, name: 'Blue Berry', category: 'ice_slush', price: 30, is_available: true, is_popular: false, is_veg: true },
  { id: 20, name: 'Rose', category: 'ice_slush', price: 30, is_available: true, is_popular: false, is_veg: true },
  { id: 21, name: 'Kala Khatta', category: 'ice_slush', price: 30, is_available: true, is_popular: true, is_veg: true },
  { id: 22, name: 'Strawberry', category: 'ice_slush', price: 30, is_available: true, is_popular: false, is_veg: true },
  { id: 23, name: 'Black Current', category: 'ice_slush', price: 30, is_available: true, is_popular: false, is_veg: true },
  { id: 24, name: 'Lime', category: 'ice_slush', price: 30, is_available: true, is_popular: false, is_veg: true },
  { id: 25, name: 'Cola', category: 'ice_slush', price: 30, is_available: true, is_popular: false, is_veg: true },
  { id: 26, name: 'Mint', category: 'ice_slush', price: 30, is_available: true, is_popular: false, is_veg: true },
  { id: 27, name: 'Pineapple', category: 'ice_slush', price: 30, is_available: true, is_popular: false, is_veg: true },
  { id: 28, name: 'Raw Mango', category: 'ice_slush', price: 30, is_available: true, is_popular: true, is_veg: true },

  // PIZZA
  { id: 29, name: 'Margherita', category: 'pizza', price: 110, is_available: true, is_popular: false, is_veg: true },
  { id: 30, name: 'Cheesy Heaven', category: 'pizza', price: 150, is_available: true, is_popular: true, is_veg: true },
  { id: 31, name: 'Exotic Cheesy Italian', category: 'pizza', price: 150, is_available: true, is_popular: false, is_veg: true },
  { id: 32, name: 'Mexican', category: 'pizza', price: 160, is_available: true, is_popular: false, is_veg: true },
  { id: 33, name: 'Tandoori Paneer', category: 'pizza', price: 160, is_available: true, is_popular: true, is_veg: true },

  // PUFF
  { id: 34, name: 'Butter Puff', category: 'puff', price: 20, is_available: true, is_popular: false, is_veg: true },
  { id: 35, name: 'Masala Puff', category: 'puff', price: 35, is_available: true, is_popular: false, is_veg: true },
  { id: 36, name: 'Cheese Butter Puff', category: 'puff', price: 40, is_available: true, is_popular: true, is_veg: true },

  // MAGGI
  { id: 37, name: 'Classic Maggi', category: 'maggi', price: 50, is_available: true, is_popular: false, is_veg: true },
  { id: 38, name: 'Cheese Maggi', category: 'maggi', price: 70, is_available: true, is_popular: true, is_veg: true },
  { id: 39, name: 'Vegetable Maggi', category: 'maggi', price: 70, is_available: true, is_popular: false, is_veg: true },

  // FRIES
  { id: 40, name: 'Salted Fries', category: 'fries', price: 60, is_available: true, is_popular: false, is_veg: true },
  { id: 41, name: 'Peri Peri Fries', category: 'fries', price: 70, is_available: true, is_popular: true, is_veg: true },
  { id: 42, name: 'Extra Cheese', category: 'fries', price: 30, is_available: true, is_popular: false, is_veg: true },
]

export const SAMPLE_REVIEWS = [
  {
    id: 1,
    name: 'Priya Shah',
    rating: 5,
    comment: 'Best pani puri in Vadodara! The taste is just like home. Comes here every week without fail.',
    created_at: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    name: 'Rohan Patel',
    rating: 5,
    comment: 'The Cheese Maggi and Peri Peri Fries are absolutely divine. Super affordable and hygienic place!',
    created_at: '2024-01-20T14:00:00Z',
  },
  {
    id: 3,
    name: 'Meera Desai',
    rating: 4,
    comment: 'Love the ice slush flavors, especially Kala Khatta. Great hangout spot in evenings.',
    created_at: '2024-02-01T17:45:00Z',
  },
  {
    id: 4,
    name: 'Arjun Mehta',
    rating: 5,
    comment: 'Cheesy Heaven pizza at just ₹150 is a steal! The Panini Sandwich is also amazing. Must visit!',
    created_at: '2024-02-10T12:00:00Z',
  },
]
