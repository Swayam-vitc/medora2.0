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
import { Clock, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface CustomReminderDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onReminderCreated: () => void;
}

const CustomReminderDialog = ({ open, onOpenChange, onReminderCreated }: CustomReminderDialogProps) => {
    const [reminderType, setReminderType] = useState("custom");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [frequency, setFrequency] = useState("once daily");
    const [reminderTimes, setReminderTimes] = useState<string[]>(["08:00"]);
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

    const reminderTypes = [
        { value: "medication", label: "💊 Medication" },
        { value: "exercise", label: "🏃 Exercise/Yoga" },
        { value: "break", label: "☕ Break/Rest" },
        { value: "water", label: "💧 Hydration" },
        { value: "appointment", label: "📅 Appointment" },
        { value: "custom", label: "📌 Custom" },
    ];

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
            if (!title.trim()) {
                toast.error("Please enter a reminder title");
                return;
            }

            setLoading(true);

            const userStr = localStorage.getItem("user");
            if (!userStr) {
                toast.error("Please log in again");
                return;
            }
            const user = JSON.parse(userStr);

            // For custom reminders, we'll use a special prescriptionId of "custom"
            const reminderData = {
                patientId: user._id,
                prescriptionId: "custom", // Special marker for custom reminders
                medicationName: title,
                reminderTimes,
                frequency,
                startDate,
                endDate: endDate || undefined,
                notes: description,
                reminderType, // Store the type (yoga, break, etc.)
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

            toast.success(`${reminderTypes.find(t => t.value === reminderType)?.label || 'Reminder'} created successfully!`);
            onReminderCreated();
            onOpenChange(false);

            // Reset form
            setReminderType("custom");
            setTitle("");
            setDescription("");
            setFrequency("once daily");
            setReminderTimes(["08:00"]);
            setStartDate(new Date().toISOString().split('T')[0]);
            setEndDate("");
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
                    <DialogTitle>Create Custom Reminder</DialogTitle>
                    <DialogDescription>
                        Set reminders for activities, breaks, hydration, and more
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="reminderType">Reminder Type</Label>
                        <Select value={reminderType} onValueChange={setReminderType}>
                            <SelectTrigger id="reminderType">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                {reminderTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            placeholder={
                                reminderType === "exercise" ? "e.g., Morning Yoga" :
                                    reminderType === "break" ? "e.g., Coffee Break" :
                                        reminderType === "water" ? "e.g., Drink Water" :
                                            "e.g., Take Vitamins"
                            }
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea
                            id="description"
                            placeholder="Add notes or details..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={2}
                        />
                    </div>

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

export default CustomReminderDialog;
