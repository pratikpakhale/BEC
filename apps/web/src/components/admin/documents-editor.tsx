"use client";

import * as React from "react";
import { FileText, Link2 } from "lucide-react";
import { ObjectList } from "@/components/admin/content-list";
import { FlagField } from "@/components/admin/content-fields";
import { EditorSection, FieldRow, TextAreaField, TextField } from "@/components/admin/fields";
import { ImagePicker } from "@/components/admin/image-picker";
import { PublishBar } from "@/components/admin/publish-bar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type {
  DocumentGroupContent,
  DocumentLink,
  DocumentPage,
} from "@/content/schema/documents";
import {
  firstProblem,
  isWebLink,
  newDocument,
  newGroup,
  switchLinkKind,
  toDocument,
  toState,
  type DocumentPageState,
} from "@/lib/admin/documents-doc";
import { useEditorDoc } from "@/lib/admin/use-editor-doc";
import { cn } from "@/lib/utils";

/**
 * One site page's document lists — the NBA certificates, the NAAC criteria,
 * a cell's reports. Each block is one place on the page where a list is drawn;
 * inside it an Editor arranges groups (a heading and the documents under it)
 * and the documents themselves. Where on the page a block sits, and how it
 * looks, is the page's own business and is not offered here.
 */
export function DocumentsEditor({
  pageId,
  content,
}: {
  /** The page's key in documents.json, e.g. "nba". */
  pageId: string;
  content: DocumentPage;
}) {
  const { state, setState, document, dirty, publishState, onPublish } = useEditorDoc<
    DocumentPageState,
    DocumentPage
  >({ file: "documents.json", content, toState, toDocument, scope: pageId });

  const problem = React.useMemo(() => firstProblem(document), [document]);
  const blocks = Object.entries(content.blocks);

  const setGroups = React.useCallback(
    (blockId: string, groups: DocumentGroupContent[]) =>
      setState((now) => ({
        ...now,
        blocks: { ...now.blocks, [blockId]: { ...now.blocks[blockId], groups } },
      })),
    [setState],
  );

  return (
    <div className="space-y-10">
      {blocks.map(([blockId, block]) => (
        <EditorSection
          key={blockId}
          title={block.label}
          description={
            blocks.length > 1
              ? "One of the document lists on this page. Each group is a heading with its documents under it."
              : "Each group is a heading with its documents under it. A group with no heading shows its documents on their own."
          }
        >
          <ObjectList<DocumentGroupContent>
            items={state.blocks[blockId]?.groups}
            onChange={(groups) => setGroups(blockId, groups)}
            make={newGroup}
            noun="group"
            title={(group) => group.label?.trim() || "Documents without a heading"}
            subtitle={(group) =>
              group.documents.length === 0
                ? "No documents yet — this group will not show on the site"
                : group.documents.length === 1
                  ? "1 document"
                  : `${group.documents.length} documents`
            }
            empty="No documents in this list yet."
          >
            {(group, patch) => (
              <div className="space-y-4">
                <FieldRow>
                  <TextField
                    label="Heading"
                    value={group.label ?? ""}
                    onChange={(label) => patch({ label })}
                    placeholder="Accreditation Certificates"
                    hint="Optional. Leave it empty for a list with no heading."
                  />
                  <TextAreaField
                    label="Description"
                    value={group.description ?? ""}
                    onChange={(description) => patch({ description })}
                    rows={2}
                    hint="Optional. One sentence shown under the heading."
                  />
                </FieldRow>
                <DocumentList
                  documents={group.documents}
                  onChange={(documents) => patch({ documents })}
                  folder={content.folder}
                />
              </div>
            )}
          </ObjectList>
        </EditorSection>
      ))}

      <PublishBar
        state={publishState}
        dirty={dirty}
        onPublish={onPublish}
        blockedReason={problem ? `${problem.where} ${problem.message}` : undefined}
        viewUrl={content.path}
      />
    </div>
  );
}

function DocumentList({
  documents,
  onChange,
  folder,
}: {
  documents: readonly DocumentLink[];
  onChange: (next: DocumentLink[]) => void;
  folder: string;
}) {
  return (
    <div className="space-y-2">
      <Label>Documents</Label>
      <ObjectList<DocumentLink>
        items={documents}
        onChange={onChange}
        make={newDocument}
        noun="document"
        title={(doc) => doc.title}
        subtitle={(doc) =>
          isWebLink(doc) ? doc.url || "No web address yet" : doc.file || "No file chosen yet"
        }
        empty="No documents yet."
      >
        {(doc, patch) => (
          <div className="space-y-4">
            <TextField
              label="What the link says"
              value={doc.title}
              onChange={(title) => patch({ title })}
              placeholder="AQAR 2023–24"
            />
            <LinkKind doc={doc} onChange={(next) => patch(next)} />
            {isWebLink(doc) ? (
              <TextField
                label="Web address"
                type="url"
                value={doc.url ?? ""}
                onChange={(url) => patch({ url })}
                placeholder="https://…"
                hint="A page on another website. It opens in a new tab."
              />
            ) : (
              <ImagePicker
                kind="document"
                label="PDF"
                value={doc.file || undefined}
                uploadFolder={folder}
                onChange={(file) => patch({ file: file ?? "" })}
              />
            )}
            <TextField
              label="Note"
              value={doc.meta ?? ""}
              onChange={(meta) => patch({ meta })}
              placeholder="Branch activity report"
              hint="Optional. A few words printed under the title."
            />
            <FlagField
              label="Mark as new"
              hint="Shows a “New” badge beside the title. Turn it off once it is no longer news."
              value={doc.isNew}
              onChange={(isNew) => patch({ isNew })}
            />
          </div>
        )}
      </ObjectList>
    </div>
  );
}

/** A PDF held by the college, or a page on someone else's website. */
function LinkKind({
  doc,
  onChange,
}: {
  doc: DocumentLink;
  onChange: (patch: Partial<DocumentLink>) => void;
}) {
  const web = isWebLink(doc);
  const options = [
    { web: false, label: "A PDF", icon: FileText },
    { web: true, label: "A web address", icon: Link2 },
  ];
  return (
    <div className="space-y-2">
      <Label>It opens</Label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <Button
            key={option.label}
            type="button"
            size="sm"
            variant={web === option.web ? "secondary" : "ghost"}
            className={cn("border", web === option.web ? "border-input" : "border-transparent")}
            aria-pressed={web === option.web}
            onClick={() => (web === option.web ? undefined : onChange(switchLinkKind(option.web)))}
          >
            <option.icon className="size-3.5" />
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
