# Shipment Data Collection Guide

## Overview
The shipping form now collects comprehensive data from all 5 steps into a unified `shipmentData` global object with proper debugging logs and validation.

---

## Global Data Structure

### `shipmentData` Object
```javascript
{
  metadata: {
    formStartedAt: ISO timestamp,
    lastUpdatedAt: ISO timestamp,
    currentStep: number,
    completedSteps: [array of step numbers],
    isValid: boolean,
    validationErrors: [array of error strings]
  },
  
  sender: {
    firstName, lastName, email, phone, altPhone,
    address1, address2, city, state, country, zipCode,
    isDefault: boolean,
    source: "address_book" | "manual" | "address_book_edited"
  },
  
  receiver: {
    firstName, lastName, email, phone, altPhone,
    address1, address2, city, state, country, zipCode,
    saveToBook: boolean,
    source: "address_book" | "manual" | "address_book_edited"
  },
  
  shipment: {
    purpose: string,
    totalParcels: number,
    totalItems: number,
    totalWeight: number (kg),
    totalValue: number (NGN),
    currency: "NGN",
    parcels: [
      {
        parcelId: number,
        packaging: string,
        currency: string,
        items: [
          {
            itemId: number,
            name: string,
            type: "item" | "document",
            weight: number (kg),
            quantity: number,
            value: number (NGN),
            hsCode: string,
            origin: string
          }
        ],
        proofOfPurchase: [{ index, src }],
        proofOfWeight: [{ index, src }],
        totalWeight: number (kg),
        totalValue: number (NGN),
        itemCount: number
      }
    ]
  },
  
  courier: {
    name: string,
    type: string,
    pickupTime: string,
    deliveryTime: string,
    cost: number (NGN),
    estimatedDelivery: string
  },
  
  insurance: {
    selected: boolean,
    provider: string,
    coverage: number (NGN),
    cost: number (NGN),
    coupon: {
      code: string,
      discount: number (NGN),
      applied: boolean
    }
  },
  
  pickup: {
    type: "pickup" | "dropoff",
    locationId: string | null,
    locationName: string,
    locationAddress: string,
    cost: number (NGN)
  },
  
  totals: {
    shippingCost: number (NGN),
    insuranceCost: number (NGN),
    pickupCost: number (NGN),
    discount: number (NGN),
    tax: number (NGN),
    grandTotal: number (NGN),
    currency: "NGN",
    breakdown: {
      items: 0,
      courier: number,
      insurance: number,
      pickup: number
    }
  },
  
  uploads: {
    proofOfPurchase: [],
    proofOfWeight: [],
    packagingPhotos: []
  }
}
```

---

## Data Collection Functions

### Step 1: Sender Data
**Function:** `collectSenderData()`
- **Triggered:** When Next button is clicked on Step 1
- **Validation:** `validateSenderAddress()`
- **Logs:** 
  - Mode detection ("address_book" or "manual")
  - Full sender object in table format
  - Success confirmation

**Example Log Output:**
```
🚀 COLLECTING SENDER DATA (Step 1)
📍 Mode detection...
Mode selected: address_book
✅ Using address book selection
┌─────────────────┬──────────────────────┐
│     (index)     │      Values          │
├─────────────────┼──────────────────────┤
│   firstName     │ 'Emmanuel'           │
│   lastName      │ 'Paschal'            │
│   email         │ 'oracle@gmail.com'   │
│   phone         │ '+234 903 807 7866'  │
│   source        │ 'address_book'       │
└─────────────────┴──────────────────────┘
✅ Sender data collected successfully
```

### Step 2: Receiver Data
**Function:** `collectReceiverData()`
- **Triggered:** When Next button is clicked on Step 2
- **Validation:** `validateReceiverAddress()`
- **Logs:** Similar to sender, with receiver-specific details

### Step 3: Parcels & Items Data
**Function:** `collectParcelsData()`
- **Triggered:** When Next button is clicked on Step 3
- **Validation:** 
  - `validateStep3()` - checks shipping purpose, parcels exist, packaging/currency selected
  - `validateParcel()` - checks each parcel for items + proof uploads
