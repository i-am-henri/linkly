import { cn } from "@/lib/cn";
import { EnvelopeIcon, GlobeAltIcon, LockClosedIcon, MagnifyingGlassCircleIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export interface InputProps extends React.ComponentProps<'input'> { }

export function NameInput({ ...props }: InputProps) {
    return (
        <div className="relative">
            <input type="text" placeholder="Username" {...props} className={cn("peer pe-9 px-2 py-1 w-full focus:ring-2 ring-neutral-100 outline-none border rounded-md", props.className)} />
            <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <UserCircleIcon className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
            </div>
        </div>
    );
}
export function EmailInput({ ...props }: InputProps) {
    return (
        <div className="relative">
            <input placeholder="Email" type="email" {...props} className={cn("peer pe-9 px-2 py-1 w-full focus:ring-2 ring-neutral-100 outline-none border rounded-md", props.className)} />
            <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <EnvelopeIcon className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
            </div>
        </div>
    );
}
export function PasswordInput({ ...props }: InputProps) {
    return (
        <div className="relative">
            <input placeholder="Password" type="password" {...props} className={cn("peer pe-9 px-2 w-full py-1 focus:ring-2 ring-neutral-100 outline-none border rounded-md", props.className)} />
            <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <LockClosedIcon className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
            </div>
        </div>
    );
}

export function SlugInput({ ...props }: InputProps) {
    return (
        <div className="relative">
            <input placeholder="Slug" type="text" {...props} className={cn("peer pe-9 px-2 w-full py-1 focus:ring-2 ring-neutral-100 outline-none border rounded-md", props.className)} />
            <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <MagnifyingGlassCircleIcon className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
            </div>
        </div>
    );
}

export function UrlInput({ ...props }: InputProps) {
    return (
        <div className="relative">
            <input placeholder="Google.com" type="url" {...props} className={cn("peer pe-9 px-2 w-full py-1 focus:ring-2 ring-neutral-100 outline-none border rounded-md", props.className)} />
            <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <GlobeAltIcon className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
            </div>
        </div>
    );
}