# Step 3 Data Collection Flow Diagram

## Complete Shipment Data Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         GLOBAL STORE: shipmentData                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  Step 1 (Sender)              Step 2 (Receiver)        Step 3 (Delivery) │
│  ─────────────────            ─────────────────         ─────────────────│
│                                                                           │
│  sender: {                    receiver: {              deliveryDetails: {│
│    name: "...",                 name: "...",             deliveryType,   │
│    email: "...",                email: "...",            serviceType,    │
│    phone: "...",                phone: "...",            departureState, │
│    address: "...",              address: "...",          departureHub,   │
│    source: "...",               source: "...",           arrivalState,   │
│    country: "...",              country: "...",          arrivalHub,     │
│    state: "...",                state: "...",            businessName,   │
│    city: "...",                 city: "...",             paymentOption,  │
│    zipCode: "..."               zipCode: "...",          couponCode      │
│  }                            }                        }                 │
│                                                                           │
│                                                        items: [           │
│                                                          {                │
│                                                            itemIndex,     │
│                                                            shipmentType,  │
│                                                            declaredValue, │
│                                                            weight,        │
│                                                            quantity,      │
│                                                            description    │
│                                                          },               │
│                                                          {...}            │
│                                                        ]                  │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Validation & Collection Flow

```
                              ┌─────────────────┐
                              │  User Click Next │
                              │  from Step 3     │
                              └────────┬──────────┘
                                       │
                    ┌──────────────────▼─────────────────┐
                    │  validateStep3()                    │
                    │  ─────────────────                  │
                    │  Check delivery details:            │
                    │  • deliveryType ✓                   │
                    │  • serviceType ✓                    │
                    │  • departureState ✓                 │
                    │  • departureHub ✓                   │
                    │  • arrivalState ✓                   │
                    │  • arrivalHub ✓                     │
                    │  • paymentOption ✓                  │
                    │  • Items exist ✓                    │
                    │  • Valid item data ✓                │
                    └──────────┬───────────┬──────────────┘
                               │           │
                        ✗ FAIL │           │ PASS ✓
                               │           │
                    ┌──────────▼──┐   ┌────▼──────────────────┐
                    │   Show Alert │   │  validateParcel()    │
                    │   Return ✗   │   │  ──────────────────  │
                    └──────────────┘   │  For each item:      │
                                       │  • shipmentType ✓    │
                                       │  • declaredValue ✓   │
                                       │  • weight ✓          │
                                       │  • quantity ✓        │
                                       │  • description ✓     │
                                       └──────┬───────┬───────┘
                                              │       │
                                       ✗ FAIL │       │ PASS ✓
                                              │       │
                                   ┌──────────▼──┐   │
                                   │  Show Alert  │   │
                                   │  (Detailed)  │   │
                                   │  Return ✗    │   │
                                   └──────────────┘   │
                                                      │
                                            ┌─────────▼────────────────┐
                                            │  collectParcelsData()    │
                                            │  ───────────────────────│
                                            │  Extract & Store:       │
                                            │  • deliveryDetails ✓    │
                                            │  • items array ✓        │
                                            │  • Merge into           │
                                            │    shipmentData ✓       │
                                            │  • Log to console ✓     │
                                            └──────────┬──────────────┘
                                                       │
                                            ┌──────────▼──────────────┐
                                            │ Navigate to Step 4      │
                                            │ (Next button action)    │
                                            └─────────────────────────┘
```

---

## Data Flow Per Step

### Step 1 → Step 2
```
User fills sender details
         ↓
validateSenderAddress()
         ↓
collectSenderData()
         ↓
shipmentData.sender = {...}  ← STORED
         ↓
Navigate to Step 2
```

### Step 2 → Step 3
```
User fills receiver details
         ↓
validateReceiverAddress()
         ↓
collectReceiverData()
         ↓
shipmentData.receiver = {...}  ← ADDED (sender still there)
         ↓
Navigate to Step 3
```

