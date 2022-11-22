import { useRoute, useRouter } from 'vue-router';

export default function useRedirect() {
  const route = useRoute();
  const router = useRouter();

  function goPage(name: string) {
    router.push({ name });
  }

  return {
    goPage,
  };
}