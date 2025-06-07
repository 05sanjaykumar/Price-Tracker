import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const DashBoard = () => {
  return (
    <div className='min-h-screen bg-gray-900 min-w-screen flex text-white'>
        <section className='w-1/6 bg-black p-2 border-r-gray-800 border-r'>
            SideBar
        </section>
        <section className='p-2 flex items-center mt-2.5 w-full flex-col'>
            <div className="searchBar">
                <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-xl w-full relative"
                >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Trace Items"
                    className="pl-10 pr-4 py-2 w-3xl rounded-2xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                </motion.div>
            </div>
            <div className="Content mt-2.5">
                Content Goes Here
            </div>
        </section>
    </div>
  )
}

export default DashBoard