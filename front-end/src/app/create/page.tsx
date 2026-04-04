'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Check, Upload, MapPin, Users, DollarSign } from 'lucide-react';
import { useCreateEvent } from '@/hooks/useEvents';

const CATEGORIES = ['Badminton','Yoga','Camping','Pickleball','Volleyball','Football','Tennis','Hiking','Running','Swimming','Cycling','Other'];

const STEPS = [
    { n: 1, label: 'Basic Info' },
    { n: 2, label: 'Date & Time' },
    { n: 3, label: 'Location' },
    { n: 4, label: 'Details' },
];

export default function CreateEventForm() {
    const router = useRouter();
    const { mutate: createEvent, isPending } = useCreateEvent();
    const fileRef = useRef<HTMLInputElement>(null);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '', category: '', descrip: '',
        event_date: '', start_time: '', end_date: '', end_time: '',
        venue_name: '', location: '',
        pax: '', fares: '', org_name: '', org_email: '', org_phone: '',
        tags: '', e_status: 'active',
        img: '' as File | string,
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            setFormData(prev => ({ ...prev, img: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fd = new FormData();
        fd.append('title', formData.title);
        fd.append('category', formData.category);
        fd.append('descrip', formData.descrip);
        fd.append('start_date', `${formData.event_date}T${formData.start_time}`);
        fd.append('end_date', formData.end_date ? `${formData.end_date}T${formData.end_time || '23:59'}` : `${formData.event_date}T23:59`);
        fd.append('location', [formData.venue_name, formData.location].filter(Boolean).join(', '));
        fd.append('pax', formData.pax);
        fd.append('fares', formData.fares);
        fd.append('org_name', formData.org_name);
        fd.append('org_email', formData.org_email);
        fd.append('org_phone', formData.org_phone);
        fd.append('tags', formData.tags);
        fd.append('e_status', formData.e_status);
        if (formData.img instanceof File) fd.append('image', formData.img);

        createEvent(fd, {
            onSuccess: () => router.push('/manage_events'),
            onError: (err) => console.error('Failed to create event', err),
        });
    }

    // Progress line width: spans from first to last circle center
    // Each circle is at positions 0%, 33.3%, 66.6%, 100% of the justify-between container

    return (
        <div className="min-h-screen login-page-bg">
            <div className="max-w-2xl mx-auto px-4 py-10">

                {/* Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900">Create New Event</h1>
                    <p className="text-slate-500 mt-1.5 text-sm">Set up your sports event in just a few steps.</p>
                </div>

                {/* ── Stepper ── */}
                <div className="mb-10">
                    {/* Row 1: circles + in-flow connectors — items-center keeps line at circle mid */}
                    <div className="flex items-center">
                        {STEPS.map((s, i) => {
                            const done = step > s.n;
                            const active = step === s.n;
                            return (
                                <React.Fragment key={s.n}>
                                    <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                                        done
                                            ? 'bg-blue-500 border-blue-500 text-white'
                                            : active
                                                ? 'bg-white border-cyan-500 text-cyan-500'
                                                : 'bg-white border-slate-300 text-slate-400'
                                    }`}>
                                        {done ? <Check className="h-4 w-4" strokeWidth={3} /> : s.n}
                                    </div>
                                    {i < STEPS.length - 1 && (
                                        <div className={`flex-1 h-0.5 transition-colors duration-300 ${done ? 'bg-cyan-500' : 'bg-slate-200'}`} />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                    {/* Row 2: labels aligned under each circle */}
                    <div className="flex mt-2">
                        {STEPS.map((s, i) => {
                            const active = step === s.n;
                            const done = step > s.n;
                            return (
                                <React.Fragment key={s.n}>
                                    <div className="max-w-screen shrink-0 text-center">
                                        <span className={`text-xs font-medium ${active || done ? 'text-slate-800' : 'text-slate-400'}`}>
                                            {s.label}
                                        </span>
                                    </div>
                                    {i < STEPS.length - 1 && <div className="flex-1" />}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                {/* ── Form card ── */}
                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 space-y-8 p-10">

                        {/* Step 1 — Basic Info */}
                        {step === 1 && (
                            <>
                                <h2 className="text-xl font-bold text-slate-900 pb-2 border-b border-slate-100">Basic Info</h2>

                                <Field label="Event Title" required>
                                    <input name="title" value={formData.title} onChange={handleChange} placeholder="e.g., City Basketball Championship 2026" required className={inputCls} />
                                </Field>

                                <Field label="Sport Category" required>
                                    <select name="category" value={formData.category} onChange={handleChange} required className={inputCls}>
                                        <option value="">Select a category</option>
                                        {CATEGORIES.map(c => <option key={c} value={c.toLowerCase()}>{c}</option>)}
                                    </select>
                                </Field>

                                <Field label="Description" required>
                                    <textarea name="descrip" value={formData.descrip} onChange={handleChange} required rows={4} placeholder="Describe your event, what makes it special, and what participants can expect..." className={`${inputCls} resize-none`} />
                                </Field>
                            </>
                        )}

                        {/* Step 2 — Date & Time */}
                        {step === 2 && (
                            <>
                                <h2 className="text-xl font-bold text-slate-900 pb-2 border-b border-slate-100">Date &amp; Time</h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Event Date" required>
                                        <div className={`${inputCls} flex items-center gap-2`}>
                                            <svg className="h-4 w-4 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                                            <input type="date" name="event_date" value={formData.event_date} onChange={handleChange} required className="flex-1 outline-none bg-transparent text-sm text-slate-700" />
                                        </div>
                                    </Field>
                                    <Field label="Start Time" required>
                                        <div className={`${inputCls} flex items-center gap-2`}>
                                            <svg className="h-4 w-4 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                                            <input type="time" name="start_time" value={formData.start_time} onChange={handleChange} required className="flex-1 outline-none bg-transparent text-sm text-slate-700" />
                                        </div>
                                    </Field>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="End Date" required>
                                        <div className={`${inputCls} flex items-center gap-2`}>
                                            <svg className="h-4 w-4 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                                            <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required className="flex-1 outline-none bg-transparent text-sm text-slate-700" />
                                        </div>
                                    </Field>
                                    <Field label="End Time">
                                        <div className={`${inputCls} flex items-center gap-2`}>
                                            <svg className="h-4 w-4 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                                            <input type="time" name="end_time" value={formData.end_time} onChange={handleChange} className="flex-1 outline-none bg-transparent text-sm text-slate-700" />
                                        </div>
                                    </Field>
                                </div>
                            </>
                        )}

                        {/* Step 3 — Location */}
                        {step === 3 && (
                            <>
                                <h2 className="text-xl font-bold text-slate-900 pb-2 border-b border-slate-100">Location</h2>

                                <Field label="Venue Name" required>
                                    <div className={`${inputCls} flex items-center gap-2`}>
                                        <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                                        <input name="venue_name" value={formData.venue_name} onChange={handleChange} required placeholder="e.g., Downtown Arena" className="flex-1 outline-none bg-transparent text-sm text-slate-700 placeholder:text-slate-400" />
                                    </div>
                                </Field>

                                <Field label="Full Address" required>
                                    <input name="location" value={formData.location} onChange={handleChange} required placeholder="e.g., 123 Sports Ave, City Center" className={inputCls} />
                                </Field>
                            </>
                        )}

                        {/* Step 4 — Details */}
                        {step === 4 && (
                            <>
                                <h2 className="text-xl font-bold text-slate-900 pb-2 border-b border-slate-100">Details</h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Maximum Participants" required>
                                        <div className={`${inputCls} flex items-center gap-2`}>
                                            <Users className="h-4 w-4 text-slate-400 shrink-0" />
                                            <input type="number" name="pax" value={formData.pax} onChange={handleChange} required placeholder="e.g., 100" className="flex-1 outline-none bg-transparent text-sm text-slate-700 placeholder:text-slate-400" />
                                        </div>
                                    </Field>
                                    <Field label="Entry Fee" required>
                                        <div className={`${inputCls} flex items-center gap-2`}>
                                            <DollarSign className="h-4 w-4 text-slate-400 shrink-0" />
                                            <input name="fares" value={formData.fares} onChange={handleChange} required placeholder="e.g., Free or $25" className="flex-1 outline-none bg-transparent text-sm text-slate-700 placeholder:text-slate-400" />
                                        </div>
                                    </Field>
                                </div>

                                <Field label="Organizer Name" required>
                                    <input name="org_name" value={formData.org_name} onChange={handleChange} required placeholder="e.g., City Sports League" className={inputCls} />
                                </Field>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Organizer Email" required>
                                        <input type="email" name="org_email" value={formData.org_email} onChange={handleChange} required placeholder="organizer@example.com" className={inputCls} />
                                    </Field>
                                    <Field label="Organizer Phone" required>
                                        <input type="tel" name="org_phone" value={formData.org_phone} onChange={handleChange} required placeholder="+6588888888" maxLength={10} className={inputCls} />
                                    </Field>
                                </div>

                                <Field label="Requirements (comma-separated)">
                                    <input name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g., Valid ID, Sports shoes" className={inputCls} />
                                    <p className="text-xs text-slate-400 mt-1">Separate each requirement with a comma</p>
                                </Field>

                                <Field label="Event Image">
                                    <div
                                        onClick={() => fileRef.current?.click()}
                                        className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-400 hover:bg-cyan-50/40 transition-colors"
                                    >
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="preview" className="h-32 object-cover rounded-lg" />
                                        ) : (
                                            <>
                                                <Upload className="h-8 w-8 text-slate-400 mb-2" />
                                                <p className="text-sm font-medium text-slate-700">
                                                    <span className="font-bold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-cyan-500 mt-1">PNG, JPG or GIF (MAX. 5MB)</p>
                                            </>
                                        )}
                                    </div>
                                    <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                </Field>
                            </>
                        )}
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex items-center justify-between mt-6">
                        <button
                            type="button"
                            onClick={() => setStep(s => Math.max(1, s - 1))}
                            disabled={step === 1}
                            className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="h-4 w-4" /> Previous
                        </button>

                        {step < 4 ? (
                            <button
                                type="button"
                                onClick={() => setStep(s => Math.min(4, s + 1))}
                                className="flex items-center gap-1.5 px-5 py-3 rounded-xl bg-gray-500 hover:bg-blue-600 text-white text-sm font-semibold shadow-sm transition-colors"
                            >
                                Next Step <ChevronRight className="h-4 w-4" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={isPending}
                                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 text-white text-sm font-semibold shadow-sm transition-colors"
                            >
                                {isPending ? 'Creating...' : 'Create Event'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">
                {label}{required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            {children}
        </div>
    );
}

const inputCls = 'w-full bg-slate-50 rounded-xl border border-slate-200 my-4 px-3 py-4 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-colors';
