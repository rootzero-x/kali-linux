import React, { createContext, useContext, useState } from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

type TabsContextType = {
    activeTab: string;
    setActiveTab: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const Tabs = ({
    defaultValue,
    value,
    onValueChange,
    children,
    className
}: {
    defaultValue?: string,
    value?: string,
    onValueChange?: (value: string) => void,
    children: React.ReactNode,
    className?: string
}) => {
    const [internalActiveTab, setInternalActiveTab] = useState(defaultValue || '');

    const activeTab = value !== undefined ? value : internalActiveTab;
    const setActiveTab = onValueChange || setInternalActiveTab;

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={cn("w-full", className)}>
                {children}
            </div>
        </TabsContext.Provider>
    );
};

export const TabsList = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("inline-flex h-10 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800 p-1 text-slate-500 dark:text-slate-400", className)}>
            {children}
        </div>
    );
};

export const TabsTrigger = ({
    value,
    children,
    className,
    disabled
}: {
    value: string,
    children: React.ReactNode,
    className?: string,
    disabled?: boolean
}) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error("TabsTrigger must be used within Tabs");

    const isActive = context.activeTab === value;

    return (
        <button
            onClick={() => !disabled && context.setActiveTab(value)}
            disabled={disabled}
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:ring-offset-slate-950 relative",
                disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
                isActive ? "bg-white dark:bg-dark-bg text-slate-950 dark:text-slate-50 shadow-sm" : "hover:bg-slate-200 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100",
                className
            )}
        >
            <span className="relative z-10 flex items-center">{children}</span>
            {isActive && <motion.div layoutId="active-tab" className="absolute inset-0 bg-transparent" />}
        </button>
    );
};

export const TabsContent = ({ value, children, className }: { value: string, children: React.ReactNode, className?: string }) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error("TabsContent must be used within Tabs");

    if (context.activeTab !== value) return null;

    return (
        <div
            className={cn(
                "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:ring-offset-slate-950 animate-in fade-in-0 zoom-in-95",
                className
            )}
        >
            {children}
        </div>
    );
};
