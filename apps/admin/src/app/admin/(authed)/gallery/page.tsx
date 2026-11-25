import { GalleryEditor } from "@/components/admin/gallery-editor";
import { listDepartments } from "@/content/departments";
import { allGalleries } from "@/lib/admin/galleries";

export const metadata = { title: "Photo galleries" };

export const dynamic = "force-dynamic";

export default function AdminGalleryPage() {
  // Built here rather than in the component: the department half comes from
  // departments.json, which is 900 KB and has no business crossing to the
  // browser so a dropdown can say "Civil Engineering".
  const galleries = allGalleries(listDepartments());

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-semibold tracking-tight">Photo galleries</h1>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        The photo folders the site draws from. Adding a photo here puts it on the page it belongs
        to; taking one off leaves the file in storage, so nothing is lost by changing your mind.
      </p>

      <div className="mt-8">
        <GalleryEditor galleries={galleries} />
      </div>
    </div>
  );
}
