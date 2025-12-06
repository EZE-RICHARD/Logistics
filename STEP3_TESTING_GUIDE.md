# Step 3 Implementation - Quick Reference & Testing Guide

## Quick Reference

### Functions Available

| Function | Purpose | Returns | When Called |
|----------|---------|---------|-------------|
| `validateStep3()` | Validates all Step 3 delivery details | `boolean` | Before proceeding from Step 3 |
| `validateParcel(element, index)` | Validates individual items in parcel | `array` of errors | After validateStep3() passes |
| `collectParcelsData()` | Collects and stores Step 3 data | `void` | After all validations pass |

---

## Data Structure Quick Reference

### What gets stored:

```javascript
shipmentData.deliveryDetails = {
  deliveryType,      // "Hub to Door" | "Hub to Hub"
  serviceType,       // "Express" | "Standard" | "Economy"
  departureState,    // State name
  departureHub,      // Hub name
  arrivalState,      // State name
  arrivalHub,        // Hub name
  businessName,      // Optional
  paymentOption,     // "Pay Now" | "Pay on Delivery" | "Wallet"
  couponCode         // Optional
}

shipmentData.items = [
  {
    itemIndex,       // 1, 2, 3, ...
    shipmentType,    // "Document" | "Parcel" | "Fragile" | "Perishable"
    declaredValue,   // "0 - 50,000" | "50,001 - 200,000" | ...
    weight,          // "0 - 1" | "1 - 5" | ...
    quantity,        // number
    description      // text
  },
  // More items...
]
```

---

## Testing Checklist

### ✅ Test 1: Navigation to Step 3
```
1. Open local_delivery.html in browser
2. Fill out Step 1 (Sender) → Click Next
3. Fill out Step 2 (Receiver) → Click Next
4. Verify you're on Step 3
Expected: Form shows delivery details and items section
```

### ✅ Test 2: Validation - Missing Delivery Details
```
1. Navigate to Step 3
2. Leave all fields empty
3. Try to click Next
4. Try clicking Next
Expected: Alert: "Please complete all package items information correctly."
Expected: Do NOT proceed to Step 4
```

### ✅ Test 3: Validation - Missing Items
```
1. Navigate to Step 3
2. Fill all delivery details
3. Leave items empty (delete if exists)
4. Click Next
Expected: Alert appears saying items required
Expected: Do NOT proceed to Step 4
```

### ✅ Test 4: Validation - Incomplete Item
```
1. Navigate to Step 3
2. Fill all delivery details
3. Add item but leave "Description" empty
4. Click Next
Expected: Alert shows: "..., Item #1: Description is required"
Expected: Do NOT proceed to Step 4
```

### ✅ Test 5: Validation - Invalid Quantity
```
1. Navigate to Step 3
2. Fill all delivery details
3. Add item with Quantity = 0
4. Click Next
Expected: Alert shows: "..., Item #1: Quantity must be at least 1"
Expected: Do NOT proceed to Step 4
```

### ✅ Test 6: Successful Collection - Single Item
```
1. Navigate to Step 3
2. Fill all delivery details:
   - Delivery Type: "Hub to Door"
   - Service Type: "Express"
   - Departure State: "Lagos"
   - Departure Hub: (any option)
   - Arrival State: "Abuja"
   - Arrival Hub: (any option)
   - Payment Option: "Pay Now"
3. Fill item details:
   - Shipment Type: "Parcel"
   - Declared Value: "50,001 - 200,000"
   - Weight: "1 - 5"
   - Quantity: 1
   - Description: "Test parcel"
4. Click Next
Expected: Proceed to Step 4
Expected: Console shows complete shipmentData with:
  - sender (from Step 1)
  - receiver (from Step 2)
  - deliveryDetails (Step 3)
  - items array (Step 3)
```

### ✅ Test 7: Successful Collection - Multiple Items
```
1. Navigate to Step 3
2. Fill all delivery details (same as Test 6)
3. Add first item (same as Test 6)
4. Click "+ Add Another Item"
5. Fill second item:
   - Shipment Type: "Document"
   - Declared Value: "0 - 50,000"
   - Weight: "0 - 1"
   - Quantity: 2
   - Description: "Documents"
6. Click Next
Expected: Proceed to Step 4
Expected: Console shows shipmentData.items array with 2 items
```

### ✅ Test 8: Optional Fields
```
1. Navigate to Step 3
2. Fill delivery details
3. Leave "Business Name" empty (it's optional)
4. Fill items
5. Leave "Coupon Code" empty (it's optional)
6. Click Next
Expected: Proceed successfully
Expected: businessName and couponCode will be empty strings in data
```

### ✅ Test 9: Backward Navigation
```
1. Complete Step 3
2. Go to Step 4
3. Use "Back" button
4. Go back to Step 3
Expected: Data should be retained (if not lost on reload)
Note: Depends on implementation of data persistence
```

