"use client";

import * as React from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ObjectList, ObjectTable } from "@/components/admin/content-list";
import {
  Block,
  CaptionedPhotosField,
  DocsField,
  FlagField,
  GroupItemsField,
  LinesField,
  MapField,
  OptionalProse,
  OptionalTableField,
  OptionalText,
  PhotoField,
  PhotosField,
  TablesField,
  TitledImagesField,
} from "@/components/admin/content-fields";
import { CrossLink, type TabProps } from "@/components/admin/departments-editor-shared";
import { FieldRow, TextField } from "@/components/admin/fields";
import { ImagePicker } from "@/components/admin/image-picker";
import { compact } from "@/lib/admin/normalize";
import { move, removeAt } from "@/lib/admin/rows";
import type { DepartmentContent } from "@/content/schema/departments";

type Association = NonNullable<DepartmentContent["associations"]>[number];
type AssociationContact = NonNullable<Association["contact"]>;
type Coordinator = NonNullable<Association["coordinators"]>[number];
type Layout = NonNullable<DepartmentContent["layout"]>;

/**
 * The second half of the departments editor's tabs. Split from the shell only
 * because one file of fourteen tabs is a file nobody can find anything in; the
 * two halves take the same `TabProps` and are interchangeable to the shell.
 */

/* -------------------------------------------------------------- research -- */

export function ResearchTab({ value, set, folder }: TabProps) {
  return (
    <div className="space-y-6">
      <Block
        label="Research areas"
        hint="Who supervises what, and where they took their doctorate."
      >
        <ObjectTable
          items={value.researchAreas}
          onChange={(researchAreas) => set("researchAreas", researchAreas)}
          columns={[
            { field: "supervisor", label: "Supervisor" },
            { field: "area", label: "Area" },
            { field: "university", label: "University" },
          ]}
          make={() => ({ supervisor: "", area: "" })}
          noun="area"
          reorderable
        />
      </Block>

      <LinesField
        label="Research achievements"
        hint="Patents granted, best-paper awards — anything that is not a table. One per line."
        value={value.researchAchievements}
        onChange={(researchAchievements) => set("researchAchievements", researchAchievements)}
      />

      <Block
        label="Publications"
        hint="Grouped by kind — journals, books, chapters, conferences — and then by year."
      >
        <ObjectList
          items={value.publications}
          onChange={(publications) => set("publications", publications)}
          make={() => ({ category: "", years: [] })}
          noun="group"
          title={(group) => group.category}
          subtitle={(group) =>
            `${group.years.reduce((total, year) => total + year.items.length, 0)} entries`
          }
        >
          {(group, patch) => (
            <>
              <TextField
                label="Kind"
                value={group.category}
                onChange={(category) => patch({ category })}
                placeholder="Journal papers"
              />
              <ObjectList
                items={group.years}
                onChange={(years) => patch({ years })}
                make={() => ({ items: [] })}
                noun="year"
                title={(year) => year.year ?? "No year"}
                subtitle={(year) =>
                  year.items.length === 1 ? "1 entry" : `${year.items.length} entries`
                }
              >
                {(year, patchYear) => (
                  <>
                    <TextField
                      label="Year"
                      value={year.year ?? ""}
                      onChange={(next) => patchYear({ year: next || undefined })}
                      placeholder="2024–25"
                      hint="Leave empty for a group that is not filed by year."
                    />
                    <LinesField
                      label="Entries"
                      hint="One publication per line, in the citation style the department uses."
                      rows={10}
                      value={year.items}
                      onChange={(items) => patchYear({ items: items ?? [] })}
                    />
                  </>
                )}
              </ObjectList>
            </>
          )}
        </ObjectList>
      </Block>

      <Block label="Patents">
        <ObjectTable
          items={value.patents}
          onChange={(patents) => set("patents", patents)}
          columns={[
            { field: "title", label: "Title" },
            { field: "inventors", label: "Inventors" },
            { field: "area", label: "Area" },
            { field: "applicationNumber", label: "Application no.", width: "w-40" },
            { field: "filed", label: "Filed", width: "w-28" },
            { field: "published", label: "Published", width: "w-28" },
            { field: "awarded", label: "Granted", width: "w-28" },
            { field: "awardNumber", label: "Grant no.", width: "w-32" },
            { field: "status", label: "Status", width: "w-32" },
          ]}
          make={() => ({ title: "" })}
          noun="patent"
          reorderable
        />
      </Block>

      <Block label="Ph.D.s awarded">
        <ObjectTable
          items={value.phdsAwarded}
          onChange={(phdsAwarded) => set("phdsAwarded", phdsAwarded)}
          columns={[
            { field: "scholar", label: "Scholar" },
            { field: "usn", label: "USN", width: "w-32" },
            { field: "guide", label: "Guide" },
            { field: "title", label: "Thesis" },
            { field: "year", label: "Year", width: "w-24" },
            { field: "status", label: "Status", width: "w-32" },
          ]}
          make={() => ({ scholar: "", guide: "", title: "" })}
          noun="scholar"
          reorderable
        />
      </Block>

      <Block label="Research scholars" hint="Those still registered, and where they have reached.">
        <ObjectTable
          items={value.researchScholars}
          onChange={(researchScholars) => set("researchScholars", researchScholars)}
          columns={[
            { field: "scholar", label: "Scholar" },
            { field: "usn", label: "USN", width: "w-32" },
            { field: "guide", label: "Guide" },
            { field: "title", label: "Topic" },
            { field: "status", label: "Status", width: "w-36" },
          ]}
          make={() => ({ scholar: "", guide: "", status: "" })}
          noun="scholar"
          reorderable
        />
      </Block>

      <Block label="Research grants">
        <ObjectTable
          items={value.researchGrants}
          onChange={(researchGrants) => set("researchGrants", researchGrants)}
          columns={[
            { field: "title", label: "Project" },
            { field: "investigators", label: "Investigators" },
            { field: "agency", label: "Funding agency" },
            { field: "year", label: "Year", width: "w-28" },
            { field: "amount", label: "Amount", width: "w-32" },
          ]}
          make={() => ({ title: "", agency: "", year: "", amount: "", investigators: "" })}
          noun="grant"
          reorderable
        />
      </Block>

      <Block
        label="Research laboratories"
        hint="Each with its own description, photographs and — where there is one — a table of what it holds."
      >
        <ObjectList
          items={value.labs}
          onChange={(labs) => set("labs", labs)}
          make={() => ({ name: "" })}
          noun="lab"
          title={(lab) => lab.name}
          subtitle={(lab) => lab.description}
        >
          {(lab, patch) => (
            <>
              <TextField label="Name" value={lab.name} onChange={(name) => patch({ name })} />
              <OptionalProse
                label="Description"
                rows={4}
                value={lab.description}
                onChange={(description) => patch({ description })}
              />
              <LinesField
                label="What it is used for"
                hint="One point per line."
                value={lab.features}
                onChange={(features) => patch({ features })}
              />
              <FlagField
                label="Show this lab larger than the others"
                value={lab.feature}
                onChange={(feature) => patch({ feature })}
              />
              <PhotosField
                label="Photographs"
                value={lab.images}
                uploadFolder={folder("labs")}
                onChange={(images) => patch({ images })}
              />
              <GroupItemsField
                label="Equipment and facilities"
                hint="A list of what the lab holds."
                value={lab.items}
                uploadFolder={folder("labs")}
                onChange={(items) => patch({ items })}
              />
              <OptionalTableField
                label="Table"
                hint="For a lab whose inventory is printed as a table."
                value={lab.table}
                onChange={(table) => patch({ table })}
              />
            </>
          )}
        </ObjectList>
      </Block>

      <TitledImagesField
        label="Research photographs"
        hint="Photo galleries shown under the Research section, each with its own heading."
        value={value.researchGallery}
        uploadFolder={folder("labs")}
        onChange={(researchGallery) => set("researchGallery", researchGallery)}
      />

      <Block label="Startups" hint="Companies incubated by the department, and the grants they won.">
        <ObjectTable
          items={value.startups?.companies}
          onChange={(companies) => set("startups", compact({ ...value.startups, companies }))}
          columns={[
            { field: "name", label: "Company" },
            { field: "founders", label: "Founders" },
            { field: "domain", label: "Domain" },
            { field: "established", label: "Established", width: "w-32" },
          ]}
          make={() => ({ name: "", founders: "", domain: "", established: "" })}
          noun="company"
          reorderable
        />
        <ObjectTable
          items={value.startups?.grants}
          onChange={(grants) => set("startups", compact({ ...value.startups, grants }))}
          columns={[
            { field: "startup", label: "Startup" },
            { field: "project", label: "Project" },
            { field: "agency", label: "Agency" },
            { field: "year", label: "Year", width: "w-24" },
            { field: "amount", label: "Amount", width: "w-32" },
          ]}
          make={() => ({ startup: "", project: "", year: "", agency: "", amount: "" })}
          noun="grant"
          reorderable
        />
      </Block>
    </div>
  );
}

/* ------------------------------------------------------------ facilities -- */

export function FacilitiesTab({ value, set, folder }: TabProps) {
  return (
    <div className="space-y-6">
      <LinesField
        label="Research laboratories"
        hint="Just the names, as a table at the top of the Facilities page. One per line."
        value={value.researchLaboratories}
        onChange={(researchLaboratories) => set("researchLaboratories", researchLaboratories)}
      />

      <Block label="Laboratories" hint="Each with a short caption and its photographs.">
        <ObjectList
          items={value.infrastructureLabs}
          onChange={(infrastructureLabs) => set("infrastructureLabs", infrastructureLabs)}
          make={() => ({ name: "" })}
          noun="laboratory"
          title={(lab) => lab.name}
          subtitle={(lab) => lab.description}
        >
          {(lab, patch) => (
            <>
              <TextField label="Name" value={lab.name} onChange={(name) => patch({ name })} />
              <OptionalProse
                label="Caption"
                rows={3}
                value={lab.description}
                onChange={(description) => patch({ description })}
              />
              <PhotosField
                label="Photographs"
                value={lab.images}
                uploadFolder={folder("labs")}
                onChange={(images) => patch({ images })}
              />
            </>
          )}
        </ObjectList>
      </Block>

      <Block
        label="Laboratories and their areas"
        hint="The plain name-and-area table some departments print."
      >
        <ObjectTable
          items={value.laboratories}
          onChange={(laboratories) => set("laboratories", laboratories)}
          columns={[
            { field: "name", label: "Laboratory" },
            { field: "area", label: "Area", width: "w-40" },
          ]}
          make={() => ({ name: "" })}
          noun="laboratory"
          reorderable
        />
      </Block>

      <Block
        label="Equipment"
        hint="Whether the Quantity column is printed is set on the Layout tab."
      >
        <ObjectTable
          items={value.infrastructureItems}
          onChange={(infrastructureItems) => set("infrastructureItems", infrastructureItems)}
          columns={[
            { field: "name", label: "Equipment" },
            { field: "specification", label: "Specification" },
            { field: "quantity", label: "Quantity", width: "w-28" },
          ]}
          make={() => ({ name: "" })}
          noun="item"
          reorderable
          pasteHint="One row per piece of equipment."
        />
      </Block>

      <Block label="Software">
        <ObjectTable
          items={value.softwareItems}
          onChange={(softwareItems) => set("softwareItems", softwareItems)}
          columns={[
            { field: "name", label: "Software" },
            { field: "version", label: "Version", width: "w-32" },
            { field: "usage", label: "Used for" },
          ]}
          make={() => ({ name: "" })}
          noun="package"
          reorderable
        />
      </Block>

      <TablesField
        label="Infrastructure tables"
        hint="Anything else the Facilities page prints as a table."
        value={value.facilitiesTables}
        onChange={(facilitiesTables) => set("facilitiesTables", facilitiesTables)}
      />

      <TitledImagesField
        label="Facilities photographs"
        hint="Classrooms, labs, library, campus — each run of photos under its own heading."
        value={value.facilitiesGallery}
        uploadFolder={folder()}
        onChange={(facilitiesGallery) => set("facilitiesGallery", facilitiesGallery)}
      />

      <Block
        label="Photos to leave out of the gallery"
        hint="The photo gallery shows everything in the department's folder. Anything named here is left out — a portrait that strayed in, say. Pick a photo to add it exactly, or type part of a file name to leave out everything matching."
      >
        <ImagePicker
          key={value.galleryExclude?.length ?? 0}
          label="Leave a photo out"
          value={undefined}
          uploadFolder={folder()}
          onChange={(key) =>
            key ? set("galleryExclude", [...(value.galleryExclude ?? []), key]) : undefined
          }
        />
        <LinesField
          label="Left out"
          hint="One per line."
          value={value.galleryExclude}
          onChange={(galleryExclude) => set("galleryExclude", galleryExclude)}
        />
      </Block>
    </div>
  );
}

