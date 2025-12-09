# Quick Reference: Shipment Data Functions

## Key Functions Quick List

### Data Collection
```javascript
collectSenderData()           // Step 1: Captures sender address
collectReceiverData()         // Step 2: Captures receiver address
collectParcelsData()          // Step 3: Captures parcels + items + uploads
collectCourierData()          // Step 4: Captures selected courier
collectInsuranceData()        // Step 5: Captures insurance selection
collectPickupPreference()     // Step 5: Captures pickup/dropoff choice
calculateFinalTotals()        // Step 5: Aggregates all costs
```

### Validation
```javascript
validateSenderAddress()       // Step 1 validation
validateReceiverAddress()     // Step 2 validation
validateStep3()               // Step 3 validation
validateParcel()              // Parcel-level validation
validateItemModal()           // Item modal validation
validateShipmentComplete()    // Final comprehensive validation
```

### Debug & Export
```javascript
logShipmentData()            // Console log complete object (formatted)
exportShipmentDataJSON()     // Return JSON-ready object
validateShipmentComplete()   // Check all required fields
```

---

## Data Access Examples

### Access Sender Data
```javascript
console.log(shipmentData.sender.firstName);
console.log(shipmentData.sender.email);
console.log(shipmentData.sender.source);
```

### Access All Parcels
```javascript
shipmentData.shipment.parcels.forEach((parcel, index) => {
  console.log(`Parcel ${parcel.parcelId}:`, parcel);
  console.log(`  Items: ${parcel.itemCount}`);
  console.log(`  Weight: ${parcel.totalWeight}kg`);
  console.log(`  Value: ₦${parcel.totalValue}`);
});
```

### Access Items in First Parcel
```javascript
const firstParcel = shipmentData.shipment.parcels[0];
firstParcel.items.forEach((item, idx) => {
  console.log(`Item ${item.itemId}: ${item.name}`);
  console.log(`  HS Code: ${item.hsCode}`);
  console.log(`  Weight: ${item.weight}kg`);
  console.log(`  Origin: ${item.origin}`);
});
```

### Check If Complete
```javascript
if (shipmentData.metadata.isValid) {
  console.log("All validations passed!");
  const data = exportShipmentDataJSON();
  // Send to backend...
} else {
  console.log("Errors:", shipmentData.metadata.validationErrors);
}
```

---

## Console Log Entry Points

### When Each Collection Function is Called
| Action | Function | Logs |
|--------|----------|------|
| Click Next on Step 1 | `collectSenderData()` | SENDER group |
| Click Next on Step 2 | `collectReceiverData()` | RECEIVER group |
| Click Next on Step 3 | `collectParcelsData()` | PARCELS group |
| Click Next on Step 4 | `collectCourierData()` | COURIER group |
| Click "Continue to Review" | `collectPickupPreference()` | PICKUP group |
| On Review Modal show | `collectInsuranceData()` + `calculateFinalTotals()` | INSURANCE + TOTALS groups |

---

## Typical Data Flow

```
User fills Step 1
  ↓
Clicks "Next"
  ↓
validate + collectSenderData()
  ↓ [shipmentData.sender populated]
  ↓
User fills Step 2
  ↓
Clicks "Next"
  ↓
validate + collectReceiverData()
  ↓ [shipmentData.receiver populated]
  ↓
User adds items & uploads
  ↓
Clicks "Next"
  ↓
validate + collectParcelsData()
  ↓ [shipmentData.shipment.parcels populated]
  ↓
User selects courier
  ↓
Clicks "Next"
  ↓
validateCourier + collectCourierData()
  ↓ [shipmentData.courier populated]
  ↓
Pickup modal shows
  ↓
collectPickupPreference()
  ↓ [shipmentData.pickup populated]
  ↓
Clicks "Continue to Review"
  ↓
goToStep(5)
  ↓
Review modal shows
  ↓
collectInsuranceData() + calculateFinalTotals()
  ↓ [shipmentData.insurance & totals populated]
  ↓
Click "Create Label"
  ↓
validateShipmentComplete() + exportShipmentDataJSON()
  ↓ [Ready for backend]
```

---

## Parcel & Item Structure Reference

