"use client";

import { useState } from "react";
import Link from "@/components/link";
import { asset } from "@/lib/assets";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function RtiContent() {
    const [activeTab, setActiveTab] = useState("english");

    return (
        <main className="bg-background text-foreground">
            {/* Header Section - adapted from governance/page.tsx */}
            <section className="relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f97316_0%,transparent_35%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#0f172a_0%,transparent_28%)]" />
                </div>
                <div className="relative container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                        Administration · Disclosures
                    </p>
                    <div className="mt-4 space-y-4 max-w-3xl">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
                            Right to Information (RTI)
                        </h1>
                        <p className="text-base md:text-lg leading-relaxed text-gray-700">
                            Mandatory disclosures under the Right to Information Act, promoting transparency and accountability in governance.
                        </p>
                        <div className="flex flex-wrap gap-3 text-sm">
                            <Badge className="bg-primary text-white px-4 py-2 rounded-sm">
                                RTI Act 2005
                            </Badge>
                            <Badge variant="secondary" className="rounded-sm">
                                Public Information
                            </Badge>
                            <Badge variant="outline" className="rounded-sm">
                                Transparency
                            </Badge>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-14 md:py-18 container mx-auto max-w-6xl px-4 lg:px-6 space-y-8">
                <div className="space-y-4">
                    <p className="text-base text-gray-700 leading-relaxed max-w-4xl text-justify">
                        The Right to Information Act, 2005 empowers citizens to access information under the control of public authorities.
                        Basaveshwar Engineering College  is committed to transparency and compliance with the Act.
                    </p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                        <TabsList className="bg-stone-100 p-1 rounded-md">
                            <TabsTrigger value="english" className="px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-sm">English</TabsTrigger>
                            <TabsTrigger value="kannada" className="px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-sm">Kannada</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="english" className="space-y-6 mt-0">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {/* Public Information Officer */}
                            <Card className="rounded-sm border-stone-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <CardHeader className="bg-stone-50/50 border-b border-stone-100 pb-3">
                                    <CardTitle className="text-lg text-primary font-bold">Public Information Officer</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4 space-y-3 text-sm">
                                    <div>
                                        <p className="font-semibold text-gray-900 text-base">Principal</p>
                                        <p className="text-gray-600">Basaveshwar Engineering College</p>
                                        <p className="text-gray-600">S. Nijalingappa Road, Vidyagiri</p>
                                        <p className="text-gray-600">Bagalkote-587102, Karnataka.</p>
                                    </div>
                                    <div className="pt-2 border-t border-stone-100 space-y-1">
                                        <p className="flex items-center gap-2 text-gray-700">
                                            <span className="font-medium w-20 text-xs uppercase tracking-wide text-gray-500">Contact No:</span>
                                            76187 81963
                                        </p>
                                        <p className="flex items-center gap-2 text-gray-700">
                                            <span className="font-medium w-20 text-xs uppercase tracking-wide text-gray-500">Email:</span>
                                            <a href="mailto:becprincipal@yahoo.com" className="text-primary hover:underline break-all">becprincipal@yahoo.com</a>
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Assistant Public Information Officer */}
                            <Card className="rounded-sm border-stone-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <CardHeader className="bg-stone-50/50 border-b border-stone-100 pb-3">
                                    <CardTitle className="text-lg text-primary font-bold">Assistant Public Information Officer</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4 space-y-3 text-sm">
                                    <div>
                                        <p className="font-semibold text-gray-900 text-base">Assistant Administrative Officer</p>
                                        <p className="text-gray-600">Basaveshwar Engineering College</p>
                                        <p className="text-gray-600">S. Nijalingappa Road, Vidyagiri</p>
                                        <p className="text-gray-600">Bagalkote-587102, Karnataka.</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* First Appellate Authority (FAA) */}
                            <Card className="rounded-sm border-stone-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <CardHeader className="bg-stone-50/50 border-b border-stone-100 pb-3">
                                    <CardTitle className="text-lg text-primary font-bold">First Appellate Authority (FAA)</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4 space-y-3 text-sm">
                                    <div>
                                        <p className="font-semibold text-gray-900 text-base">Joint Director (Administration)</p>
                                        <p className="text-gray-600">Director of Technical Education,</p>
                                        <p className="text-gray-600">Bangalore.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="kannada" className="space-y-6 mt-0">
                        <div className="space-y-4 mb-6">
                            <h3 className="text-xl font-semibold text-gray-900 text-center">
                                ಮಾಹಿತಿ ಹಕ್ಕು ಅಧಿನಿಯಮ 2005 ರ ಅಡಿಯಲ್ಲಿ ಸಾರ್ವಜನಿಕ ಮಾಹಿತಿ ಅಧಿಕಾರಿಗಳ ವಿವರಗಳು
                            </h3>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {/* Public Information Officer - Kannada */}
                            <Card className="rounded-sm border-stone-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <CardHeader className="bg-stone-50/50 border-b border-stone-100 pb-3">
                                    <CardTitle className="text-lg text-primary font-bold">ಸಾರ್ವಜನಿಕ ಮಾಹಿತಿ ಅಧಿಕಾರಿ</CardTitle>
                                    <CardDescription className="text-xs text-stone-500">
                                        [2005 ಮಾಹಿತಿ ಹಕ್ಕು ಕಾಯ್ದೆ ಸೆಕ್ಷನ್ 5[1]ರ ಅಡಿಯಲ್ಲಿ]
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-4 space-y-3 text-sm">
                                    <div>
                                        <p className="font-semibold text-gray-900 text-base">ಪ್ರಾಚಾರ್ಯರು</p>
                                        <p className="text-gray-600">ಬಸವೇಶ್ವರ ಇಂಜಿನಿಯರಿಂಗ್ ಕಾಲೇಜ್</p>
                                        <p className="text-gray-600">ಬಾಗಲಕೋಟೆ-587102</p>
                                    </div>
                                    <div className="pt-2 border-t border-stone-100 space-y-1">
                                        <p className="flex items-center gap-2 text-gray-700">
                                            <span className="font-medium w-24 text-xs uppercase tracking-wide text-gray-500">ದೂರವಾಣಿ ಸಂಖ್ಯೆ:</span>
                                            76187 81963
                                        </p>
                                        <p className="flex items-center gap-2 text-gray-700">
                                            <span className="font-medium w-24 text-xs uppercase tracking-wide text-gray-500">ಇಮೇಲ್:</span>
                                            <a href="mailto:becprincipal@yahoo.com" className="text-primary hover:underline break-all">becprincipal@yahoo.com</a>
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Assistant Public Information Officer - Kannada */}
                            <Card className="rounded-sm border-stone-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <CardHeader className="bg-stone-50/50 border-b border-stone-100 pb-3">
                                    <CardTitle className="text-lg text-primary font-bold">ಸಹಾಯಕ ಸಾರ್ವಜನಿಕ ಮಾಹಿತಿ ಅಧಿಕಾರಿ</CardTitle>
                                    <CardDescription className="text-xs text-stone-500">
                                        [2005 ಮಾಹಿತಿ ಹಕ್ಕು ಕಾಯ್ದೆ ಸೆಕ್ಷನ್ 5[2]ರ ಅಡಿಯಲ್ಲಿ]
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-4 space-y-3 text-sm">
                                    <div>
                                        <p className="font-semibold text-gray-900 text-base">ಸಹಾಯಕ ಆಡಳಿತಾಧಿಕಾರಿ</p>
                                        <p className="text-gray-600">ಬಸವೇಶ್ವರ ಇಂಜಿನಿಯರಿಂಗ್ ಕಾಲೇಜ್</p>
                                        <p className="text-gray-600">ಬಾಗಲಕೋಟೆ-587102</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* First Appellate Authority - Kannada */}
                            <Card className="rounded-sm border-stone-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <CardHeader className="bg-stone-50/50 border-b border-stone-100 pb-3">
                                    <CardTitle className="text-lg text-primary font-bold">ಪ್ರಥಮ ಮೇಲ್ಮನವಿ ಪ್ರಾಧಿಕಾರ</CardTitle>
                                    <CardDescription className="text-xs text-stone-500">
                                        [2005 ಮಾಹಿತಿ ಹಕ್ಕು ಕಾಯ್ದೆ ಸೆಕ್ಷನ್ 19[1]ರ ಅಡಿಯಲ್ಲಿ]
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-4 space-y-3 text-sm">
                                    <div>
                                        <p className="font-semibold text-gray-900 text-base">ಜಂಟಿ ನಿರ್ದೇಶಕರು (ಆಡಳಿತ)</p>
                                        <p className="text-gray-600">ಪ್ರಾದೇಶಿಕ ತಾಂತ್ರಿಕ ನಿರ್ದೇಶನಾಲಯ,</p>
                                        <p className="text-gray-600">ಬೆಂಗಳೂರು-1</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </section>

            <section id="documents" className="py-14 md:py-18 container mx-auto max-w-6xl px-4 lg:px-6 space-y-6 border-t border-stone-200 bg-stone-50/50">
                <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                        Important Documents
                    </h2>
                    <p className="text-base text-gray-700 leading-relaxed">
                        Official mandatory disclosure documents for transparency and compliance.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="group rounded-sm border-stone-200 transition-all hover:shadow-md hover:border-primary/20 bg-white">
                        <Link href={asset("documents/disclosures/mandatory-disclosure-24-25.pdf")} target="_blank" rel="noreferrer" className="block h-full">
                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                <div className="space-y-1 pr-4">
                                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                                        Mandatory Disclosure
                                    </CardTitle>
                                    <CardDescription className="text-sm text-gray-600 line-clamp-2">
                                        Comprehensive institutional information for Academic Year 2024-25.
                                    </CardDescription>
                                </div>
                                <span className="text-stone-400 group-hover:text-primary transition-colors p-1 bg-stone-100 group-hover:bg-primary/10 rounded-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                                </span>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 text-primary font-medium text-sm mt-2 group-hover:underline underline-offset-4">
                                    <span>View Document</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg>
                                </div>
                            </CardContent>
                        </Link>
                    </Card>
                </div>
            </section>
        </main>
    );
}
