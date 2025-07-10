import { BookUser, FolderOpen, LayoutDashboard, Newspaper, ReceiptText, SquareUserRound } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const iconSize = 16
const dashboardNavigation = () => [
  {
    category: 'Dashboard',
    items: [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: <LayoutDashboard size={iconSize} />
      },
      {
        name: 'News',
        href: '/dashboard/news',
        icon: <Newspaper size={iconSize} />
      },
      {
        name: 'Projects',
        href: '/dashboard/projects',
        icon: <FolderOpen size={iconSize} />
      }
    ]
  },
  {
    category: 'Landing Page',
    items: [
      {
        name: 'Manage content',
        href: '/dashboard',
        icon: <ReceiptText size={iconSize} />
      },
      {
        name: 'placement',
        href: '/dashboard/news',
        icon: <Newspaper size={iconSize} />
      },
    ]
  },
  {
    category: 'user management',
    items: [
      {
        name: 'users',
        href: '//dashboard/users',
        icon: <BookUser size={iconSize} />
      },
      {
        name: 'registration',
        href: '//dashboard/registration',
        icon: <SquareUserRound size={iconSize} />
      },
    ]
  }
]

const DashboradSideBar = () => {
  return (
    <div className="sidebar w-80 border-r-2 border-border min-h-screen p-8">
      <div className="grid grid-cols-1 gap-8">
        {dashboardNavigation().map((category, i) => (
          <div key={i} className='grid grid-cols-1 gap-2 lowercase'>
            <h1 className='text-muted-foreground text-sm py-1'>{category.category}</h1>
            {category.items.map((item, x) => (
              <Link href={item.href} key={x} className=' flex py-1 gap-4 text-sm text-muted-foreground hover:text-foreground duration-300'>{item.icon} {item.name}</Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboradSideBar
