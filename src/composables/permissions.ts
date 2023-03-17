import { useSessionStore } from '@/stores/session';
import { storeToRefs } from 'pinia';

export function usePermissions() {
  const sessionStore = useSessionStore();
  const { abilities } = storeToRefs(sessionStore);

  function userHasPermission(routeName: string): boolean {
    if (abilities.value.includes('*')) return true;

    if (abilities.value.includes(routeName)) return true;

    return false;
  }

  return { userHasPermission };
}