/* ------------------------------------------------------------ activities -- */

export function ActivitiesTab({ value, set, folder }: TabProps) {
  return (
    <div className="space-y-6">
      <Block
        label="Activities"
        hint="Workshops, seminars, visits and drives, each written up with its own photographs."
      >
        <ObjectList
          items={value.activities}
          onChange={(activities) => set("activities", activities)}
          make={() => ({ title: "" })}
          noun="activity"
          title={(activity) => activity.title}
          subtitle={(activity) => activity.date}
        >
          {(activity, patch) => (
            <>
              <FieldRow>
                <TextField
                  label="Title"
                  value={activity.title}
                  onChange={(title) => patch({ title })}
                />
                <OptionalText
                  label="Date"
                  value={activity.date}
                  onChange={(date) => patch({ date })}
                  placeholder="14 March 2025"
                />
              </FieldRow>
              <OptionalProse
                label="What happened"
                rows={4}
                value={activity.description}
                onChange={(description) => patch({ description })}
              />
              <LinesField
                label="Details"
                hint="Resource person, participants, budget, outcomes — one per line."
                value={activity.details}
                onChange={(details) => patch({ details })}
              />
              <CaptionedPhotosField
                label="Photographs"
                value={activity.images}
                uploadFolder={folder("activities")}
                onChange={(images) => patch({ images })}
              />
            </>
          )}
        </ObjectList>
      </Block>

      <TablesField
        label="Activity tables"
        hint="Programmes listed as tables — SDPs, FDPs, workshops."
        value={value.activityTables}
        onChange={(activityTables) => set("activityTables", activityTables)}
      />

      <Block
        label="Associations"
        hint="The department's student associations and professional chapters, each with its own page section."
      >
        <ObjectList
          items={value.associations}
          onChange={(associations) => set("associations", associations)}
          make={() => ({ name: "" })}
          noun="association"
          title={(association) => association.name}
        >
          {(association, patch) => (
            <>
              <TextField
                label="Name"
                value={association.name}
                onChange={(name) => patch({ name })}
              />
              <OptionalProse
                label="About the association"
                rows={5}
                value={association.about}
                onChange={(about) => patch({ about })}
              />
              <PhotoField
                label="Office bearers' group photo"
                value={association.photo}
                uploadFolder={folder("association")}
                onChange={(photo) => patch({ photo })}
              />
              <PeopleOrNames
                label="Coordinators"
                hint="Staff coordinators. A name on its own is enough; add details when the page prints them."
                value={association.coordinators}
                uploadFolder={folder("association")}
                onChange={(coordinators) => patch({ coordinators })}
              />
              <Block label="Student executive committee">
                <ObjectTable
                  items={association.exicom}
                  onChange={(exicom) => patch({ exicom })}
                  columns={[
                    { field: "name", label: "Name" },
                    { field: "position", label: "Position" },
                  ]}
                  make={() => ({ name: "", position: "" })}
                  noun="office bearer"
                  reorderable
                />
              </Block>
              <Block
                label="Coordinator teams"
                hint="Technical, programme, sports, cultural, media — each team under its own heading."
              >
                <ObjectList
                  items={association.exicomGroups}
                  onChange={(exicomGroups) => patch({ exicomGroups })}
                  make={() => ({ title: "" })}
                  noun="team"
                  title={(group) => group.title}
                >
                  {(group, patchGroup) => (
                    <>
                      <TextField
                        label="Team"
                        value={group.title}
                        onChange={(title) => patchGroup({ title })}
                      />
                      <GroupItemsField
                        label="Members"
                        value={group.members}
                        uploadFolder={folder("association")}
                        onChange={(members) => patchGroup({ members })}
                      />
                      <OptionalTableField
                        label="Table"
                        hint="For a team listed as a table instead."
                        value={group.table}
                        onChange={(table) => patchGroup({ table })}
                      />
                    </>
                  )}
                </ObjectList>
              </Block>
              <Block label="Events">
                <ObjectTable
                  items={association.events}
                  onChange={(events) => patch({ events })}
                  columns={[
                    { field: "title", label: "Event" },
                    { field: "date", label: "Date", width: "w-40" },
                    { field: "coordinators", label: "Coordinators" },
                  ]}
                  make={() => ({ title: "" })}
                  noun="event"
                  reorderable
                />
              </Block>
              <PhotosField
                label="Activity photographs"
                value={association.gallery}
                uploadFolder={folder("association")}
                onChange={(gallery) => patch({ gallery })}
              />
              <Block label="Who to contact about this association">
                <ImagePicker
                  label="Photograph"
                  value={association.contact?.photo}
                  uploadFolder={folder("faculty")}
                  onChange={(photo) =>
                    patch({ contact: patchContact(association.contact, { photo }) })
                  }
                />
                <FieldRow>
                  <TextField
                    label="Name"
                    value={association.contact?.name ?? ""}
                    onChange={(name) => patch({ contact: patchContact(association.contact, { name }) })}
                  />
                  <OptionalText
                    label="Designation"
                    value={association.contact?.designation}
                    onChange={(designation) =>
                      patch({ contact: patchContact(association.contact, { designation }) })
                    }
                  />
                </FieldRow>
                <FieldRow>
                  <OptionalText
                    label="Email"
                    value={association.contact?.email}
                    onChange={(email) => patch({ contact: patchContact(association.contact, { email }) })}
                  />
                  <OptionalText
                    label="Phone"
                    value={association.contact?.phone}
                    onChange={(phone) => patch({ contact: patchContact(association.contact, { phone }) })}
                  />
                </FieldRow>
                <FieldRow>
                  <OptionalText
                    label="Department"
                    value={association.contact?.department}
                    onChange={(department) =>
                      patch({ contact: patchContact(association.contact, { department }) })
                    }
                  />
                  <OptionalText
                    label="College"
                    value={association.contact?.college}
                    onChange={(college) =>
                      patch({ contact: patchContact(association.contact, { college }) })
                    }
                  />
                </FieldRow>
                <OptionalText
                  label="Location"
                  value={association.contact?.location}
                  onChange={(location) =>
                    patch({ contact: patchContact(association.contact, { location }) })
                  }
                />
              </Block>
              <DocsField
                label="Documents"
                value={association.documents}
                uploadFolder={folder("docs")}
                onChange={(documents) => patch({ documents })}
              />
            </>
          )}
        </ObjectList>
      </Block>

      <Block label="MoUs">
        <ObjectTable
          items={value.mous}
          onChange={(mous) => set("mous", mous)}
          columns={[
            { field: "partner", label: "Partner" },
            { field: "location", label: "Location" },
            { field: "since", label: "Since", width: "w-28" },
          ]}
          make={() => ({ partner: "" })}
          noun="MoU"
          reorderable
        />
      </Block>

      <PhotosField
        label="MoU signing photographs"
        value={value.mouImages}
        uploadFolder={folder("mou")}
        onChange={(mouImages) => set("mouImages", mouImages)}
      />
    </div>
  );
}

