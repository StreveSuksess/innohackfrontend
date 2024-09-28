import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/ui/user-auth-form";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/services/authApi.ts";
import { Link } from "react-router-dom";


export const AuthenticationPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await login(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="container relative h-[100vh] flex-col items-center justify-center grid max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to="/signup"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Sign up
        </Link>

        <div className="relative hidden h-full flex-col bg-muted p-10 text-white border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
        </div>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>

            <UserAuthForm
              isLoading={isLoading}
              onSubmit={onSubmit}
              login={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};
