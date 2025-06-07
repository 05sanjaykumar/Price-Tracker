// src/components/Sidebar.tsx
import { motion } from "framer-motion";
import { LoaderPinwheel, LayoutDashboard, History, Settings, UserCircle } from "lucide-react";
import { clsx } from 'clsx'; // A utility for conditional class names

// You can expand this array to add more navigation links
const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '#', active: true },
    { name: 'Trace History', icon: History, href: '#', active: false },
    { name: 'Settings', icon: Settings, href: '#', active: false },
];

const Sidebar = () => {
    return (
        <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className='flex h-screen w-64 flex-col border-r border-r-gray-800 bg-black text-gray-300'
        >
            {/* Header */}
            <div className='flex h-16 shrink-0 items-center justify-center border-b border-gray-800'>
                <LoaderPinwheel className="h-8 w-8 text-violet-400" />
                <h1 className='ml-3 text-xl font-bold tracking-wider text-white'>Trace with AI</h1>
            </div>

            {/* Navigation */}
            <nav className='flex-1 p-4'>
                <ul className='space-y-2'>
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <a
                                href={item.href}
                                className={clsx(
                                    'flex items-center rounded-lg p-3 text-sm font-medium transition-colors',
                                    {
                                        'bg-gray-800 text-white': item.active,
                                        'hover:bg-gray-800/60': !item.active,
                                    }
                                )}
                            >
                                <item.icon className='h-5 w-5 mr-3' />
                                <span>{item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer / User Profile */}
            <div className='mt-auto border-t border-gray-800 p-4'>
                 <div className='flex items-center gap-3 rounded-lg p-2 hover:bg-gray-800/60'>
                    <UserCircle className="h-9 w-9" />
                    <div className='flex flex-col'>
                        <span className='text-sm font-medium text-white'>Admin User</span>
                        <span className='text-xs text-gray-500'>admin@tracer.ai</span>
                    </div>
                </div>
            </div>
        </motion.aside>
    );
};

export default Sidebar;