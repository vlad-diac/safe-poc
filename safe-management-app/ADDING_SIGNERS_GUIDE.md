# Adding Signers (Owners) to Your Safe Wallet

This guide teaches you how to add new signers (owners) to your Safe wallet and configure multi-signature security.

## 🎯 What You'll Learn

1. How to add new owners to your Safe
2. How to remove existing owners
3. How to update the signature threshold
4. Understanding multi-signature security

---

## 📚 Understanding Safe Owners & Threshold

### Owners (Signers)
- **Owners** are Ethereum addresses that can sign and execute transactions
- Each Safe can have **1 to unlimited owners**
- Owners have equal permissions

### Threshold
- **Threshold** is the number of owner signatures required to execute a transaction
- Example: With 3 owners and threshold of 2, any 2 owners must sign to execute
- Threshold must be ≥ 1 and ≤ number of owners

### Current vs Multi-Sig Setup

#### Single Owner (Your Current Setup)
```
Owners: 1
Threshold: 1
Result: Transactions execute immediately ✅
```

#### Multi-Signature Example
```
Owners: 3
Threshold: 2
Result: Transactions need 2 signatures before execution 🔐
```

---

## 🚀 How to Add a New Signer

### Step 1: Navigate to Settings

1. Open your Safe Management App
2. Click **"Settings"** in the sidebar
3. You'll see your current owners and threshold

### Step 2: Add New Owner

Using the **"Add New Owner"** section:

```typescript
// The hook does this behind the scenes:
const { add } = useUpdateOwners();

await add.addOwner({
  ownerAddress: '0x1234...5678',  // New owner address
  threshold: 2                     // Optional: Update threshold
});
```

**What happens:**
1. If threshold = 1: Transaction **executes immediately** ✅
2. If threshold > 1: Creates transaction in Safe Transaction Service, needs signatures

### Step 3: Verify the New Owner

After adding:
- New owner appears in the **"Current Owners"** list
- Total owner count increases
- New owner can now sign transactions

---

## 🔒 Setting Up Multi-Signature Security

### Recommended Setup

For better security, use multi-signature:

```
Option A (2-of-3):
- Add 2 more owners (total 3)
- Set threshold to 2
- Any 2 owners can execute

Option B (3-of-5):
- Add 4 more owners (total 5)
- Set threshold to 3
- Any 3 owners can execute
```

### Steps to Enable Multi-Sig

1. **Add multiple owners** (as shown above)
2. **Update threshold** using the "Signature Threshold" section:

```typescript
const { updateThreshold } = useUpdateThreshold();

await updateThreshold({
  threshold: 2  // Require 2 signatures
});
```

---

## 🎨 Using the Settings Page

### Interface Overview

The settings page provides:

#### 1️⃣ Signature Threshold Card
- Shows current threshold
- Update threshold input
- Displays "Single Signature" or "Multi-Signature" badge

#### 2️⃣ Current Owners Card
- Lists all owner addresses
- Shows owner count
- Copy address buttons

#### 3️⃣ Add New Owner Card
- Input field for new address
- "Add Owner" button
- Tips and warnings

#### 4️⃣ Remove Owner Card (if > 1 owner)
- Input field for address to remove
- "Remove Owner" button
- Warning message

---

## 💻 Code Implementation Details

### Hook: `useUpdateOwners`

From Safe React Hooks SDK:

```typescript
import { useUpdateOwners } from '@safe-global/safe-react-hooks';

function MyComponent() {
  const { add, remove, swap } = useUpdateOwners();
  
  // Add owner
  const addOwnerMutation = add;
  await addOwnerMutation.addOwner({
    ownerAddress: '0x...',
    threshold: 2  // Optional
  });
  
  // Remove owner
  const removeOwnerMutation = remove;
  await removeOwnerMutation.removeOwner({
    ownerAddress: '0x...',
    threshold: 1  // Required, auto-adjust if needed
  });
  
  // Swap owner
  const swapOwnerMutation = swap;
  await swapOwnerMutation.swapOwner({
    oldOwnerAddress: '0x...',
    newOwnerAddress: '0x...'
  });
}
```

### Hook: `useUpdateThreshold`

```typescript
import { useUpdateThreshold } from '@safe-global/safe-react-hooks';

function MyComponent() {
  const { updateThreshold } = useUpdateThreshold();
  
  await updateThreshold({
    threshold: 2
  });
}
```

---

## ⚠️ Important Notes

### Transaction Execution Behavior

