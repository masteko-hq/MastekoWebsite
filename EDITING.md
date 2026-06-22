# How to update the website text (for Natali)

Everything on the site lives in one file: **`index.html`**. You don't need to be a developer to change wording. You edit text, save, and commit — GitHub Pages republishes the site within a minute or two.

The safest way to edit is right inside GitHub:

1. Open the repository on github.com.
2. Click `index.html`, then click the **pencil icon** (Edit) in the top-right.
3. Use **Ctrl+F** (Cmd+F on Mac) to find the text you want to change.
4. Type your change.
5. Scroll down, write a short note like "Updated services text", and click **Commit changes**.
6. Wait ~1 minute, refresh the live site to see it.

If you ever make a mistake, GitHub keeps every previous version — nothing is lost, and any change can be undone.

## Important: the site is bilingual

Every piece of visible text appears **twice**:

1. The **English** version, in the page itself (the part you can read in the HTML).
2. The **French** version, in a list near the bottom of the file (inside a section that starts with `const fr = {`).

Each pair is linked by a label called `data-i18n`. For example:

```html
<h3 data-i18n="svc1_t">Asset Management</h3>
```

…has a matching French line near the bottom:

```js
svc1_t:"Gestion d'actifs",
```

**When you change English text, change the matching French line too** (find it by its label, e.g. `svc1_t`). If you only change one, the toggle will show your new text in one language and the old text in the other.

## Common edits

### Change the contact email
Search for `pete@masteko.ca` and replace every instance (there are a couple).

### Change a phone number or wording in a section
Find the English text, edit it, then find its `data-i18n` label and update the French line at the bottom to match.

### Update the Properties section
Each property is a block that starts with `class="prop reveal"`. Inside it:

- `class="loc"` = the location line (e.g. "Montréal, QC")
- `class="type"` = the asset type line
- the `<p>` = the description

Update both the English (in the block) and the French (the `prop1_…`, `prop2_…`, `prop3_…` lines at the bottom).

To **add a fourth property**, the cleanest path is to copy an existing property block, paste it as a fourth, give its labels new names (e.g. `prop4_loc`, `prop4_type`, `prop4_p`), and add matching French lines. If that feels fiddly, send me the property details (name, location, type, one-sentence description) and I'll add it.

## When in doubt

Send me the change in plain language — "change the hero headline to X", "swap the Bukoval description for this paragraph" — and I'll make it. Editing directly is faster for small text tweaks; for anything structural, it's easier to hand off.
