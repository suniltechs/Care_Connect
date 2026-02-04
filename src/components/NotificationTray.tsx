import { Bell, Pill, Calendar, Info, AlertCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { mockNotifications } from "@/data/mockData";
import type { AppNotification } from "@/types";

interface NotificationTrayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationTray({ isOpen, onClose }: NotificationTrayProps) {
  const getIcon = (type: AppNotification["type"]) => {
    switch (type) {
      case "medication":
        return <Pill className="w-5 h-5 text-mint" />;
      case "appointment":
        return <Calendar className="w-5 h-5 text-soft-blue" />;
      case "alert":
        return <AlertCircle className="w-5 h-5 text-soft-coral" />;
      default:
        return <Info className="w-5 h-5 text-lavender" />;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:w-[400px] bg-off-white p-0 flex flex-col"
      >
        <SheetHeader className="p-6 border-b bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-lavender/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-lavender" />
              </div>
              <SheetTitle className="text-xl font-semibold text-charcoal">
                Notifications
              </SheetTitle>
            </div>
          </div>
          <SheetDescription className="text-sm text-medium-gray mt-1">
            Stay updated with Margaret's care schedule
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {mockNotifications.length > 0 ? (
            <div className="divide-y divide-charcoal/5">
              {mockNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 transition-colors hover:bg-white cursor-pointer group ${
                    !notification.isRead ? "bg-lavender/5" : ""
                  }`}
                >
                  <div className="flex gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        !notification.isRead
                          ? "bg-white shadow-sm"
                          : "bg-charcoal/5"
                      }`}
                    >
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4
                          className={`text-sm font-semibold truncate ${
                            !notification.isRead
                              ? "text-charcoal"
                              : "text-medium-gray"
                          }`}
                        >
                          {notification.title}
                        </h4>
                        <span className="text-[10px] text-medium-gray whitespace-nowrap pt-0.5">
                          {notification.time}
                        </span>
                      </div>
                      <p
                        className={`text-sm leading-relaxed ${
                          !notification.isRead
                            ? "text-charcoal/80"
                            : "text-medium-gray"
                        }`}
                      >
                        {notification.description}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 rounded-full bg-lavender flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-charcoal/5 flex items-center justify-center mb-4">
                <Bell className="w-8 h-8 text-medium-gray" />
              </div>
              <h3 className="text-lg font-semibold text-charcoal mb-2">
                All caught up!
              </h3>
              <p className="text-sm text-medium-gray">
                No new notifications at the moment.
              </p>
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-white">
          <Button
            variant="outline"
            className="w-full rounded-full border-lavender text-lavender hover:bg-lavender/10"
            onClick={() => {}}
          >
            Mark all as read
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
