import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, useEffect, useRef, useState } from "react";
import X from "../public/x.svg";
import ThemePicker from "./home/open_source/ThemePicker";
import { SquareButton } from "./SquareButton";

export default function ThemeColorSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex items-center" ref={containerRef}>
            <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                    <motion.div
                        key="picker"
                        layout
                        initial={{ opacity: 0, width: 0, scale: 0.98 }}
                        animate={{ opacity: 1, width: "auto", scale: 1 }}
                        exit={{ opacity: 0, width: 0, scale: 0.98 }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 25,
                            mass: 0.4,
                            opacity: { duration: 0.15 },
                        }}
                        className="flex items-center gap-2 overflow-hidden origin-right"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: 6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="w-32 sm:w-48 py-2"
                        >
                            <ThemePicker />
                        </motion.div>
                        <SquareButton
                            label="Close color picker"
                            onClick={() => setIsOpen(false)}
                            tooltipPlacement="bottom"
                        >
                            <X className="w-4 h-4" />
                        </SquareButton>
                    </motion.div>
                ) : (
                    <motion.div
                        key="button"
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                            type: "spring",
                            stiffness: 600,
                            damping: 22,
                            mass: 0.3,
                        }}
                    >
                        <SquareButton
                            label="Change theme color"
                            onClick={() => setIsOpen(true)}
                            tooltipPlacement="left"
                        >
                            <div
                                className="w-7 h-7 rounded-full shadow-md gradient-button from-red-container to-green-container overflow-visible"
                                style={
                                    {
                                        "--tw-gradient-via": "rgb(var(--color-purple-container) / 1)",
                                    } as CSSProperties
                                }
                            />
                        </SquareButton>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