/**
 * One box of the association's contact, merged in — and the whole contact
 * dropped once every box in it is empty, so clearing the last one removes the
 * block rather than leaving `{}` behind.
 *
 * A contact with a designation but no name is kept, not discarded: the name is
 * required, and the Publish bar naming it is how the Editor finds that out.
 * Throwing away what they had just typed instead would be worse and silent.
 */
function patchContact(
  contact: AssociationContact | undefined,
  patch: Partial<AssociationContact>,
): AssociationContact | undefined {
  // The `name: ""` seed is for the type, not for the file — `compact` drops it
  // again on the way out, the same way it drops every other empty box.
  return compact({ name: "", ...contact, ...patch });
}

/**
 * A list of people that the content sometimes holds as bare names. Same trade
 * as `GroupItemsField`: both forms are drawn as they are, rather than rewriting
 * every department that only ever wrote names.
 */
function PeopleOrNames({
  value,
  onChange,
  label,
  hint,
  uploadFolder,
}: {
  value: readonly Coordinator[] | undefined;
  onChange: (next: Coordinator[] | undefined) => void;
  label: string;
  hint?: string;
  uploadFolder?: string;
}) {
  const items = value ?? [];
  const emit = (next: Coordinator[]) => onChange(next.length === 0 ? undefined : next);
  const replace = (index: number, item: Coordinator) =>
    emit(items.map((entry, i) => (i === index ? item : entry)));

  return (
    <Block label={label} hint={hint}>
      {items.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="space-y-3 rounded-lg border p-3">
              <div className="flex items-end gap-2">
                <div className="min-w-0 flex-1">
                  <TextField
                    label={`Name ${index + 1}`}
                    value={typeof item === "string" ? item : item.name}
                    onChange={(name) =>
                      replace(index, typeof item === "string" ? name : { ...item, name })
                    }
                  />
                </div>
                {typeof item === "string" ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => replace(index, { name: item })}
                  >
                    Add details
                  </Button>
                ) : null}
                <div className="flex shrink-0">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-9"
                    disabled={index === 0}
                    onClick={() => emit(move(items, index, index - 1))}
                    aria-label={`Move ${index + 1} up`}
                  >
                    <ChevronUp />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-9"
                    disabled={index === items.length - 1}
                    onClick={() => emit(move(items, index, index + 1))}
                    aria-label={`Move ${index + 1} down`}
                  >
                    <ChevronDown />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-9"
                    onClick={() => emit(removeAt(items, index))}
                    aria-label={`Delete ${index + 1}`}
                  >
                    <Trash2 className="text-destructive" />
                  </Button>
                </div>
              </div>

              {typeof item === "string" ? null : (
                <>
                  <FieldRow>
                    <OptionalText
                      label="Designation"
                      value={item.designation}
                      onChange={(designation) => replace(index, { ...item, designation })}
                    />
                    <OptionalText
                      label="Email"
                      value={item.email}
                      onChange={(email) => replace(index, { ...item, email })}
                    />
                  </FieldRow>
                  <OptionalText
                    label="Phone"
                    value={item.phone}
                    onChange={(phone) => replace(index, { ...item, phone })}
                  />
                  <ImagePicker
                    label="Photograph"
                    value={item.photo}
                    uploadFolder={uploadFolder}
                    onChange={(photo) => replace(index, { ...item, photo })}
                  />
                </>
              )}
            </li>
          ))}
        </ul>
      ) : null}

      <Button type="button" variant="outline" size="sm" onClick={() => emit([...items, ""])}>
        Add a name
      </Button>
    </Block>
  );
}

