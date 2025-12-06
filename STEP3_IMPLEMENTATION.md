# Step 3 Data Collection & Validation Implementation

## Overview
Implemented three critical functions to handle Step 3 (Delivery Details & Items) validation and data collection, storing everything in a unified global store with previously collected sender and receiver addresses.

## Functions Implemented

### 1. `validateStep3()`
**Purpose:** Validates all Step 3 form fields before proceeding to next step

**Validation Checks:**
- ✅ Delivery Type (required)
- ✅ Service Type (required)
- ✅ Departure State (required)
- ✅ Departure Hub (required)
- ✅ Arrival State (required)
- ✅ Arrival Hub (required)
- ✅ Payment Option (required)
- ✅ At least one item exists
- ✅ At least one item has all required fields

**Returns:** `boolean` - `true` if all validations pass, `false` otherwise

---

### 2. `validateParcel(parcelElement, parcelIndex)`
**Purpose:** Validates individual parcel/item details with granular error messages

**Validation Checks per Item:**
- ✅ Shipment Type (required)
- ✅ Declared Value (required)
- ✅ Weight (required)
- ✅ Quantity (required, must be ≥ 1)
- ✅ Description (required, non-empty)

**Parameters:**
- `parcelElement` - DOM element containing the parcel items
- `parcelIndex` - Sequential parcel number (for error messages)

**Returns:** `array` - Array of error message strings (empty if no errors)

---

### 3. `collectParcelsData()`
**Purpose:** Collects and stores all Step 3 data in the global `shipmentData` object

**Data Structure Collected:**

```javascript
shipmentData = {
  sender: {
    // Already collected from Step 1
    name: "...",
    email: "...",
    phone: "...",
    address: "...",
    source: "address_book" | "manual" | "address_book_edited"
  },
  receiver: {
    // Already collected from Step 2
    name: "...",
    email: "...",
    phone: "...",
    address: "...",
    source: "address_book" | "manual" | "address_book_edited"
  },
  deliveryDetails: {
    deliveryType: "Hub to Door" | "Hub to Hub",
    serviceType: "Express" | "Standard" | "Economy",
    departureState: "...",
    departureHub: "...",
    arrivalState: "...",
    arrivalHub: "...",
    businessName: "..." (optional),
    paymentOption: "Pay Now" | "Pay on Delivery" | "Wallet",
    couponCode: "..." (optional)
  },
  items: [
    {
      itemIndex: 1,
      shipmentType: "Document" | "Parcel" | "Fragile" | "Perishable",
      declaredValue: "0 - 50,000" | "50,001 - 200,000" | "200,001 - 500,000" | "Above 500,000",
      weight: "0 - 1" | "1 - 5" | "5 - 10" | "10 - 20" | "Above 20",
      quantity: number,
      description: "..."
    },
    // ... more items if added
  ]
}
```

---

## Integration with Navigation

The functions are integrated into the existing navigation handler:

```javascript
btnNext.addEventListener("click", function () {
  if (currentStep === 3) {
    // Primary validation
    if (!validateStep3()) {
      alert("Please complete all package items information correctly.");
      return;
    }

    // Individual parcel validation with detailed errors
    const parcels = document.querySelectorAll(".parcel-accordion-item");
    let parcelErrors = [];
    parcels.forEach((parcel, index) => {
      const errors = validateParcel(parcel, index + 1);
      parcelErrors = parcelErrors.concat(errors);
    });

    if (parcelErrors.length > 0) {
      alert(parcelErrors.join("\n"));
      return;
    }

    // Collect and store data
    collectParcelsData();
  }
  // ... navigation to next step
});
```

---

## Features

### ✅ Comprehensive Validation
- All required fields are checked
- Clear error messages for debugging
- Quantity validation (must be ≥ 1)
- Ensures at least one item exists

### ✅ Unified Global Store
- All data from Steps 1-3 stored in `shipmentData` object
- Sender address data included (from Step 1)
- Receiver address data included (from Step 2)
- New Step 3 data appended without losing previous data

### ✅ Detailed Logging
When data is collected, comprehensive logs are output to console:
```
=== COMPLETE SHIPMENT DATA ===
SENDER: {...}
RECEIVER: {...}
DELIVERY DETAILS: {...}
ITEMS: [...]
=== FULL SHIPMENT DATA === {...}
```

### ✅ Error Messages
- Granular error messages for each item
- Identifies specific parcel and item numbers
- Lists exact field that failed validation

---

## Usage Example

When user clicks "Next" on Step 3:

```javascript
// Step 1: validateStep3() checks main form fields
// Step 2: validateParcel() checks each item with details
// Step 3: collectParcelsData() stores everything in shipmentData

// User can then access:
console.log(shipmentData.sender);           // Step 1 data
console.log(shipmentData.receiver);         // Step 2 data
console.log(shipmentData.deliveryDetails);  // Step 3 delivery config
console.log(shipmentData.items);            // Step 3 items/parcels
```

---

## Testing Checklist

- [ ] Fill Step 1 (Sender) → Click Next → Verify sender data stored
- [ ] Fill Step 2 (Receiver) → Click Next → Verify receiver data stored + sender data retained
- [ ] Fill Step 3 incomplete → Click Next → Verify validation error
- [ ] Add items without required fields → Click Next → Verify specific item errors
- [ ] Fill Step 3 completely → Click Next → Verify all data collected in shipmentData
- [ ] Check browser console → Verify complete shipmentData logs with all steps

---

## Notes

- The implementation maintains backward compatibility with existing sender/receiver collection
- Validation happens before data collection to ensure data integrity
- All data is stored in a single `shipmentData` object for easy access in subsequent steps
- Console logging helps with debugging and verification
