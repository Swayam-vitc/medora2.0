import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface AddRecordDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    patients: any[];
    onRecordAdded: () => void;
}

const AddRecordDialog = ({ open, onOpenChange, patients, onRecordAdded }: AddRecordDialogProps) => {
    const [formData, setFormData] = useState({
        patientId: "",
        recordType: "Consultation Notes",
        diagnosis: "",
        description: "",
        documentName: "",
        documentUrl: "",
    });
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

    const handleSubmit = async () => {
        try {
            if (!formData.patientId || !formData.diagnosis) {
                toast.error("Please fill in required fields");
                return;
            }

            setLoading(true);

            const userStr = localStorage.getItem("user");
            if (!userStr) {
                toast.error("Please log in again");
                return;
            }
            const user = JSON.parse(userStr);

            const recordData = {
                patientId: formData.patientId,
                recordType: formData.recordType,
                diagnosis: formData.diagnosis,
                description: formData.description,
                attachments: formData.documentUrl ? [{
                    type: formData.recordType.toLowerCase().replace(/\s+/g, '_'),
                    name: formData.documentName || `${formData.recordType}_${new Date().toLocaleDateString()}`,
                    url: formData.documentUrl,
                    uploadDate: new Date(),
                }] : [],
            };

            const res = await fetch(`${API_URL}/api/medical-records`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`,
                },
                body: JSON.stringify(recordData),
            });

            if (!res.ok) {
                throw new Error("Failed to add medical record");
            }

            toast.success("Medical record added successfully!");
            onRecordAdded();
            onOpenChange(false);

            // Reset form
            setFormData({
                patientId: "",
                recordType: "Consultation Notes",
                diagnosis: "",
                description: "",
                documentName: "",
                documentUrl: "",
            });
        } catch (error) {
            console.error("Error adding medical record:", error);
            toast.error("Failed to add medical record");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add Medical Record</DialogTitle>
                    <DialogDescription>
                        Add a new medical record for a patient
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="patient">Patient *</Label>
                        <Select value={formData.patientId} onValueChange={(value) => setFormData({ ...formData, patientId: value })}>
                            <SelectTrigger id="patient">
                                <SelectValue placeholder="Select patient" />
                            </SelectTrigger>
                            <SelectContent>
                                {patients.map((patient) => (
                                    <SelectItem key={patient._id} value={patient._id}>
                                        {patient.name} - {patient.email}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="recordType">Record Type</Label>
                        <Select value={formData.recordType} onValueChange={(value) => setFormData({ ...formData, recordType: value })}>
                            <SelectTrigger id="recordType">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Lab Report">Lab Report</SelectItem>
                                <SelectItem value="X-Ray">X-Ray</SelectItem>
                                <SelectItem value="Consultation Notes">Consultation Notes</SelectItem>
                                <SelectItem value="Prescription">Prescription</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="diagnosis">Diagnosis *</Label>
                        <Input
                            id="diagnosis"
                            placeholder="e.g., Hypertension Management"
                            value={formData.diagnosis}
                            onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Add notes or details about this record..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="documentName">Document Name (Optional)</Label>
                        <Input
                            id="documentName"
                            placeholder="e.g., Blood Test Results Jan 2024"
                            value={formData.documentName}
                            onChange={(e) => setFormData({ ...formData, documentName: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="documentUrl">Document URL (Optional)</Label>
                        <Input
                            id="documentUrl"
                            placeholder="https://example.com/document.pdf"
                            value={formData.documentUrl}
                            onChange={(e) => setFormData({ ...formData, documentUrl: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">
                            Enter a URL to an uploaded document or leave blank
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Adding..." : "Add Record"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddRecordDialog;