/* -------------------------------------------------------------- students -- */

export function StudentsTab({ value, set, folder }: TabProps) {
  const achievements = value.studentAchievements;
  return (
    <div className="space-y-6">
      <Block
        label="Student achievements, month by month"
        hint="Each month's highlights, written as bullets."
      >
        <ObjectList
          items={achievements?.months}
          onChange={(months) => set("studentAchievements", compact({ ...achievements, months }))}
          make={() => ({ title: "", items: [] })}
          noun="month"
          title={(month) => month.title}
          subtitle={(month) => (month.items.length === 1 ? "1 item" : `${month.items.length} items`)}
        >
          {(month, patch) => (
            <>
              <TextField
                label="Month"
                value={month.title}
                onChange={(title) => patch({ title })}
                placeholder="March 2025"
              />
              <LinesField
                label="Highlights"
                value={month.items}
                onChange={(items) => patch({ items: items ?? [] })}
              />
            </>
          )}
        </ObjectList>
      </Block>

      <Block label="Best outgoing students">
        <ObjectTable
          items={achievements?.bestOutgoing}
          onChange={(bestOutgoing) =>
            set("studentAchievements", compact({ ...achievements, bestOutgoing }))
          }
          columns={[
            { field: "name", label: "Name" },
            { field: "year", label: "Year", width: "w-28" },
          ]}
          make={() => ({ name: "", year: "" })}
          noun="student"
          reorderable
        />
      </Block>

      <Block label="Alumni entrepreneurs">
        <ObjectTable
          items={achievements?.entrepreneurs}
          onChange={(entrepreneurs) =>
            set("studentAchievements", compact({ ...achievements, entrepreneurs }))
          }
          columns={[
            { field: "name", label: "Name" },
            { field: "role", label: "Role" },
            { field: "organization", label: "Organisation" },
          ]}
          make={() => ({ name: "" })}
          noun="entrepreneur"
          reorderable
        />
      </Block>

      <TablesField
        label="Awards tables"
        hint="Faculty awards, student projects, participations, chapter awards."
        value={value.achievementTables}
        onChange={(achievementTables) => set("achievementTables", achievementTables)}
      />

      <Block
        label="Distinguished alumni"
        hint="Shown as a gallery. Without a photograph, their initials are shown instead."
      >
        <ObjectList
          items={value.distinguishedAlumni}
          onChange={(distinguishedAlumni) => set("distinguishedAlumni", distinguishedAlumni)}
          make={() => ({ name: "" })}
          noun="alumnus"
          title={(alumnus) => alumnus.name}
          subtitle={(alumnus) => alumnus.organization}
        >
          {(alumnus, patch) => (
            <>
              <ImagePicker
                label="Photograph"
                value={alumnus.photo}
                uploadFolder={folder("alumni")}
                onChange={(photo) => patch({ photo })}
              />
              <FieldRow>
                <TextField label="Name" value={alumnus.name} onChange={(name) => patch({ name })} />
                <OptionalText
                  label="Designation"
                  value={alumnus.designation}
                  onChange={(designation) => patch({ designation })}
                />
              </FieldRow>
              <OptionalText
                label="Organisation"
                value={alumnus.organization}
                onChange={(organization) => patch({ organization })}
              />
            </>
          )}
        </ObjectList>
      </Block>

      <Block label="Alumni testimonials" hint="Shown as quote cards under the Alumni section.">
        <ObjectList
          items={value.testimonials}
          onChange={(testimonials) => set("testimonials", testimonials)}
          make={() => ({ name: "", quote: "" })}
          noun="testimonial"
          title={(entry) => entry.name}
          subtitle={(entry) => entry.organization}
        >
          {(entry, patch) => (
            <>
              <ImagePicker
                label="Photograph"
                value={entry.photo}
                uploadFolder={folder("alumni")}
                onChange={(photo) => patch({ photo })}
              />
              <FieldRow>
                <TextField label="Name" value={entry.name} onChange={(name) => patch({ name })} />
                <OptionalText
                  label="Designation"
                  value={entry.designation}
                  onChange={(designation) => patch({ designation })}
                />
              </FieldRow>
              <OptionalText
                label="Organisation"
                value={entry.organization}
                onChange={(organization) => patch({ organization })}
              />
              <OptionalProse
                label="What they said"
                rows={4}
                value={entry.quote}
                onChange={(quote) => patch({ quote: quote ?? "" })}
              />
            </>
          )}
        </ObjectList>
      </Block>

      <DocsField
        label="Alumni records"
        hint="Downloadable PDFs of the alumni register."
        value={value.alumniRecords}
        uploadFolder={folder("docs")}
        onChange={(alumniRecords) => set("alumniRecords", alumniRecords)}
      />

      <FlagField
        label="This department runs the Alumni Mentorship Programme"
        hint="Adds the mentorship block under Alumni. Its wording lives in the site's code, not here — ask the site administrator to change what it says."
        value={value.alumniMentorship}
        onChange={(alumniMentorship) => set("alumniMentorship", alumniMentorship)}
      />
    </div>
  );
}

