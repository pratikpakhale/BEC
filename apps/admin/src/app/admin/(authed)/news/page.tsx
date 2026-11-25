import { LoadFailed } from "@/components/admin/load-failed";
import { NewsEditor } from "@/components/admin/news-editor";
import type { NewsContent } from "@/content/schema/news";
import { loadFailure } from "@/lib/admin/github";
import { readContentFile } from "@/lib/admin/publish";

export const metadata = { title: "News & Announcements" };

// Always read the live file from the repository, never a cached render — an
// editor who published a minute ago must see their own text in the form.
export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  let content: NewsContent;
  try {
    const file = await readContentFile("news.json");
    if (!file) throw new Error("news.json is not a registered content file.");
    content = file.data as NewsContent;
  } catch (error) {
    console.error("[admin] could not load news.json", error);
    return <LoadFailed what="news" reason={loadFailure(error)} />;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight">News &amp; Announcements</h1>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        News covers events and achievements. Announcements are official notices — admissions,
        results, open days. They appear in separate lists on the home page and on their own pages,
        and are never mixed.
      </p>

      <div className="mt-8">
        <NewsEditor content={content} />
      </div>
    </div>
  );
}