### ✅ Test 10: Check Console Logs
```
1. Open browser DevTools (F12)
2. Go to Console tab
3. Navigate through all 3 steps, filling data
4. On Step 3, click Next
Expected: See logs:
  [SENDER DATA COLLECTED]: {...sender data...}
  [RECEIVER DATA COLLECTED]: {...receiver data...}
  [=== COMPLETE SHIPMENT DATA ===]
  [SENDER]: {...}
  [RECEIVER]: {...}
  [DELIVERY DETAILS]: {...}
  [ITEMS]: [...]
  [=== FULL SHIPMENT DATA ===]: {entire shipmentData object}
```

---

## Debugging Commands

Run these in browser console (F12) while on the form:

```javascript
// Check if functions exist
typeof validateStep3           // Should return "function"
typeof validateParcel          // Should return "function"
typeof collectParcelsData      // Should return "function"

// Check current shipmentData
console.log(shipmentData)      // See entire object

// Check specific parts
console.log(shipmentData.sender)           // Sender from Step 1
console.log(shipmentData.receiver)         // Receiver from Step 2
console.log(shipmentData.deliveryDetails)  // Delivery from Step 3
console.log(shipmentData.items)            // Items from Step 3

// Test validation manually
validateStep3()                // Should return true/false
validateParcel(document.querySelector('.item-row'), 1)  // Test item validation

// Get form values
const form = document.getElementById('step3Form');
new FormData(form).entries()  // See all form values
```

---

## Console Output Example

When you successfully complete Step 3, you should see:

```
SENDER DATA COLLECTED: {name: "Emmanuel Paschal", email: "oraclelogistics101@gmail.com", ...}
RECEIVER DATA COLLECTED: {name: "John Doe", email: "john@example.com", ...}
=== COMPLETE SHIPMENT DATA ===
SENDER: {name: "Emmanuel Paschal", ...}
RECEIVER: {name: "John Doe", ...}
DELIVERY DETAILS: {deliveryType: "Hub to Door", serviceType: "Express", ...}
ITEMS: [
  {itemIndex: 1, shipmentType: "Parcel", declaredValue: "50,001 - 200,000", ...},
  {itemIndex: 2, shipmentType: "Document", declaredValue: "0 - 50,000", ...}
]
=== FULL SHIPMENT DATA === {
  sender: {...},
  receiver: {...},
  deliveryDetails: {...},
  items: [...]
}
```

---

## Validation Error Messages

These are the possible error messages:

### General Validation
- "Please complete all package items information correctly." - Main validation failed
- "Please complete all package items information correctly." - No items added

### Per-Item Errors (in alert box)
- "Parcel #X, Item #Y: Shipment Type is required"
- "Parcel #X, Item #Y: Declared Value is required"
- "Parcel #X, Item #Y: Weight is required"
- "Parcel #X, Item #Y: Quantity must be at least 1"
- "Parcel #X, Item #Y: Description is required"

---

## Field Requirements Matrix

| Field | Type | Required | Options |
|-------|------|----------|---------|
| Delivery Type | Select | YES | Hub to Door, Hub to Hub |
| Service Type | Select | YES | Express, Standard, Economy |
| Departure State | Select | YES | Lagos, Abuja, Rivers, ... |
| Departure Hub | Select | YES | (Varies) |
| Arrival State | Select | YES | Lagos, Abuja, Rivers, ... |
| Arrival Hub | Select | YES | (Varies) |
| Business Name | Input | NO | (Any text) |
| Payment Option | Select | YES | Pay Now, Pay on Delivery, Wallet |
| Coupon Code | Input | NO | (Any text) |
| **Per Item:**
| Shipment Type | Select | YES | Document, Parcel, Fragile, Perishable |
| Declared Value | Select | YES | 0-50K, 50-200K, 200-500K, 500K+ |
| Weight | Select | YES | 0-1kg, 1-5kg, 5-10kg, 10-20kg, 20kg+ |
| Quantity | Number | YES | Must be ≥ 1 |
| Description | Input | YES | (Any text, non-empty) |

---

## Key Features Implemented

✅ **Complete Validation**
- Checks all required fields
- Validates each item individually
- Provides specific error messages

✅ **Global Store Management**
- Accumulates data from all 3 steps
- Preserves previous step data
- Single source of truth (shipmentData object)

✅ **Error Handling**
- Prevents navigation with incomplete data
- Lists all errors at once
- Identifies exact field and item with error

✅ **Data Logging**
- Console logs for debugging
- Shows complete shipmentData after Step 3
- Helps verify data collection

✅ **Scalability**
- Supports multiple items/parcels
- Easy to extend for future steps
- Clean, organized data structure

---

## Next Steps After Implementation

1. **Test thoroughly** using the checklist above
2. **Check console logs** to verify data collection
3. **Implement Step 4** (Carrier Selection) similarly
4. **Connect to backend API** to submit final shipmentData
5. **Add data persistence** (localStorage/sessionStorage) for page reload handling
6. **Add loading states** during data submission
7. **Implement error recovery** if API submission fails

---

## File Modified

- `/home/richard/Desktop/Projects/Personal/Logistics/local_delivery.html`
  - Added 3 new functions (validateStep3, validateParcel, collectParcelsData)
  - ~150 lines of code
  - No existing code modified, only appended before closing script tag
