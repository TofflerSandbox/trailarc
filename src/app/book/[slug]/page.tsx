import { Suspense } from "react";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { BookingFlow } from "@/components/BookingFlow";
import { getListing, listings } from "@/lib/data";

export function generateStaticParams() {
  return listings.filter((l) => l.price).map((l) => ({ slug: l.slug }));
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = getListing(slug);
  if (!l || !l.price) notFound();
  return (
    <>
      <SiteHeader />
      <Suspense>
        <BookingFlow slug={slug} />
      </Suspense>
    </>
  );
}
