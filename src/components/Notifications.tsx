import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Notifications = () => {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchNotifications = async () => {
        try {
            const userStr = localStorage.getItem("user");
            if (!userStr) return;

            const user = JSON.parse(userStr);
            const res = await fetch(`${API_URL}/api/notifications`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            if (!res.ok) {
                // console.error(`Notifications API error: ${res.status}`);
                return;
            }

            const data = await res.json();

            // Ensure data is an array
            if (Array.isArray(data)) {
                setNotifications(data);
                setUnreadCount(data.filter((n: any) => !n.read).length);
            } else {
                // console.error("Invalid notifications response:", data);
                setNotifications([]);
                setUnreadCount(0);
            }
        } catch (error) {
            // console.error("Error fetching notifications:", error);
            // Don't crash - just set empty array
            setNotifications([]);
            setUnreadCount(0);
        }
    };

    const markAsRead = async (id: string) => {
        try {
            const userStr = localStorage.getItem("user");
            if (!userStr) return;

            const user = JSON.parse(userStr);
            await fetch(`${API_URL}/api/notifications/${id}/read`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${user.token}` }
            });

            fetchNotifications();
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                {notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                        No notifications
                    </div>
                ) : (
                    notifications.slice(0, 5).map((notification) => (
                        <DropdownMenuItem
                            key={notification._id}
                            onClick={() => markAsRead(notification._id)}
                            className={notification.read ? "opacity-60" : ""}
                        >
                            <div className="flex flex-col gap-1">
                                <p className="font-medium text-sm">{notification.title}</p>
                                <p className="text-xs text-muted-foreground">{notification.message}</p>
                            </div>
                        </DropdownMenuItem>
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Notifications;
