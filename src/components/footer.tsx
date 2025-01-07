"use client"

import Link from "next/link"

export default function Footer({
    admin,
    dashboard
}: {
    admin?: boolean,
    dashboard?: boolean
}) {
    return (
        <footer className="flex items-center justify-between text-sm ">
            <p className="text-neutral-500 flex items-center">
                made by henri
            </p>
            {admin && <div className="flex items-center space-x-2">

            </div>}
            {dashboard && <div className="flex items-center space-x-2">
                <p className="text-neutral-500 cursor-pointer">Logout</p>
                <Link href={"/dashboard/products"} className="text-neutral-500 cursor-pointer">Products</Link>
            </div>}
            {
                !admin && !dashboard && <div className="flex items-center space-x-2">
                    <Link href="/privacy" className="text-neutral-500">Privacy</Link>
                    <Link href="/imprint" className="text-neutral-500">Imprint</Link>
                    <Link href="/terms" className="text-neutral-500">Terms</Link>
                    <Link href="/auth/login" className="text-neutral-500">Login</Link>
                    <Link href="/auth/register" className="text-neutral-500">Register</Link>
                </div>
            }
        </footer>
    )
}