/* ------------------------------------------------------------ placements -- */

export function PlacementsTab({ value, set, folder }: TabProps) {
  return (
    <div className="space-y-6">
      <CrossLink href="/admin/placements">
        Placement figures, recruiter lists and the students placed each year are edited on the
        Placements screen.
      </CrossLink>

      <TitledImagesField
        label="Placement infographics"
        hint="Year-wise charts and training structure images, shown above the tables."
        value={value.placementImages}
        uploadFolder={folder("placements")}
        onChange={(placementImages) => set("placementImages", placementImages)}
      />

      <PhotoField
        label="Photograph of the placed students"
        hint="Shown at the end of the Placements section."
        value={value.placementsPhoto}
        uploadFolder={folder("placements")}
        widthChoice
        onChange={(placementsPhoto) => set("placementsPhoto", placementsPhoto)}
      />
    </div>
  );
}

/* --------------------------------------------------------------- contact -- */

export function ContactTab({ value, set, folder }: TabProps) {
  const contact = value.contact;
  return (
    <div className="space-y-6">
      <Block label="Who to contact" hint="Shown on the department's Contact section.">
        <ImagePicker
          label="Photograph"
          value={contact?.photo}
          uploadFolder={folder("faculty")}
          onChange={(photo) => set("contact", compact({ ...contact, photo }))}
        />
        <FieldRow>
          <OptionalText
            label="Name"
            value={contact?.name}
            onChange={(name) => set("contact", compact({ ...contact, name }))}
          />
          <OptionalText
            label="Designation"
            value={contact?.designation}
            onChange={(designation) => set("contact", compact({ ...contact, designation }))}
          />
        </FieldRow>
        <FieldRow>
          <OptionalText
            label="Email"
            value={contact?.email}
            onChange={(email) => set("contact", compact({ ...contact, email }))}
          />
          <OptionalText
            label="Phone"
            value={contact?.phone}
            onChange={(phone) => set("contact", compact({ ...contact, phone }))}
          />
        </FieldRow>
      </Block>

      <Block label="More contacts">
        <ObjectTable
          items={value.additionalContacts}
          onChange={(additionalContacts) => set("additionalContacts", additionalContacts)}
          columns={[
            { field: "name", label: "Name" },
            { field: "designation", label: "Designation" },
            { field: "email", label: "Email" },
            { field: "phone", label: "Phone", width: "w-36" },
          ]}
          make={() => ({ name: "" })}
          noun="contact"
          reorderable
        />
      </Block>

      <DocsField
        label="Documents"
        hint="PDFs the department offers for download."
        value={value.documents}
        uploadFolder={folder("docs")}
        onChange={(documents) => set("documents", documents)}
      />

      <DocsField
        label="Newsletters"
        noun="newsletter"
        value={value.newsletters}
        uploadFolder={folder("docs")}
        onChange={(newsletters) => set("newsletters", newsletters)}
      />
    </div>
  );
}

/* ----------------------------------------------------------------- extra -- */

