export interface CartItem {
  name: string
  category: string
  image: string
  plan: string
  pricePerMonth: number
  months: number
  quantity: number
}

export const MOCK_USER = {
  firstName: 'Sandra',
  lastName: 'Mitchell',
  email: 'sandra.mitchell@gmail.com',
  dob: '03/15/1985',
  gender: 'Female',
}

export const MOCK_ADDRESSES = [
  { id: 'addr1', label: 'Home', street: '13280 Evening Creek Dr S', city: 'San Diego', state: 'California', zip: '92129', phone: '888-299-5088' },
  { id: 'addr2', label: 'Work', street: '456 Market Street', city: 'San Francisco', state: 'California', zip: '94105', phone: '415-555-1234' },
]

export const MOCK_PAYMENTS = [
  { id: 'pay1', label: 'Visa ending in 4242', last4: '4242', brand: 'Visa', expiry: '12/27' },
  { id: 'pay2', label: 'Mastercard ending in 8888', last4: '8888', brand: 'Mastercard', expiry: '06/26' },
]