### Step 3 → Step 4
```
User fills delivery details & items
         ↓
validateStep3()
         ↓
validateParcel() for each item
         ↓
collectParcelsData()
         ↓
shipmentData.deliveryDetails = {...}  ← ADDED
shipmentData.items = [...]            ← ADDED (sender & receiver still there)
         ↓
Navigate to Step 4
```

---

## Global Store State at Each Step

```
After Step 1 (Sender):
shipmentData = {
  sender: { ... },
  receiver: {},
  deliveryDetails: {},
  items: []
}

After Step 2 (Receiver):
shipmentData = {
  sender: { ... },           ← RETAINED
  receiver: { ... },
  deliveryDetails: {},
  items: []
}

After Step 3 (Delivery Details & Items):
shipmentData = {
  sender: { ... },           ← RETAINED
  receiver: { ... },         ← RETAINED
  deliveryDetails: { ... },
  items: [ ... ]
}

After Step 4 (Carrier Selection):
shipmentData = {
  sender: { ... },           ← RETAINED
  receiver: { ... },         ← RETAINED
  deliveryDetails: { ... },  ← RETAINED
  items: [ ... ],            ← RETAINED
  carrier: { ... }           ← NEW
}

After Step 5 (Review & Submit):
shipmentData = {
  sender: { ... },           ← COMPLETE
  receiver: { ... },         ← COMPLETE
  deliveryDetails: { ... },  ← COMPLETE
  items: [ ... ],            ← COMPLETE
  carrier: { ... },          ← COMPLETE
  insurance: { ... }         ← NEW
}
```

---

## Example: Complete shipmentData Object

```javascript
{
  sender: {
    name: "Emmanuel Paschal",
    email: "oraclelogistics101@gmail.com",
    phone: "+2349038077866",
    address: "NO 9 Chris Okafor, Ago Palace Way, Amuwo-Odofin, Lagos, Nigeria 100263",
    source: "address_book",
    country: "Nigeria",
    state: "Lagos",
    city: "Lagos",
    zipCode: "100263"
  },
  
  receiver: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+2348012345678",
    address: "123 Main Street, Lekki Phase 1, Lagos, Nigeria 100001",
    source: "manual",
    country: "Nigeria",
    state: "Lagos",
    city: "Lagos",
    zipCode: "100001"
  },
  
  deliveryDetails: {
    deliveryType: "Hub to Door",
    serviceType: "Express",
    departureState: "Lagos",
    departureHub: "Lagos Main Hub",
    arrivalState: "Abuja",
    arrivalHub: "Abuja Central Hub",
    businessName: "Tech Store Nigeria",
    paymentOption: "Pay Now",
    couponCode: "SAVE500"
  },
  
  items: [
    {
      itemIndex: 1,
      shipmentType: "Parcel",
      declaredValue: "50,001 - 200,000",
      weight: "1 - 5",
      quantity: 2,
      description: "Electronics - Laptop Accessories"
    },
    {
      itemIndex: 2,
      shipmentType: "Document",
      declaredValue: "0 - 50,000",
      weight: "0 - 1",
      quantity: 1,
      description: "Shipping Documentation"
    }
  ]
}
```

---

## Debugging Tips

### To view complete data after Step 3:
```javascript
// Open browser console (F12)
// After clicking Next on Step 3, look for:
console.log(shipmentData);
```

### To view individual components:
```javascript
console.log(shipmentData.sender);           // Sender info from Step 1
console.log(shipmentData.receiver);         // Receiver info from Step 2
console.log(shipmentData.deliveryDetails);  // Delivery config from Step 3
console.log(shipmentData.items);            // Items/parcels from Step 3
```

### To export data for API submission:
```javascript
// After completing all steps:
const payload = JSON.stringify(shipmentData);
console.log(payload);  // Copy to API request body
```
