import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ApplyNowDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const programs = [
    "B.Tech - Computer Science & Engineering",
    "B.Tech - Artificial Intelligence & ML",
    "B.Tech - Data Science & Analytics",
    "B.Tech - Cybersecurity",
    "B.Tech - Robotics & Automation",
    "BBA / BBA (Hons.)",
    "B.Des (Hons.)",
    "B.Arch",
    "BA (Hons.) - Liberal Arts",
    "BA-LLB (Hons.)",
    "BBA-LLB (Hons.)",
    "B.Sc (Hons.)",
    "BCA",
    "MBA",
    "Ph.D.",
];

const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Other",
];

export default function ApplyNowDialog({ isOpen, onClose }: ApplyNowDialogProps) {
    const { toast } = useToast();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        dob: "",
        program: "",
        grade12: "",
        city: "",
        state: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Application submitted:", formData);
        setIsSubmitted(true);
        toast({
            title: "Application Submitted! 🎉",
            description: "We'll get back to you within 48 hours.",
        });
    };

    const resetForm = () => {
        setFormData({
            fullName: "",
            email: "",
            phone: "",
            dob: "",
            program: "",
            grade12: "",
            city: "",
            state: "",
            message: "",
        });
        setIsSubmitted(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={resetForm}
                    />

                    {/* Dialog */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-3xl shadow-2xl border border-border"
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 bg-primary rounded-t-3xl px-6 py-5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                    <GraduationCap className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Apply to Woxsen</h2>
                                    <p className="text-white/70 text-sm">Start your journey today</p>
                                </div>
                            </div>
                            <button
                                onClick={resetForm}
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center py-12 text-center"
                                >
                                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">
                                        Application Submitted!
                                    </h3>
                                    <p className="text-muted-foreground mb-8 max-w-md">
                                        Thank you, {formData.fullName}! Our admissions team will review your
                                        application and reach out within 48 hours.
                                    </p>
                                    <Button onClick={resetForm} className="bg-primary hover:bg-primary/90">
                                        Close
                                    </Button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Row 1: Name & Email */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1.5">
                                                Full Name <span className="text-primary">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter your full name"
                                                className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1.5">
                                                Email Address <span className="text-primary">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="your.email@example.com"
                                                className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 2: Phone & DOB */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1.5">
                                                Phone Number <span className="text-primary">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                placeholder="+91 98765 43210"
                                                className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1.5">
                                                Date of Birth <span className="text-primary">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                name="dob"
                                                value={formData.dob}
                                                onChange={handleChange}
                                                required
                                                className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 3: Program & Grade */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1.5">
                                                Program of Interest <span className="text-primary">*</span>
                                            </label>
                                            <select
                                                name="program"
                                                value={formData.program}
                                                onChange={handleChange}
                                                required
                                                className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                                            >
                                                <option value="">Select a program</option>
                                                {programs.map((p) => (
                                                    <option key={p} value={p}>
                                                        {p}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1.5">
                                                12th Grade Percentage <span className="text-primary">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                name="grade12"
                                                value={formData.grade12}
                                                onChange={handleChange}
                                                required
                                                min="0"
                                                max="100"
                                                placeholder="e.g. 85"
                                                className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 4: City & State */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1.5">
                                                City <span className="text-primary">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter your city"
                                                className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1.5">
                                                State <span className="text-primary">*</span>
                                            </label>
                                            <select
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                required
                                                className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                                            >
                                                <option value="">Select your state</option>
                                                {states.map((s) => (
                                                    <option key={s} value={s}>
                                                        {s}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1.5">
                                            Additional Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={3}
                                            placeholder="Any specific questions or information you'd like to share..."
                                            className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                        />
                                    </div>

                                    {/* Submit */}
                                    <Button
                                        type="submit"
                                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 rounded-xl text-base shadow-red hover:shadow-lg transition-all group"
                                    >
                                        Submit Application
                                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>

                                    <p className="text-center text-xs text-muted-foreground">
                                        By submitting, you agree to be contacted by Woxsen University regarding admissions.
                                    </p>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
