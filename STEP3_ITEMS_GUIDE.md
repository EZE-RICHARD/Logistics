# Step 3: Package Items - Complete Guide

## Error: "Each parcel needs items + proof of purchase OR weight"

This error occurs when trying to proceed to Step 4 without properly completing the parcel requirements.

---

## What Each Parcel Needs

For each parcel, you MUST have:
1. ✅ **Packaging** selected (Box, Envelope, or Your Packaging)
2. ✅ **Currency** selected (NGN or USD)
3. ✅ **At least 1 item** added
4. ✅ **Proof of Purchase** OR **Proof of Weight** uploaded (at least one)

---

## Step-by-Step Instructions

### Step 1: Select Packaging & Currency

1. **Expand Parcel #1** (if collapsed)
2. **Select Packaging**
   - Click the "Select Packaging" dropdown
   - Choose: Box, Envelope, or Your Packaging
   - ✅ Selected packaging is highlighted

3. **Select Currency**
   - Click the "Currency" dropdown
   - Choose: NGN - Nigerian Naira OR USD - US Dollar
   - ✅ Selected currency is highlighted

**What happens if you skip this:**
- ❌ Error: "Parcel 1: Select packaging"
- ❌ Error: "Parcel 1: Select currency"

---

### Step 2: Add Items to Parcel

1. **Click "Add Item" button**
   - Opens the "Add Item or Document" modal

2. **Search for Item (Items Tab)**
   - Type in search box: "Laptop", "Shoes", "HS 8471.30", etc.
   - Select from dropdown results
   - Item card shows with name and HS code

3. **Fill Item Details**
   - **Weight (kg)**: How heavy is this item? (e.g., 1.5)
   - **Quantity**: How many of this item? (e.g., 1)
   - **Value (NGN)**: What's the value? (e.g., 450000)
   - **Country of Origin**: Where from? (e.g., China)

4. **Alternative: Add Document**
   - Click "Documents" tab instead
   - **Description**: Invoice, Packing List, etc.
   - **Weight (kg)**: Usually 0.10 for documents
   - **Quantity**: Usually 1
   - **Value (NGN)**: Usually 0 for documents

5. **Click "Add to Parcel"**
   - Item card appears in the parcel
   - Modal closes

6. **Item appears in parcel as**
   - **Name** [weight]kg • Qty: [quantity] • ₦[value]
   - Example: "Laptop 1.5kg • Qty: 1 • ₦450000"

**What happens if you skip this:**
- ❌ Error: "Parcel 1: Please add at least one item"

---

### Step 3: Upload Proof Documents

#### Option A: Upload Proof of Purchase

1. **Find "Proof of Purchase" section**
   - Shows upload area with cloud icon
   - Text: "Click to upload or drag & drop"
   - Note: "Invoice, receipt, etc."

2. **Upload Image**
   - Click upload area OR drag & drop
   - Select image file (JPG, PNG, etc.)
   - Image preview appears

3. **Multiple uploads allowed**
   - Upload 2+ purchase proofs if you have them
   - Each appears as thumbnail

#### Option B: Upload Proof of Weight

1. **Find "Proof of Weight" section**
   - Shows upload area with scale icon
   - Text: "Photo of parcel on scale"
   - Note: "Required for accurate pricing"

2. **Upload Image**
   - Click upload area OR drag & drop
   - Select image file (photo of parcel on scale)
   - Image preview appears

3. **Multiple uploads allowed**
   - Upload 2+ weight proofs if you have them
   - Each appears as thumbnail

**Note:** You only need ONE of these:
- ✅ Upload proof of purchase, OR
- ✅ Upload proof of weight
- ✅ Upload both (even better!)

**What happens if you skip this:**
- ❌ Error: "Parcel 1: Please upload proof of purchase OR proof of weight"

---

## Complete Parcel Example

### ✅ Valid Parcel Setup

```
Parcel #1: 1 items • 1.5kg

Packaging:        [✓ Box]
Currency:         [✓ NGN - Nigerian Naira]

Items Added:
  ✓ Laptop 1.5kg • Qty: 1 • ₦450000

Proof of Purchase:
  ✓ [Image thumbnail] receipt.jpg

Proof of Weight:
  ✓ [Image thumbnail] scale_photo.jpg
```

**Result:** ✅ Parcel is valid, can proceed

### ❌ Invalid Parcel Examples

**Missing Packaging:**
```
Packaging:        [Select Packaging]  ← ERROR
Currency:         [✓ NGN]
Items:            [✓ 1 item added]
Proofs:           [✓ Upload present]
```
❌ Error: "Parcel 1: Select packaging"