- **Key Features:**
  - Detailed item parsing (name, weight, quantity, value, HS code, type)
  - Proof upload collection (purchase and weight)
  - Weight and value aggregation

**Example Parcel Item Structure:**
```javascript
{
  itemId: 1,
  name: "Laptop",
  type: "item",
  weight: 1.5,
  quantity: 1,
  value: 450000,
  hsCode: "8471.30",
  origin: "China"
}
```

**Logs Include:**
- Each parcel number being processed
- Item count per parcel
- Total weight per parcel
- Upload section processing
- Final summary table with parcel totals

### Step 4: Courier/Carrier Selection
**Function:** `collectCourierData()`
- **Triggered:** When Next button is clicked on Step 4
- **Validation:** Checks if a courier card is selected
- **Collects:**
  - Courier name, type
  - Pickup and delivery times
  - Cost
- **Updates:** `shipmentData.totals.shippingCost`

**Example:**
```javascript
courier: {
  name: "DHL Express",
  type: "DOMESTIC",
  pickupTime: "Within 2 days",
  deliveryTime: "Within 5 days",
  cost: 12190.26
}
```

### Step 5: Insurance & Pickup
**Functions Called in Sequence:**
1. `collectInsuranceData()` - Insurance selection, provider, coverage, coupon
2. `collectPickupPreference()` - Pickup vs dropoff, location if dropoff
3. `calculateFinalTotals()` - Aggregates all costs
4. `validateShipmentComplete()` - Final validation
5. `logShipmentData()` - Complete data summary

**Logs:**
- Insurance selection with provider details
- Pickup preference and location
- Final totals table
- Complete shipment data table
- Validation results

---

## Debugging & Logging

### Available Debug Functions

#### 1. **logShipmentData()**
Logs the complete shipment object in a structured format
```javascript
logShipmentData();
// Output: Complete metadata, sender, receiver, shipment, courier, insurance, pickup, and totals
```

#### 2. **exportShipmentDataJSON()**
Exports shipment data as JSON string (ready for backend)
```javascript
const data = exportShipmentDataJSON();
// Returns: Complete shipmentData object with exportedAt timestamp
```

#### 3. **validateShipmentComplete()**
Validates all required fields are populated
```javascript
const isValid = validateShipmentComplete();
// Logs all validation errors if any exist
```

#### 4. **Browser Console Features**
- **Console Groups** - All logs organized by step with collapsible groups
- **Tables** - Data displayed in table format for easy reading
- **Color Coding** - Emojis for quick status recognition
  - 🚀 = Starting collection
  - ✅ = Success/completion
  - ⚠️ = Warning/optional
  - ❌ = Error
  - 📍 = Location/step info
  - 💰 = Money/pricing
  - 📊 = Summary/totals
  - 📤 = Export/output
  - 📝 = Editing

---

## Console Logging Examples

### Accessing Logs in Browser
1. Open DevTools: `F12` or `Ctrl+Shift+I`
2. Go to "Console" tab
3. Fill form and navigate through steps
4. Each action logs comprehensive information

### Sample Output Flow
```
🚀 COLLECTING SENDER DATA (Step 1)
  ↓ collectSenderData()
✅ Sender data collected successfully

🚀 COLLECTING RECEIVER DATA (Step 2)
  ↓ collectReceiverData()
✅ Receiver data collected successfully

🚀 COLLECTING PARCELS DATA (Step 3)
  ↓ collectParcelsData()
  📦 Total parcels found: 1
  📍 Processing Parcel #1...
  📦 Items in parcel: 1
  ✅ Parcel #1 Summary: {items: 1, weight: "1.5kg", value: "₦450,000", ...}
✅ All parcels collected successfully

🚀 COLLECTING COURIER DATA (Step 4)
  ↓ collectCourierData()
✅ Courier data collected successfully

🚀 COLLECTING INSURANCE DATA (Step 5)
  ↓ collectInsuranceData()
✅ Insurance data collected successfully

💰 CALCULATING FINAL TOTALS
✅ Totals calculated successfully

📊 COMPLETE SHIPMENT DATA
✅ All validations passed!
📤 EXPORTING SHIPMENT DATA (JSON)
```

