"use client";

import { PageContainer } from "@/components/shared/page-container";
import { useAuth } from "@/contexts/auth-context";

export default function Page() {
  const { user } = useAuth();

  return <PageContainer>hello</PageContainer>;
}
