import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";


// @ts-ignore
export const Member = ({ member }) => {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="hidden h-9 w-9 sm:flex">
        <AvatarImage src="/avatars/02.png" alt="Avatar" />
        <AvatarFallback>{member.name}</AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <p className="text-sm font-medium leading-none">
          {member.name === "null null" ? "User" : member.name}
        </p>
        <p className="text-sm text-muted-foreground">{member.email}</p>
      </div>

      <div className="ml-auto font-medium">{member.role}</div>
    </div>
  );
};