---

## Parcel & Items Details

### Parcel Structure
Each parcel in `shipmentData.shipment.parcels` contains:
```javascript
{
  parcelId: 1,                    // Sequential number
  packaging: "Box",               // Box, Envelope, Your Packaging
  currency: "NGN",                // NGN or USD
  items: [/* items array */],     // All items in this parcel
  proofOfPurchase: [],            // Uploaded images (src data)
  proofOfWeight: [],              // Uploaded images (src data)
  totalWeight: 1.5,               // Sum of all item weights
  totalValue: 450000,             // Sum of all item values
  itemCount: 1                    // Total quantity across items
}
```

### Item Structure
Each item includes complete details for customs/tracking:
```javascript
{
  itemId: 1,                      // Sequential within parcel
  name: "Laptop",                 // Item description
  type: "item",                   // "item" or "document"
  weight: 1.5,                    // Individual weight (kg)
  quantity: 1,                    // How many of this item
  value: 450000,                  // Unit value (NGN)
  hsCode: "8471.30",              // Harmonized System Code
  origin: "China"                 // Country of origin
}
```

### Special Cases
- **Documents:** No HS code required, type = "document", typically weight = 0.1kg
- **Multiple Items:** Each item tracked separately, totals calculated
- **Uploads:** Can have multiple proofs per parcel, stored as array with index

---

## Data Validation

### Validation Checks

| Step | Required Fields | Validation Function |
|------|-----------------|---------------------|
| 1 | Sender: name, email, phone, address, country | `validateSenderAddress()` |
| 2 | Receiver: name, email, phone, address, country | `validateReceiverAddress()` |
| 3 | Purpose, packaging, currency per parcel, items+proof | `validateStep3()`, `validateParcel()` |
| 4 | Courier selected | Inline check in button handler |
| 5 | N/A (insurance optional) | `validateShipmentComplete()` |

### Validation Results
```javascript
shipmentData.metadata.isValid = true/false
shipmentData.metadata.validationErrors = ["error1", "error2", ...]
```

---

## Backend Integration

### Preparing for Backend
```javascript
// Get complete data ready for API
const shipmentData = exportShipmentDataJSON();

// Send to backend
fetch('/api/shipments/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(shipmentData)
})
.then(res => res.json())
.then(data => console.log('Shipment created:', data))
.catch(err => console.error('Error:', err));
```

---

## Common Issues & Troubleshooting

### Issue: Items not appearing in parcels
**Check:** 
1. Item modal validation completed successfully
2. `saveItemToParcel()` executed without errors
3. `updateParcelSummary()` called after item added

### Issue: Parcel totals showing 0
**Check:**
1. Items added have valid weight and value
2. Parsing regex is matching correctly (check console for parsed values)
3. `renumberParcels()` called

### Issue: Courier data not collected
**Check:**
1. A courier card has `.selected` class
2. `collectCourierData()` executed successfully
3. Check console logs for selector failures

### Issue: Empty data in totals
**Check:**
1. All collection functions called in order
2. `calculateFinalTotals()` executed
3. Insurance toggle/selection state is correct

---

## Tips for Development

1. **Monitor Console:** Keep DevTools open while testing form flow
2. **Use logShipmentData():** Call manually to inspect current state
3. **Step by Step:** Navigate through wizard using buttons, not page jumps
4. **Check Each Validation:** Don't bypass validation - it populates required data
5. **Export Before Closing:** Use `exportShipmentDataJSON()` to capture state

---

## Summary

The enhanced data collection system provides:
- ✅ **Complete Data Model** - All 5 steps with detailed structure
- ✅ **Comprehensive Logging** - Console groups, tables, and status indicators
- ✅ **Item Tracking** - Detailed per-item parsing with HS codes and origin
- ✅ **Parcel Management** - Multi-parcel support with per-parcel aggregation
- ✅ **Validation Framework** - Step-by-step validation with error tracking
- ✅ **Export Ready** - JSON export for backend API integration
- ✅ **Debug Functions** - Multiple helper functions for inspection

All logs are automatically generated as users progress through the wizard. No manual logging needed for standard operations.
