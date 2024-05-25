import { useRouter } from "next/router";

export default function ChatPage() {
  const router = useRouter();
  const {orgId} = router.query;
  return(
    <main>
      {orgId}
    </main>
  );
}