export function ExtraTab({ value, set, folder }: TabProps) {
  return (
    <div className="space-y-6">
      <Block
        label="Extra pages"
        hint="Sections this department has that no other one does. Each becomes its own entry in the department's sidebar."
      >
        <ObjectList
          items={value.customSections}
          onChange={(customSections) => set("customSections", customSections)}
          make={() => ({ id: "", title: "" })}
          noun="page"
          title={(section) => section.title}
          subtitle={(section) => section.id}
        >
          {(section, patch) => (
            <>
              <FieldRow>
                <TextField
                  label="Heading"
                  value={section.title}
                  onChange={(title) => patch({ title })}
                />
                <TextField
                  label="Address"
                  value={section.id}
                  onChange={(id) => patch({ id })}
                  hint="The last part of the web address for this page — lowercase, words joined by hyphens."
                />
              </FieldRow>
              <FieldRow>
                <OptionalText
                  label="Sidebar label"
                  value={section.label}
                  onChange={(label) => patch({ label })}
                  hint="Only when the sidebar should say something shorter than the heading."
                />
                <OptionalText
                  label="Icon"
                  value={section.icon}
                  onChange={(icon) => patch({ icon })}
                  hint="An icon name the site knows. Leave empty for the default."
                />
              </FieldRow>
              <OptionalProse
                label="Opening text"
                rows={5}
                value={section.content}
                onChange={(content) => patch({ content })}
              />
              <LinesField
                label="Bullets"
                value={section.items}
                onChange={(items) => patch({ items })}
              />
              <Block
                label="Blocks"
                hint="Each block can have its own sub-heading, text, list, photographs and table."
              >
                <ObjectList
                  items={section.groups}
                  onChange={(groups) => patch({ groups })}
                  make={() => ({})}
                  noun="block"
                  title={(group) => group.subtitle ?? ""}
                >
                  {(group, patchGroup) => (
                    <>
                      <OptionalText
                        label="Sub-heading"
                        value={group.subtitle}
                        onChange={(subtitle) => patchGroup({ subtitle })}
                      />
                      <OptionalProse
                        label="Text"
                        rows={4}
                        value={group.text}
                        onChange={(text) => patchGroup({ text })}
                      />
                      <GroupItemsField
                        label="List"
                        value={group.items}
                        uploadFolder={folder()}
                        onChange={(items) => patchGroup({ items })}
                      />
                      <PhotosField
                        label="Photographs"
                        value={group.images}
                        uploadFolder={folder()}
                        onChange={(images) => patchGroup({ images })}
                      />
                      <FieldRow>
                        <FlagField
                          label="Show the photographs larger"
                          value={group.featureImages}
                          onChange={(featureImages) => patchGroup({ featureImages })}
                        />
                        <FlagField
                          label="Show them full width"
                          value={group.largeImages}
                          onChange={(largeImages) => patchGroup({ largeImages })}
                        />
                      </FieldRow>
                      <OptionalTableField
                        label="Table"
                        value={group.table}
                        onChange={(table) => patchGroup({ table })}
                      />
                    </>
                  )}
                </ObjectList>
              </Block>
              <TablesField
                label="Tables"
                value={section.tables}
                onChange={(tables) => patch({ tables })}
              />
              <PhotoField
                label="Group photo"
                value={section.groupPhoto}
                uploadFolder={folder()}
                widthChoice
                onChange={(groupPhoto) => patch({ groupPhoto })}
              />
              <DocsField
                label="PDFs to download"
                value={section.documents}
                uploadFolder={folder("docs")}
                onChange={(documents) => patch({ documents })}
              />
              <DocsField
                label="PDFs to show on the page"
                hint="These open in a viewer inside the page rather than downloading."
                noun="PDF"
                value={section.embeds}
                uploadFolder={folder("docs")}
                onChange={(embeds) => patch({ embeds })}
              />
              <OptionalText
                label="Send visitors elsewhere instead"
                value={section.redirectUrl}
                onChange={(redirectUrl) => patch({ redirectUrl })}
                hint="When set, this sidebar entry takes visitors to that address instead of showing a page."
              />
            </>
          )}
        </ObjectList>
      </Block>

      <MapField
        label="Extra PDFs on an existing section"
        hint="Attach downloads to a section that is already there — research, facilities, faculty. Use the section's address as the name."
        keyLabel="Section"
        keyPlaceholder="research"
        noun="section"
        value={value.sectionDocuments}
        blank={() => []}
        onChange={(sectionDocuments) => set("sectionDocuments", sectionDocuments)}
      >
        {(docs, setDocs) => (
          <DocsField
            label="PDFs"
            value={docs}
            uploadFolder={folder("docs")}
            onChange={(next) => setDocs(next ?? [])}
          />
        )}
      </MapField>

      <MapField
        label="PDF links under a section in the sidebar"
        hint="Shown as sub-links beneath that section's sidebar entry, opening the PDF directly — e.g. a faculty list under Teaching Faculty. Use the section's address as the name."
        keyLabel="Section"
        keyPlaceholder="faculty"
        noun="section"
        value={value.sectionNavDocuments}
        blank={() => []}
        onChange={(sectionNavDocuments) => set("sectionNavDocuments", sectionNavDocuments)}
      >
        {(docs, setDocs) => (
          <DocsField
            label="PDFs"
            value={docs}
            uploadFolder={folder("docs")}
            onChange={(next) => setDocs(next ?? [])}
          />
        )}
      </MapField>

      <MapField
        label="PDFs shown inside an existing section"
        hint="The same, but opened in a viewer on the page rather than downloaded."
        keyLabel="Section"
        keyPlaceholder="research"
        noun="section"
        value={value.sectionEmbeds}
        blank={() => []}
        onChange={(sectionEmbeds) => set("sectionEmbeds", sectionEmbeds)}
      >
        {(docs, setDocs) => (
          <DocsField
            label="PDFs"
            noun="PDF"
            value={docs}
            uploadFolder={folder("docs")}
            onChange={(next) => setDocs(next ?? [])}
          />
        )}
      </MapField>
    </div>
  );
}

/* ---------------------------------------------------------------- layout -- */

/**
 * Every flag, with what it does written out. This is the expert panel: nothing
 * here changes a word of the department's content, only which tab a block lands
 * on — so it is one tab at the end rather than switches scattered beside the
 * fields they move.
 */
