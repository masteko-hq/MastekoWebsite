# How to update the website text (for Natali)

The website text and structure live in **`index.html`**. Its visual formatting lives in **`assets/site.css`**, and the language/menu behaviour lives in **`assets/site.js`**. For wording changes, you normally only need to edit `index.html`.

The safest way to edit is right inside GitHub:

1. Open the repository on github.com.
2. Click `index.html`, then click the **pencil icon** (Edit) in the top-right.
3. Use **Ctrl+F** (Cmd+F on Mac) to find the text you want to change.
4. Type your change.
5. Scroll down, write a short note like "Updated services text", and click **Commit changes**.
6. Wait ~1 minute, refresh the live site to see it.

If you ever make a mistake, GitHub keeps every previous version — nothing is lost, and any change can be undone.

## Important: the site is bilingual

Most visible text appears **twice in the same HTML element**:

1. The **English** version, in the page itself (the part you can read in the HTML).
2. The **French** version, in the `data-fr` attribute.

Each pair is stored in `data-en` and `data-fr`. For example:

```html
<h3 data-en="Asset Management" data-fr="Gestion d’actifs">Asset Management</h3>
```

**When you change English text, update both `data-en` and the text between the HTML tags. Update `data-fr` with the matching French translation.** If you only change one, the toggle can show inconsistent wording.

## Common edits

### Change the contact email
Search for `pete@masteko.ca` and replace every instance (there are a couple).

### Change a phone number or wording in a section
Find the English text and edit both the visible text and `data-en`, then update `data-fr` with the matching French wording.

### Update the Experience section
The Campus Habitations feature starts with `class="feature-mandate"`. The selected mandate rows are inside `class="mandate-table"`.

- Update the visible English text and its `data-en` value together.
- Update the matching `data-fr` value.
- Keep confidential rents, valuations and ownership information off the public site.

To add another mandate, copy one existing `role="row"` block and replace its three cells in both languages.

## When in doubt

Send me the change in plain language — "change the hero headline to X", "swap the Bukoval description for this paragraph" — and I'll make it. Editing directly is faster for small text tweaks; for anything structural, it's easier to hand off.
