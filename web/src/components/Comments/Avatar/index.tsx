import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../Shadcnui/popover";
import logout from "@/service/logout";
import PopoverLoginContent from "@/components/Authentication/PopoverLoginContent";

const Avatar = ({ currentUser }: { currentUser: User }) => {
  return currentUser.ok && currentUser.data ? (
    <Popover>
      <div className="flex items-center gap-2 mb-2">
        <div className="relative flex size-10 shrink-0 overflow-hidden rounded-full">
          <Image
            src={
              "/images/not-authenticated.png"
              // author.avatar
              //   ? `http://127.0.0.1:1337${author.avatar.url}`
              // : "/images/not-authenticated.png"
            }
            alt={
              ""
              // author.avatar
              // ? author.avatar.alternativeText
              // : `Avatar de ${author.name}`
            }
            fill
            sizes="(max-width: 40px) 100vw"
            className="transition-all duration-500 absolute object-cover group-hover:brightness-50"
          />
        </div>
        <PopoverTrigger>
          <p className="transition-colors duration-500 text-blog-foreground-highlight hover:text-blog-foreground-readable-hover">
            <strong>@{currentUser.data.username}</strong>
          </p>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-28 p-0 backdrop-blur-sm bg-blog-background-backdrop overflow-hidden">
        <form action={logout}>
          <button
            type="submit"
            className={
              `w-full px-4 py-2 text-left cursor-pointer transition-all duration-300` +
              ` text-blog-foreground-readable hover:text-blog-foreground-readable-hover` +
              ` hover:bg-blog-background-backdrop-hover`
            }
          >
            Sair
          </button>
        </form>
      </PopoverContent>
    </Popover>
  ) : (
    <Popover>
      <div className="flex items-center gap-2 mb-2">
        <div className="relative flex size-10 shrink-0 overflow-hidden rounded-full">
          <Image
            src="/images/not-authenticated.png"
            alt="Usuário anônimo"
            fill
            sizes="(max-width: 40px) 100vw"
            className="transition-all duration-500 absolute object-cover group-hover:brightness-50"
          />
        </div>
        <PopoverTrigger>
          <p className="p-1 transition-colors duration-500 text-blog-foreground-highlight hover:text-blog-foreground-readable-hover">
            <strong>Anônimo</strong>
          </p>
        </PopoverTrigger>
      </div>
      <PopoverLoginContent />
    </Popover>
  );
};

export default Avatar;
