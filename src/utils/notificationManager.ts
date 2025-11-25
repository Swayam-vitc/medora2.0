// Notification Manager Utility
// Handles browser notifications and reminder alerts

export class NotificationManager {
    private static instance: NotificationManager;
    private permissionGranted: boolean = false;
    private audio: HTMLAudioElement | null = null;

    private constructor() {
        this.checkPermission();
        this.initializeAudio();
    }

    static getInstance(): NotificationManager {
        if (!NotificationManager.instance) {
            NotificationManager.instance = new NotificationManager();
        }
        return NotificationManager.instance;
    }

    private checkPermission() {
        if ('Notification' in window) {
            this.permissionGranted = Notification.permission === 'granted';
        }
    }

    async requestPermission(): Promise<boolean> {
        if (!('Notification' in window)) {
            console.warn('This browser does not support notifications');
            return false;
        }

        if (Notification.permission === 'granted') {
            this.permissionGranted = true;
            return true;
        }

        if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            this.permissionGranted = permission === 'granted';
            return this.permissionGranted;
        }

        return false;
    }

    private initializeAudio() {
        // Create notification sound using Web Audio API data URL
        // This is a simple beep sound
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        // Create a simple notification tone
        this.audio = new Audio();
        // Use a data URL for a simple beep
        this.audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBDGH0fDBiTQHGGS56+WiUxMNUKvk77RoDQc5j9bxy3ozBSp+ze/bljkJFme76Oyrax0FO5LY8s58MAUofM3v25g4ChZouOr';
    }

    playNotificationSound() {
        if (this.audio) {
            try {
                this.audio.currentTime = 0;
                this.audio.volume = 0.5;
                this.audio.play().catch(err => {
                    console.warn('Could not play notification sound:', err);
                });
            } catch (error) {
                console.warn('Error playing notification sound:', error);
            }
        }
    }

    showNotification(title: string, options?: NotificationOptions): void {
        if (!this.permissionGranted) {
            console.warn('Notification permission not granted');
            return;
        }

        try {
            const notification = new Notification(title, {
                icon: '/fav.jpeg',
                badge: '/fav.jpeg',
                ...options,
            });

            // Play sound when showing notification
            this.playNotificationSound();

            // Auto-close after 10 seconds
            setTimeout(() => {
                notification.close();
            }, 10000);

            notification.onclick = () => {
                window.focus();
                notification.close();
            };
        } catch (error) {
            console.error('Error showing notification:', error);
        }
    }

    checkRemindersAndNotify(reminders: any[]): void {
        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        const today = now.toISOString().split('T')[0];

        reminders.forEach(reminder => {
            if (!reminder.isActive) return;

            reminder.reminderTimes.forEach((time: string) => {
                if (time === currentTime) {
                    // Check if already completed today
                    const todayCompletion = reminder.completedDates?.find((cd: any) => cd.date === today);
                    const timeCompleted = todayCompletion?.times?.some((t: any) => t.time === time);

                    if (!timeCompleted) {
                        this.showNotification(
                            '💊 Medication Reminder',
                            {
                                body: `Time to take ${reminder.medicationName}`,
                                tag: `reminder-${reminder._id}-${time}`,
                                requireInteraction: true,
                            }
                        );
                    }
                }
            });
        });
    }

    startReminderChecker(reminders: any[], intervalMs: number = 60000): number {
        // Check immediately
        this.checkRemindersAndNotify(reminders);

        // Then check every minute
        return window.setInterval(() => {
            this.checkRemindersAndNotify(reminders);
        }, intervalMs);
    }

    stopReminderChecker(intervalId: number): void {
        if (intervalId) {
            clearInterval(intervalId);
        }
    }
}

export default NotificationManager.getInstance();
