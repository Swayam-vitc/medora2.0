import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
    _id: string;
    message: string;
    type: string;
    read: boolean;
    createdAt: string;
}

const Notifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

    const fetchNotifications = async () => {
        try {
            const userStr = localStorage.getItem("user");
            if (!userStr) return;
            const token = JSON.parse(userStr).token;

            const res = await fetch(`${API_URL}/api/notifications`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setNotifications(data);
            setUnreadCount(data.filter((n: Notification) => !n.read).length);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    const markAsRead = async (id: string) => {
        try {
            const userStr = localStorage.getItem("user");
            const token = JSON.parse(userStr).token;

            await fetch(`${API_URL}/api/notifications/${id}/read`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` }
            });

            // Update local state
            setNotifications(prev => prev.map(n =>
                n._id === id ? { ...n, read: true } : n
            ));
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        // Poll every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
                <div className="font-semibold mb-2">Notifications</div>
                <ScrollArea className="h-[300px]">
                    {notifications.length === 0 ? (
                        <p className="text-sm text-muted-foreground p-4 text-center">
                            No notifications
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {notifications.map((notification) => (
                                <div
                                    key={notification._id}
                                    className={`p-3 rounded-lg text-sm border ${notification.read ? 'bg-background' : 'bg-muted/50'
                                        }`}
                                    onClick={() => !notification.read && markAsRead(notification._id)}
                                >
                                    <p>{notification.message}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {new Date(notification.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
};

export default Notifications;