**Missing Item:**
```
Packaging:        [✓ Box]
Currency:         [✓ NGN]
Items:            [Empty]  ← ERROR
Proofs:           [✓ Upload present]
```
❌ Error: "Parcel 1: Please add at least one item"

**Missing Proof:**
```
Packaging:        [✓ Box]
Currency:         [✓ NGN]
Items:            [✓ 1 item added]
Proofs:           [Empty]  ← ERROR
```
❌ Error: "Parcel 1: Please upload proof of purchase OR proof of weight"

---

## Browser Console Debugging

When you try to proceed and get errors, check the browser console (F12):

```
📦 Parcel 1 - Items found: 1
📦 Parcel 1 - Proof of Purchase images: 1
📦 Parcel 1 - Proof of Weight images: 0
✅ Parcel 1 validation complete. Errors: 0
```

**Interpreting logs:**
- **Items found: 0** → You haven't added any items
- **Proof of Purchase images: 0** → No purchase proof uploaded
- **Proof of Weight images: 0** → No weight proof uploaded
- **Errors: 0** → Parcel is valid ✅

---

## Multiple Parcels

### Adding Second Parcel

1. **Click "Add Another Parcel" button**
   - New Parcel #2 appears below Parcel #1

2. **Repeat all steps for Parcel #2**
   - Select packaging & currency
   - Add items
   - Upload proofs

3. **Each parcel validated independently**
   - Parcel #1 can be valid
   - Parcel #2 must also be valid
   - All must pass to proceed

### Example with 2 Parcels

```
✅ Parcel #1: 1 item, NGN, Proof uploaded
❌ Parcel #2: Currency not selected

Alert:
  "Parcel 1: Items validated successfully
   Parcel 2: Select currency"
```

---

## Common Issues & Solutions

### Issue 1: Item Added but Not Showing
**Problem:** Click "Add Item", fill details, click "Add to Parcel", but item doesn't appear

**Solution:**
1. Check browser console for errors (F12)
2. Ensure all item fields are filled:
   - Item selected from dropdown ✓
   - Weight entered ✓
   - Quantity entered ✓
   - Value entered ✓
3. Try again, click "Add to Parcel"

### Issue 2: Images Uploaded but Not Showing
**Problem:** Click upload, select file, but no preview appears

**Solution:**
1. Check file format (JPG, PNG recommended)
2. Check file size (< 5MB recommended)
3. Try different image
4. Try drag & drop instead of click

### Issue 3: "Please add at least one item" but Item Shows
**Problem:** Item card visible in parcel, but validation says no items

**Solution:**
1. Open browser console (F12)
2. Check: "📦 Parcel 1 - Items found: X"
3. If shows 0, try:
   - Remove item and re-add
   - Refresh page
   - Check HTML structure

### Issue 4: "Upload proof" but Upload Is There
**Problem:** Proof images visible, but validation fails

**Solution:**
1. Check console: "Proof of Purchase images: X"
2. If shows 0:
   - Try uploading again
   - Check file format
   - Clear and re-upload
3. Try uploading to different proof section

---

## Step 3 Requirements Summary

| Component | Status | Required |
|-----------|--------|----------|
| Shipping Purpose | Select dropdown | ✓ Required |
| Parcel 1+ | At least 1 | ✓ Required |
| Packaging | Box/Envelope/Your | ✓ Per parcel |
| Currency | NGN/USD | ✓ Per parcel |
| Items | Name, Weight, Qty, Value | ✓ At least 1 per parcel |
| Proof Purchase | Images | ✓ At least 1 (either one) |
| Proof Weight | Images | ✓ At least 1 (either one) |

---

## Next Steps After Step 3

Once all parcels are valid:
1. ✅ Click "Next"
2. → Go to **Step 4: Choose Courier**
3. Select shipping carrier (DHL, NIPOST, etc.)
4. Click "Continue to Review"
5. → Go to **Step 5: Insurance**

---

## Quick Checklist

Before clicking Next on Step 3:

- [ ] Shipping purpose selected
- [ ] Parcel #1 exists
- [ ] Packaging selected for Parcel #1
- [ ] Currency selected for Parcel #1
- [ ] At least 1 item added to Parcel #1
- [ ] Proof of purchase OR proof of weight uploaded
- [ ] (If multiple parcels) Repeat for all parcels
- [ ] Console shows "Errors: 0" for all parcels
- [ ] Click "Next"

✅ Ready to proceed to Step 4!