According to Safe SDK docs:

> **If the `threshold` of the connected Safe is `1`, it executes the Safe transaction.**
> 
> **If the `threshold` of the connected Safe is greater than `1`, it creates the Safe transaction and submits it to the Safe Transaction Service to collect the signatures.**

### Current Setup (Threshold = 1)
- ✅ Add owner: **Executes immediately**
- ✅ Remove owner: **Executes immediately**
- ✅ Update threshold: **Executes immediately**

### After Multi-Sig (Threshold > 1)
- ⏳ Add owner: **Needs threshold signatures**
- ⏳ Remove owner: **Needs threshold signatures**
- ⏳ Update threshold: **Needs threshold signatures**

### Safe Requirements

- ✅ Safe must be **already deployed**
- ✅ Connected wallet must be an **owner**
- ✅ Threshold cannot exceed **number of owners**
- ✅ Cannot remove last owner

---

## 🔥 Common Use Cases

### Use Case 1: Personal Safe → Team Safe

Starting point: 1 owner, threshold 1

```bash
Step 1: Add team member 1
  addOwner({ ownerAddress: '0xTeamMember1...' })
  
Step 2: Add team member 2
  addOwner({ ownerAddress: '0xTeamMember2...' })
  
Step 3: Update threshold to 2
  updateThreshold({ threshold: 2 })
  
Result: 3 owners, requires 2 signatures (2-of-3 multi-sig) ✅
```

### Use Case 2: Replace an Owner

If an owner's private key is compromised:

```bash
Option A: Swap
  swapOwner({
    oldOwnerAddress: '0xOld...',
    newOwnerAddress: '0xNew...'
  })

Option B: Remove + Add
  removeOwner({ ownerAddress: '0xOld...', threshold: 2 })
  addOwner({ ownerAddress: '0xNew...' })
```

### Use Case 3: Increase Security

From 2-of-3 to 3-of-5:

```bash
Step 1: Add 2 more owners (5 total)
Step 2: Update threshold to 3
Result: 3-of-5 multi-sig ✅
```

---

## 🧪 Testing Multi-Sig Flow

After setting up multi-sig (threshold > 1):

1. **Create a transaction** (e.g., send funds)
   - Transaction created but **not executed**
   - Appears in "Pending Transactions"

2. **First owner signs**
   - Navigate to Transactions page
   - Click "Sign Transaction"
   - Still pending (1/2 signatures)

3. **Second owner signs**
   - Connect with second owner wallet
   - Sign the same transaction
   - **Auto-executes** when threshold reached! 🎉

---

## 📱 UI Features

The Settings page includes:

✅ **Real-time owner list** with copy buttons
✅ **Validation** - prevents invalid addresses
✅ **Smart warnings** - threshold limits, duplicate checks
✅ **Loading states** - pending transaction feedback
✅ **Auto-refresh** - updates after transactions
✅ **Error handling** - clear error messages
✅ **Threshold badges** - visual security indicators

---

## 🔗 Related Documentation

- **Safe SDK Docs**: See `output/new1/reference-sdk-react-hooks-useupdateowners-add.md`
- **Threshold Docs**: See `output/new1/reference-sdk-react-hooks-useupdatethreshold.md`
- **Transaction Flow**: See `safe-management-app/frontend/app/safe/transactions/page.tsx`

---

## 🎓 Quick Start Commands

1. **Access Settings**: `http://localhost:3000/safe/settings`
2. **Add an Owner**: Enter address, click "Add Owner"
3. **Update Threshold**: Enter new threshold, click "Update Threshold"
4. **View Changes**: Check "Current Owners" section

---

## 🐛 Troubleshooting

### "Invalid Ethereum address"
- Ensure address starts with `0x`
- Must be 42 characters long
- Use checksum format

### "Address is already an owner"
- Check Current Owners list
- Address already exists in Safe

### "Threshold cannot exceed number of owners"
- Add more owners first
- Then increase threshold

### "Cannot remove the last owner"
- Safe must have at least 1 owner
- Add new owner before removing the last one

---

## 🎉 Success!

You now know how to:
- ✅ Add new signers to your Safe
- ✅ Remove existing signers
- ✅ Update the signature threshold
- ✅ Set up multi-signature security
- ✅ Understand the transaction flow

**Next Steps:**
- Add your team members as owners
- Set a threshold that matches your security needs
- Test the multi-sig flow with a small transaction
- Explore the Transactions page to see pending signatures

Happy building with Safe! 🔐

