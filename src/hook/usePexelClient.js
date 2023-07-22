import { createClient } from 'pexels';

function usePexelClient() {
  const clinet = createClient(process.env.NEXT_PUBLIC_PEXELS_API_KEY);
  return clinet;
}

export default usePexelClient;
