# Security Specification: SIPID SD Negeri Mendongan

## 1. Data Invariants
1. `media_items` are publicly readable by anyone (teachers, students, parents) to access educational media without requiring user authentication.
2. `media_items` updates/deletions/creations require valid schemas and prevent arbitrary field injection or invalid categories.
3. `site_settings` are publicly readable for displaying school name, address, email, and description on header and footer.
4. `feedback_messages` can be created by visitors submitting feedback with required `name`, `contact`, and `message`, with bounded string lengths to prevent Denial-of-Wallet attacks.

## 2. Dirty Dozen Threat Payloads
1. Injecting 10MB string into media item title.
2. Injecting unknown category like "malware" into media_items.
3. Injecting script tags or corrupt document IDs.
4. Overwriting site_settings with an empty object missing required schoolName.
5. Deleting all site_settings anonymously.
6. Submitting feedback with missing contact or message.
7. Submitting 500KB text inside feedback message.
8. Injecting negative numbers into media viewsCount or likesCount.
9. Modifying document id path with non-alphanumeric special characters.
10. Attempting to read feedback messages without admin privileges.
11. Attempting unauthorized writes to reserved collection paths.
12. Attempting unbounded array injections.
