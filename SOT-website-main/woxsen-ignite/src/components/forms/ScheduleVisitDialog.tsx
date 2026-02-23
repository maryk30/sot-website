import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarDays, Download, CheckCircle2, Clock, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ScheduleVisitDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
];

const programsOfInterest = [
    "B.Tech Programs",
    "BBA / BBA (Hons.)",
    "B.Des (Hons.)",
    "B.Arch",
    "BA (Hons.) - Liberal Arts",
    "Law Programs",
    "B.Sc (Hons.)",
    "BCA",
    "MBA",
    "Ph.D.",
    "General Campus Tour",
];

function generateRefId(): string {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "WXN-";
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function generateConfirmationHTML(data: {
    fullName: string;
    email: string;
    phone: string;
    visitDate: string;
    timeSlot: string;
    visitors: string;
    program: string;
    notes: string;
    refId: string;
}): string {
    const visitDate = new Date(data.visitDate);
    const formattedDate = visitDate.toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Woxsen Campus Visit Confirmation</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; background: #0a0a0a; color: #ffffff; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .container { max-width: 650px; width: 100%; background: linear-gradient(135deg, #141414 0%, #1a1a1a 100%); border-radius: 24px; overflow: hidden; border: 1px solid #2a2a2a; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
  .header { background: linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #b91c1c 100%); padding: 40px 32px; text-align: center; position: relative; overflow: hidden; }
  .header::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); }
  .header-logo { font-size: 28px; font-weight: 800; letter-spacing: 2px; margin-bottom: 4px; position: relative; }
  .header-sub { font-size: 12px; font-weight: 400; opacity: 0.85; letter-spacing: 3px; text-transform: uppercase; position: relative; }
  .badge { display: inline-block; background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 6px 16px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 1px; margin-top: 16px; position: relative; border: 1px solid rgba(255,255,255,0.2); }
  .body { padding: 32px; }
  .section-title { font-size: 11px; font-weight: 700; color: #ef4444; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
  .section-title::after { content: ''; flex: 1; height: 1px; background: linear-gradient(to right, #ef4444, transparent); }
  .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 28px; }
  .detail-item { background: #1e1e1e; border-radius: 12px; padding: 16px; border: 1px solid #2a2a2a; }
  .detail-item.full { grid-column: 1 / -1; }
  .detail-label { font-size: 11px; color: #888; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
  .detail-value { font-size: 15px; font-weight: 600; color: #fff; }
  .ref-section { background: linear-gradient(135deg, #1e1e1e 0%, #252525 100%); border-radius: 16px; padding: 24px; text-align: center; margin-top: 8px; border: 1px solid #333; border-style: dashed; }
  .ref-label { font-size: 11px; color: #888; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
  .ref-id { font-size: 28px; font-weight: 800; color: #ef4444; letter-spacing: 4px; font-family: monospace; }
  .footer { padding: 24px 32px; background: #111; border-top: 1px solid #2a2a2a; text-align: center; }
  .footer-text { font-size: 12px; color: #666; line-height: 1.6; }
  .footer-link { color: #ef4444; text-decoration: none; font-weight: 600; }
  .campus-info { background: #1a1a1a; border-radius: 12px; padding: 16px; margin-top: 16px; border: 1px solid #2a2a2a; display: flex; align-items: flex-start; gap: 12px; }
  .campus-icon { width: 36px; height: 36px; background: rgba(239,68,68,0.1); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 16px; }
  .campus-text { font-size: 13px; color: #aaa; line-height: 1.5; }
  .campus-text strong { color: #fff; }
  .highlight-bar { height: 4px; background: linear-gradient(90deg, #dc2626, #ef4444, #f87171, #ef4444, #dc2626); }
  @media print { body { background: white; } .container { box-shadow: none; border: 1px solid #ddd; } }
</style>
</head>
<body>
<div class="container">
  <div class="highlight-bar"></div>
  <div class="header">
    <div class="header-logo">WOXSEN</div>
    <div class="header-sub">University · School of Technology</div>
    <div class="badge">✓ CAMPUS VISIT CONFIRMED</div>
  </div>
  <div class="body">
    <div class="section-title">Visitor Information</div>
    <div class="detail-grid">
      <div class="detail-item">
        <div class="detail-label">Full Name</div>
        <div class="detail-value">${data.fullName}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Email</div>
        <div class="detail-value">${data.email}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Phone</div>
        <div class="detail-value">${data.phone}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Number of Visitors</div>
        <div class="detail-value">${data.visitors} ${parseInt(data.visitors) === 1 ? "Person" : "People"}</div>
      </div>
    </div>

    <div class="section-title">Visit Schedule</div>
    <div class="detail-grid">
      <div class="detail-item">
        <div class="detail-label">Date</div>
        <div class="detail-value">${formattedDate}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Time Slot</div>
        <div class="detail-value">${data.timeSlot}</div>
      </div>
      <div class="detail-item full">
        <div class="detail-label">Program of Interest</div>
        <div class="detail-value">${data.program}</div>
      </div>
    </div>

    ${data.notes ? `
    <div class="section-title">Additional Notes</div>
    <div class="detail-grid">
      <div class="detail-item full">
        <div class="detail-value" style="font-weight: 400; font-size: 14px; color: #ccc;">${data.notes}</div>
      </div>
    </div>
    ` : ""}

    <div class="ref-section">
      <div class="ref-label">Your Reference ID</div>
      <div class="ref-id">${data.refId}</div>
      <div style="font-size: 12px; color: #666; margin-top: 8px;">Please keep this reference for your records</div>
    </div>

    <div class="campus-info">
      <div class="campus-icon">📍</div>
      <div class="campus-text">
        <strong>Woxsen University Campus</strong><br>
        Kamkole, Sadasivpet, Sangareddy District,<br>
        Hyderabad, Telangana 502345, India
      </div>
    </div>
  </div>
  <div class="footer">
    <div class="footer-text">
      For any changes to your visit, contact us at <a class="footer-link" href="https://wa.me/917386061113">+91 7386061113</a><br>
      Visit <a class="footer-link" href="https://woxsen.edu.in">woxsen.edu.in</a> for more information
    </div>
  </div>
</div>
</body>
</html>`;
}

export default function ScheduleVisitDialog({ isOpen, onClose }: ScheduleVisitDialogProps) {
    const { toast } = useToast();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [refId, setRefId] = useState("");
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        visitDate: "",
        timeSlot: "",
        visitors: "1",
        program: "",
        notes: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newRefId = generateRefId();
        setRefId(newRefId);
        setIsSubmitted(true);
        console.log("Visit scheduled:", { ...formData, refId: newRefId });
        toast({
            title: "Visit Scheduled! 🎉",
            description: `Reference ID: ${newRefId}`,
        });
    };

    const handleDownload = () => {
        const html = generateConfirmationHTML({ ...formData, refId });
        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Woxsen_Visit_Confirmation_${refId}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const resetForm = () => {
        setFormData({
            fullName: "",
            email: "",
            phone: "",
            visitDate: "",
            timeSlot: "",
            visitors: "1",
            program: "",
            notes: "",
        });
        setIsSubmitted(false);
        setRefId("");
        onClose();
    };

    // Get minimum date (tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

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
                                    <CalendarDays className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Schedule a Campus Visit</h2>
                                    <p className="text-white/70 text-sm">Experience Woxsen in person</p>
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
                                    className="flex flex-col items-center justify-center py-8 text-center"
                                >
                                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">
                                        Visit Confirmed!
                                    </h3>
                                    <p className="text-muted-foreground mb-2">
                                        Your campus visit has been scheduled successfully.
                                    </p>
                                    <p className="text-sm text-muted-foreground mb-6">
                                        Reference ID: <span className="font-mono font-bold text-primary text-base">{refId}</span>
                                    </p>

                                    {/* Visit Summary Cards */}
                                    <div className="grid grid-cols-3 gap-3 w-full mb-8">
                                        <div className="bg-secondary/50 rounded-xl p-4 text-center">
                                            <CalendarDays className="w-5 h-5 text-primary mx-auto mb-2" />
                                            <p className="text-xs text-muted-foreground">Date</p>
                                            <p className="text-sm font-semibold text-foreground">
                                                {new Date(formData.visitDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                            </p>
                                        </div>
                                        <div className="bg-secondary/50 rounded-xl p-4 text-center">
                                            <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
                                            <p className="text-xs text-muted-foreground">Time</p>
                                            <p className="text-sm font-semibold text-foreground">{formData.timeSlot.split(" - ")[0]}</p>
                                        </div>
                                        <div className="bg-secondary/50 rounded-xl p-4 text-center">
                                            <Users className="w-5 h-5 text-primary mx-auto mb-2" />
                                            <p className="text-xs text-muted-foreground">Visitors</p>
                                            <p className="text-sm font-semibold text-foreground">{formData.visitors}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 w-full">
                                        <Button
                                            onClick={handleDownload}
                                            className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-6 rounded-xl shadow-red"
                                        >
                                            <Download className="w-5 h-5 mr-2" />
                                            Download Confirmation
                                        </Button>
                                        <Button
                                            onClick={resetForm}
                                            variant="outline"
                                            className="py-6 rounded-xl px-6"
                                        >
                                            Close
                                        </Button>
                                    </div>

                                    <div className="flex items-start gap-2 mt-6 p-4 bg-secondary/30 rounded-xl text-left w-full">
                                        <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                        <p className="text-xs text-muted-foreground">
                                            <strong className="text-foreground">Campus Address:</strong> Kamkole, Sadasivpet,
                                            Sangareddy District, Hyderabad, Telangana 502345
                                        </p>
                                    </div>
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

                                    {/* Row 2: Phone & Visitors */}
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
                                                Number of Visitors <span className="text-primary">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                name="visitors"
                                                value={formData.visitors}
                                                onChange={handleChange}
                                                required
                                                min="1"
                                                max="20"
                                                className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 3: Date & Time */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1.5">
                                                Preferred Visit Date <span className="text-primary">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                name="visitDate"
                                                value={formData.visitDate}
                                                onChange={handleChange}
                                                required
                                                min={minDate}
                                                className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1.5">
                                                Preferred Time Slot <span className="text-primary">*</span>
                                            </label>
                                            <select
                                                name="timeSlot"
                                                value={formData.timeSlot}
                                                onChange={handleChange}
                                                required
                                                className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                                            >
                                                <option value="">Select a time slot</option>
                                                {timeSlots.map((slot) => (
                                                    <option key={slot} value={slot}>
                                                        {slot}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Program */}
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
                                            {programsOfInterest.map((p) => (
                                                <option key={p} value={p}>
                                                    {p}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Notes */}
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1.5">
                                            Additional Notes
                                        </label>
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleChange}
                                            rows={3}
                                            placeholder="Any special requirements or questions about the visit..."
                                            className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                        />
                                    </div>

                                    {/* Submit */}
                                    <Button
                                        type="submit"
                                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 rounded-xl text-base shadow-red hover:shadow-lg transition-all group"
                                    >
                                        Confirm Visit
                                        <CalendarDays className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                                    </Button>

                                    <p className="text-center text-xs text-muted-foreground">
                                        You'll receive a downloadable confirmation with all your visit details.
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
