import { CleanupScreen } from "@/components/admin/cleanup-screen";

export const metadata = { title: "Storage" };

export const dynamic = "force-dynamic";

export default function AdminCleanupPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-semibold tracking-tight">Storage</h1>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        How much space the site&rsquo;s photos and documents take up, and which of them no
        page uses any more.
      </p>

      <div className="mt-8">
        <CleanupScreen />
      </div>
    </div>
  );
}
