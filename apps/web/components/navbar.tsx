'use client'
import Link from "next/link"
import { buttonVariants } from "shadcn/ui/components/ui/button"
import { usePathname } from "next/navigation"

const Navbar = () => {

  const user = null

  const pathname = usePathname()

  return (
    <>
      {pathname !== '/dashboard' && <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
        <header className='relative bg-white'>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center justify-end">
              {/* TODO: Mobile Nav */}
              <div className="ml-auto mr-[10%] flex items-center">
                <div className="flex flex-1 items-center justify-center gap-2">
                  {user ? null : <div className="flex"><span className="h-6 w-px bg-gray-200" aria-hidden='true'></span></div>}
                  {user ? <Link href='/dashboard' className={buttonVariants({ variant: 'default' })}>داشبورد</Link>
                    : (<Link href='/auth?mode=register' className={buttonVariants({ variant: 'ghost' })}>ثبت نام</Link>)}
                  {user ? null : (<span aria-hidden='true' className="h-6 w-px bg-gray-200"></span>)}
                  {user ? null : (<Link href='/auth?mode=login' className={buttonVariants({ variant: "ghost", className: 'ml-0' })}>ورود</Link>)}
                  {user ? (<span aria-hidden='true' className="h-6 w-px bg-gray-200"></span>) : null}
                </div>
              </div>
              <div className="ml-[10%] flex">
                <Link href='/'>
                  logo
                </Link>
              </div>

            </div>
          </div>
        </header>
      </div>}
    </>
  )
}

export default Navbar