type FlagKey = Exclude<
  keyof Layout,
  "sectionOrder" | "sectionTitles" | "sectionNavLabels" | "sectionIcons"
>;

const FLAGS: { field: FlagKey; label: string; hint: string }[] = [
  {
    field: "hideAboutTab",
    label: "No About tab",
    hint: "Removes the About Department tab and its sidebar entry entirely.",
  },
  {
    field: "hideResearchTab",
    label: "No Research tab",
    hint: "Removes the Research / Research Achievements tab entirely.",
  },
  {
    field: "achievementsUnderResearch",
    label: "Research achievements inside the Research tab",
    hint: "The Ph.D., scholars and grants tables move into Research; no separate Research Achievements tab is made.",
  },
  {
    field: "labsUnderFacilities",
    label: "Research labs on the Facilities tab",
    hint: "Moves the labs to Facilities, and the equipment and software tables into Research.",
  },
  {
    field: "activitiesUnderAssociation",
    label: "Activities at the end of the Association section",
    hint: "No separate Activities tab is made.",
  },
  {
    field: "bestPracticesUnderAbout",
    label: "Best practices under About",
    hint: "Moves the block off the Home tab.",
  },
  {
    field: "hodMessageUnderAbout",
    label: "HoD message under About",
    hint: "Moves the message and its photograph off the Home tab.",
  },
  {
    field: "groupPhotosUnderAbout",
    label: "Faculty group photo under About",
    hint: "Moves the teaching-faculty group photo to the About tab.",
  },
  {
    field: "overviewPhotoOnHome",
    label: "Keep the overview photo on Home",
    hint: "Even when the HoD message has been moved to About.",
  },
  {
    field: "visionMissionOnHome",
    label: "Vision and mission on Home",
    hint: "Shown after the overview; the HoD message, lead photo and highlights move under About.",
  },
  {
    field: "academicsOnHome",
    label: "Academics on Home",
    hint: "Drops the Academics tab and shows programmes, PEOs, POs, WK and PSOs under the overview.",
  },
  {
    field: "milestonesOnHome",
    label: "Milestones on Home",
    hint: "Shown in place of the Highlights block, instead of under About.",
  },
  {
    field: "hideQuickStats",
    label: "No facts row on Home",
    hint: "Hide the “at a glance” row — right when the Quick Facts panel replaces it.",
  },
  {
    field: "hideInfrastructureQuantity",
    label: "No Quantity column on the equipment table",
    hint: "For departments that do not record quantities.",
  },
  {
    field: "groupSupportingStaff",
    label: "Split supporting staff into two tables",
    hint: "“Technical Staff” and “Supporting Staff”, by the group set against each person.",
  },
  {
    field: "staffCards",
    label: "Supporting staff as photo cards",
    hint: "Instead of tables, like the teaching faculty.",
  },
  {
    field: "facultyCompact",
    label: "Compact faculty cards",
    hint: "A small portrait beside the name instead of a full-width photograph.",
  },
  {
    field: "placementsSummaryOnly",
    label: "Placements: summary only",
    hint: "Show the summary and recruiter tables, and hide the per-student name lists.",
  },
];

export function LayoutTab({ value, set }: TabProps) {
  const layout = value.layout;
  const setLayout = (patch: Partial<Layout>) => set("layout", compact({ ...layout, ...patch }));
  const setFlag = (field: FlagKey, next: true | undefined) =>
    set("layout", compact({ ...layout, [field]: next } as Layout));

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {FLAGS.map((flag) => (
          <FlagField
            key={flag.field}
            label={flag.label}
            hint={flag.hint}
            value={layout?.[flag.field]}
            onChange={(next) => setFlag(flag.field, next)}
          />
        ))}
      </div>

      <LinesField
        label="Which sections appear, and in what order"
        hint="One section address per line, including “home” and “about”. A section left out here does not appear at all. Leave the whole box empty to use the order the page builds them in."
        rows={10}
        value={layout?.sectionOrder}
        onChange={(sectionOrder) => setLayout({ sectionOrder })}
      />

      <MapField
        label="Rename a section's heading"
        keyLabel="Section"
        keyPlaceholder="research"
        noun="heading"
        value={layout?.sectionTitles}
        blank={() => ""}
        onChange={(sectionTitles) => setLayout({ sectionTitles })}
      >
        {(title, setTitle) => (
          <TextField label="Heading on the page" value={title} onChange={setTitle} />
        )}
      </MapField>

      <MapField
        label="Rename a section in the sidebar"
        keyLabel="Section"
        keyPlaceholder="research"
        noun="label"
        value={layout?.sectionNavLabels}
        blank={() => ""}
        onChange={(sectionNavLabels) => setLayout({ sectionNavLabels })}
      >
        {(label, setLabel) => (
          <TextField label="Label in the sidebar" value={label} onChange={setLabel} />
        )}
      </MapField>

      <MapField
        label="Change a section's icon"
        hint="Icon names the site knows. Leave a section out to keep its default."
        keyLabel="Section"
        keyPlaceholder="research"
        noun="icon"
        value={layout?.sectionIcons}
        blank={() => ""}
        onChange={(sectionIcons) => setLayout({ sectionIcons })}
      >
        {(icon, setIcon) => <TextField label="Icon name" value={icon} onChange={setIcon} />}
      </MapField>
    </div>
  );
}