### Complete Parcel Object
```javascript
{
  parcelId: 1,
  packaging: "Box",
  currency: "NGN",
  items: [
    {
      itemId: 1,
      name: "Laptop",
      type: "item",
      weight: 1.5,
      quantity: 1,
      value: 450000,
      hsCode: "8471.30",
      origin: "China"
    },
    {
      itemId: 2,
      name: "Commercial Invoice",
      type: "document",
      weight: 0.1,
      quantity: 1,
      value: 0,
      hsCode: "",
      origin: ""
    }
  ],
  proofOfPurchase: [
    { index: 0, src: "data:image/png;base64,..." }
  ],
  proofOfWeight: [
    { index: 0, src: "data:image/png;base64,..." }
  ],
  totalWeight: 1.6,
  totalValue: 450000,
  itemCount: 2
}
```

---

## Frontend Inspector Tasks

### View All Parcels
```javascript
console.table(shipmentData.shipment.parcels);
```

### View All Items Across All Parcels
```javascript
const allItems = [];
shipmentData.shipment.parcels.forEach(p => {
  allItems.push(...p.items);
});
console.table(allItems);
```

### Get Total Shipment Weight
```javascript
const totalWeight = shipmentData.shipment.totalWeight;
console.log(`Total weight: ${totalWeight}kg`);
```

### Get Total Shipment Value
```javascript
const totalValue = shipmentData.shipment.totalValue;
console.log(`Total value: ₦${totalValue.toLocaleString()}`);
```

### Check Validation Errors
```javascript
if (!shipmentData.metadata.isValid) {
  console.table(shipmentData.metadata.validationErrors);
}
```

### Get Final Total Cost
```javascript
console.log(`Total cost: ₦${shipmentData.totals.grandTotal.toLocaleString()}`);
console.log(`Breakdown:`, shipmentData.totals.breakdown);
```

---

## Debugging Tips

### 1. Check Data at Any Point
```javascript
// Quick check of current state
logShipmentData();
```

### 2. Find Missing Data
```javascript
// See which fields are empty
const allFields = JSON.stringify(shipmentData, null, 2);
console.log(allFields);
```

### 3. Validate Specific Section
```javascript
// Just sender validation
validateSenderAddress();
```

### 4. Export for Inspection
```javascript
// Copy to clipboard for inspection
const data = exportShipmentDataJSON();
copy(JSON.stringify(data, null, 2));
```

### 5. Check Upload Status
```javascript
// See all uploads
console.log("Uploads:", shipmentData.uploads);

// See proofs in first parcel
console.log("Purchase proofs:", shipmentData.shipment.parcels[0].proofOfPurchase);
console.log("Weight proofs:", shipmentData.shipment.parcels[0].proofOfWeight);
```

---

## Filters & Calculations

### Items with No HS Code
```javascript
const noHSCode = [];
shipmentData.shipment.parcels.forEach(p => {
  p.items.forEach(i => {
    if (!i.hsCode) noHSCode.push(i);
  });
});
console.log("Items missing HS code:", noHSCode);
```

### Total Items (Quantity)
```javascript
const totalQty = shipmentData.shipment.parcels.reduce((sum, p) => {
  return sum + p.items.reduce((s, i) => s + i.quantity, 0);
}, 0);
console.log(`Total quantity: ${totalQty}`);
```

### Average Item Value
```javascript
const avgValue = shipmentData.shipment.totalValue / shipmentData.shipment.totalItems;
console.log(`Average value per item: ₦${avgValue.toLocaleString()}`);
```

### Parcels with Documents Only
```javascript
const docOnlyParcels = shipmentData.shipment.parcels.filter(p => {
  return p.items.every(i => i.type === "document");
});
console.log("Document-only parcels:", docOnlyParcels);
```

---

## Common Console Commands

```javascript
// Show everything
logShipmentData();

// Export to clipboard
copy(exportShipmentDataJSON());

// Check valid
shipmentData.metadata.isValid;

// Last update time
shipmentData.metadata.lastUpdatedAt;

// Completed steps
shipmentData.metadata.completedSteps;

// Courier selected
shipmentData.courier.name;

// Insurance applied
shipmentData.insurance.selected;

// Grand total
shipmentData.totals.grandTotal;

// Show first parcel
console.table(shipmentData.shipment.parcels[0]);

// Show all items from first parcel
console.table(shipmentData.shipment.parcels[0].items);

// Check validation
validateShipmentComplete();
```

---

## Notes
- All functions automatically log to console
- Logs include timestamps via ISO strings
- No manual logging needed - automatic on each step
- Use DevTools Console to inspect in real-time
- Export function ready for backend API
- All data validated before collection
