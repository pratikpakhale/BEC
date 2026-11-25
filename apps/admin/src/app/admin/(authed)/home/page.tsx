import { HomeEditor } from "@/components/admin/home-editor";
import { LoadFailed } from "@/components/admin/load-failed";
import type { HomeContent } from "@/content/schema/home";
import { loadFailure } from "@/lib/admin/github";
import { readContentFile } from "@/lib/admin/publish";

export const metadata = { title: "Home page" };

// Always read the live file from the repository, never a cached render — an
// editor who published a minute ago must see their own text in the form.
export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  let content: HomeContent;
  try {
    const file = await readContentFile("home.json");
    if (!file) throw new Error("home.json is not a registered content file.");
    content = file.data as HomeContent;
  } catch (error) {
    console.error("[admin] could not load home.json", error);
    return <LoadFailed what="home page" reason={loadFailure(error)} />;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight">Home page</h1>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        The three parts of the home page you can change: the slides at the top, the About BEC
        section, and the Student life cards. Everything else on that page — news, courses,
        placements — is edited from its own screen.
      </p>

      <div className="mt-8">
        <HomeEditor content={content} />
      </div>
    </div>
  );
}
