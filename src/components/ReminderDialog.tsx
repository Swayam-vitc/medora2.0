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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface ReminderDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    prescription: any;
    onReminderCreated: () => void;
}

const ReminderDialog = ({ open, onOpenChange, prescription, onReminderCreated }: ReminderDialogProps) => {
    const [frequency, setFrequency] = useState("once daily");
    const [reminderTimes, setReminderTimes] = useState<string[]>(["08:00"]);
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState("");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

    const handleFrequencyChange = (value: string) => {
        setFrequency(value);

        // Set default times based on frequency
        switch (value) {
            case "once daily":
                setReminderTimes(["08:00"]);
                break;
            case "twice daily":
                setReminderTimes(["08:00", "20:00"]);
                break;
            case "three times daily":
                setReminderTimes(["08:00", "14:00", "20:00"]);
                break;
            case "four times daily":
                setReminderTimes(["08:00", "12:00", "16:00", "20:00"]);
                break;
            case "custom":
                setReminderTimes(["08:00"]);
                break;
            default:
                setReminderTimes(["08:00"]);
        }
    };

    const addReminderTime = () => {
        setReminderTimes([...reminderTimes, "08:00"]);
    };

    const removeReminderTime = (index: number) => {
        if (reminderTimes.length > 1) {
            setReminderTimes(reminderTimes.filter((_, i) => i !== index));
        }
    };

    const updateReminderTime = (index: number, value: string) => {
        const newTimes = [...reminderTimes];
        newTimes[index] = value;
        setReminderTimes(newTimes);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const userStr = localStorage.getItem("user");
            if (!userStr) {
                toast.error("Please log in again");
                return;
            }
            const user = JSON.parse(userStr);

            const reminderData = {
                patientId: user._id,
                prescriptionId: prescription._id,
                medicationName: prescription.medication,
                reminderTimes,
                frequency,
                startDate,
                endDate: endDate || undefined,
                notes,
            };

            const res = await fetch(`${API_URL}/api/reminders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`,
                },
                body: JSON.stringify(reminderData),
            });

            if (!res.ok) {
                throw new Error("Failed to create reminder");
            }

            toast.success("Reminder created successfully!");
            onReminderCreated();
            onOpenChange(false);

            // Reset form
            setFrequency("once daily");
            setReminderTimes(["08:00"]);
            setStartDate(new Date().toISOString().split('T')[0]);
            setEndDate("");
            setNotes("");
        } catch (error) {
            console.error("Error creating reminder:", error);
            toast.error("Failed to create reminder");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Set Medication Reminder</DialogTitle>
                    <DialogDescription>
                        Create a reminder for {prescription?.medication}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="frequency">Frequency</Label>
                        <Select value={frequency} onValueChange={handleFrequencyChange}>
                            <SelectTrigger id="frequency">
                                <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="once daily">Once Daily</SelectItem>
                                <SelectItem value="twice daily">Twice Daily</SelectItem>
                                <SelectItem value="three times daily">Three Times Daily</SelectItem>
                                <SelectItem value="four times daily">Four Times Daily</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label>Reminder Times</Label>
                            {frequency === "custom" && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={addReminderTime}
                                >
                                    <Plus className="h-4 w-4 mr-1" /> Add Time
                                </Button>
                            )}
                        </div>
                        <div className="space-y-2">
                            {reminderTimes.map((time, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="time"
                                        value={time}
                                        onChange={(e) => updateReminderTime(index, e.target.value)}
                                        className="flex-1"
                                    />
                                    {frequency === "custom" && reminderTimes.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeReminderTime(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input
                                id="startDate"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endDate">End Date (Optional)</Label>
                            <Input
                                id="endDate"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                min={startDate}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <Input
                            id="notes"
                            placeholder="e.g., Take with food"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Creating..." : "Create Reminder"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ReminderDialog;
