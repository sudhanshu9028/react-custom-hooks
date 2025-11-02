# ⚛️ React Custom Hooks

A growing collection of reusable, production-ready **custom React hooks**, each demonstrated with a working example page.  
Every hook is isolated, easy to test, and optimized for performance and clarity.


---

## 🚀 Current Hooks

### 🟢 `useNotification`
A flexible notification system with stackable toast messages.

**Features:**
- Trigger notifications with `type` and `message`
- Independent timers per notification (auto-dismiss after 3s)
- Slide-in animation on add and fade-out animation on remove
- Supports up to 6 concurrent notifications
- Easy to reuse in any app

**Usage Example:**
```jsx
import useNotification from '../customHooks/use-notification';

const Example = () => {
  const [NotificationComp, triggerNotification] = useNotification();

  return (
    <>
      <button onClick={() => triggerNotification('success', 'Saved!')}>Show Success</button>
      <NotificationComp />
    </>
  );
};
