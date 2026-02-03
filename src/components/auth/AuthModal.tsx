import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";
import { Button } from "@/components/ui/button";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: "login" | "signup";
  view: "login" | "signup";
  onViewChange: (view: "login" | "signup") => void;
  onAuthSuccess?: () => void;
}

export function AuthModal({
  isOpen,
  onClose,
  view,
  onViewChange,
  onAuthSuccess,
}: AuthModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {view === "login" ? "Welcome Back" : "Create an Account"}
          </DialogTitle>
          <DialogDescription>
            {view === "login"
              ? "Enter your email to sign in to your account"
              : "Enter your information to create your account"}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {view === "login" ? (
            <LoginForm onSuccess={onAuthSuccess} />
          ) : (
            <SignUpForm onSuccess={onAuthSuccess} />
          )}
          <div className="mt-4 text-center text-sm text-muted-foreground">
            {view === "login" ? (
              <>
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-normal underline"
                  onClick={() => onViewChange("signup")}
                >
                  Sign up
                </Button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-normal underline"
                  onClick={() => onViewChange("login")}
                >
                  Login
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
